export class EventStream<R = any> extends ReadableStream<R> {
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