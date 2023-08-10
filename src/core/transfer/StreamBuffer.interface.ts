import { ICircularBuffer } from './buffer/circular.buffer';

export interface IBasicStreambuf<T, K extends ReadableStream> {
	buffer: ICircularBuffer<T>;
	stream: K;
	push: (...args: any[]) => void;
	pipe: (ts: TransformStream) => void;
	pipeTo: (ws: WritableStream) => void;
}
