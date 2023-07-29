import { ICircularBuffer, createBuffer } from './buffer';
import { kbinEvent } from './kbin/kbin.entity';
import { EventStream } from './EventStream';

export class BasicStreambuf {
	buffer: ICircularBuffer<kbinEvent> = createBuffer();
	stream: EventStream;
	push(event: kbinEvent) {
		this.buffer.put(event);
	}
	constructor() {
		const self = this;
		this.stream = new EventStream(
		{
			start(controller) {
				while(true) {
					const event = self.buffer.get().value;
					if (event) {
						controller.enqueue(event);
					}
				}
			},
			transform(event: kbinEvent, controller) {
				controller.enqueue(event);
			},
			flush() {},
		})
	}
	pipe(rs: ReadableStream) {
		rs.pipeThrough(this.stream);
	}
}