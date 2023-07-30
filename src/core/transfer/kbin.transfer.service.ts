import { TKeyboardInputEvent } from '../../types';
import { ICircularBuffer } from './buffer/circular.buffer.interface';
import { createBuffer } from './buffer/circular.buffer';
import { IBasicStreambuf } from '../../interfaces/StreamBuffer.interface';

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
				console.log('starting..')
			},
			async transform(event: any, controller) {
        event = await event;
        console.log('transforming')
				controller.enqueue(event);
			},
			flush() {},
    });
    this.eventEncoder = () => {};
  }
  
}



function getStreamSource(buffer: ICircularBuffer<TKeyboardInputEvent>): UnderlyingDefaultSource<TKeyboardInputEvent> {
	const listen = (buffer: ICircularBuffer<TKeyboardInputEvent>, callback: (event: TKeyboardInputEvent) => any) =>  {
		requestAnimationFrame(() => {
			while(buffer.get().value) {
				if (buffer.value !== null)
					callback(buffer.value);
			}
			listen(buffer, callback);
		})
	}
	return {
		start(controller) {
			listen(buffer, (event) => {
				console.log('event received', event);
				controller.enqueue(event);
			})
		}
	}
}

export class KeyboardInputStreambuf implements IBasicStreambuf<TKeyboardInputEvent, KeyboardInputStream> {
	buffer = createBuffer<TKeyboardInputEvent>();
	stream: KeyboardInputStream;
	constructor() {
		this.stream = new KeyboardInputStream(getStreamSource(this.buffer));
		
	};
	push(value: TKeyboardInputEvent) {
		this.buffer.put(value);
	};
	pipe(ts: TransformStream) {
		this.stream.pipeThrough(ts);
	};
}