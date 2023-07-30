import { ICircularBuffer } from '../buffer';

export interface IBasicStreambuf<T, K extends ReadableStream> {
	buffer: ICircularBuffer<T>;
	stream: K;
	push: (arg: any) => void;
	pipe: (ts: TransformStream) => void;
}