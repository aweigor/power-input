import { ICircularBuffer } from '../core/transfer/buffer/circular.buffer';

export interface IBasicStreambuf<T, K extends ReadableStream> {
	buffer: ICircularBuffer<T>;
	stream: K;
	push: (arg: any) => void;
	pipe: (ts: TransformStream) => void;
}
