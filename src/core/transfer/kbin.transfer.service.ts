import { TKeyboardInputEvent } from '../../types';
import { ICircularBuffer } from './buffer/circular.buffer.interface';
import { createBuffer } from './buffer/circular.buffer';
import { IBasicStreambuf } from './StreamBuffer.interface';

export class KeyboardInputStream extends ReadableStream<TKeyboardInputEvent> {
	constructor(underlyingSource: UnderlyingDefaultSource) {
		super(underlyingSource);
	}
}

export class EventEncoder extends TransformStream {
	eventEncoder: () => void;
	constructor() {
		super({
			start(controller) {},
			async transform(event: TKeyboardInputEvent, controller) {
				event = await event;
				controller.enqueue(event);
			},
			flush() {},
		});
	}
}

function getStreamSource(
	buffer: ICircularBuffer<TKeyboardInputEvent>,
): UnderlyingDefaultSource<TKeyboardInputEvent> {
	const listen = (
		buffer: ICircularBuffer<TKeyboardInputEvent>,
		callback: (event: TKeyboardInputEvent) => unknown,
	): void => {
		requestAnimationFrame(() => {
			while (buffer.get().value) {
				if (buffer.value !== null) callback(buffer.value);
			}
			listen(buffer, callback);
		});
	};
	return {
		start(controller): void {
			listen(buffer, (event) => {
				//console.log('event received', event);
				controller.enqueue(event);
			});
		},
	};
}

export class KeyboardInputStreambuf
	implements IBasicStreambuf<TKeyboardInputEvent, KeyboardInputStream>
{
	buffer = createBuffer<TKeyboardInputEvent>();
	stream: KeyboardInputStream;
	constructor(transformers: TransformStream[] = []) {
		this.stream = new KeyboardInputStream(getStreamSource(this.buffer));
		this.pipe(new EventEncoder());
		transformers.forEach((ts) => this.pipe(ts));
	}
	push(value: TKeyboardInputEvent): void {
		this.buffer.put(value);
	}
	pipeTo(ws: WritableStream): void {
		this.stream.pipeTo(ws);
	}
	pipe(ts: TransformStream): KeyboardInputStreambuf {
		this.stream = this.stream.pipeThrough(ts, {
			preventClose: true,
			preventAbort: true,
			preventCancel: true,
		});

		return this;
	}
}
