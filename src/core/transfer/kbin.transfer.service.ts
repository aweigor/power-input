import { TKeyboardInputEvent } from '../../types';
import { ICircularBuffer } from './buffer/circular.buffer.interface';
import { createBuffer } from './buffer/circular.buffer';
import { IBasicStreambuf } from './StreamBuffer.interface';
import { Speller } from '../transform/speller';

export class KeyboardInputStream extends ReadableStream<TKeyboardInputEvent> {
	constructor(underlyingSource: UnderlyingDefaultSource) {
		super(underlyingSource);
	}
}

export class EventEncoder extends TransformStream {
	eventEncoder: () => void;
	constructor() {
		super({
			start(controller) {
				//console.log('starting..');
			},
			async transform(event: any, controller) {
				event = await event;
				//console.log('transforming');
				controller.enqueue(event);
			},
			flush() {},
		});
		this.eventEncoder = () => {};
	}
}

function getStreamSource(
	buffer: ICircularBuffer<TKeyboardInputEvent>,
): UnderlyingDefaultSource<TKeyboardInputEvent> {
	const listen = (
		buffer: ICircularBuffer<TKeyboardInputEvent>,
		callback: (event: TKeyboardInputEvent) => any,
	) => {
		requestAnimationFrame(() => {
			while (buffer.get().value) {
				if (buffer.value !== null) callback(buffer.value);
			}
			listen(buffer, callback);
		});
	};
	return {
		start(controller) {
			listen(buffer, (event) => {
				//console.log('event received', event);
				controller.enqueue(event);
			});
		},
	};
}

class KeyboardInputSink extends WritableStream {
	constructor() {
		super({
			// Implement the sink
			write(chunk) {
				return new Promise((resolve, reject) => {
					//console.log('chunk', chunk);
					resolve();
				});
			},
			close() {},
			abort(err) {
				//console.error('Sink error:', err);
			},
		});
	}
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
		this.stream.pipeTo(new KeyboardInputSink());
	}
	push(value: TKeyboardInputEvent) {
		this.buffer.put(value);
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
