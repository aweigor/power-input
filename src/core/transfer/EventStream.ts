import { IEventStream } from './EventStream.interface';

export class EventStream<R = any> extends TransformStream {
  eventEncoder: () => void;
  constructor(transformContent: Transformer) {
    super({ ...transformContent });
    this.eventEncoder = () => {};
  }
}
