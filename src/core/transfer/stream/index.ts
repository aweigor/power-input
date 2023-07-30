import { ICircularBuffer } from '../buffer/circular.buffer.interface';
import { TStreamItem } from '../../../types';
import { createBuffer } from '../buffer/circular.buffer.'

export class Stream<DataType> {
  buffer: ICircularBuffer<TStreamItem<DataType>>;
  constructor() {
    this.buffer = createBuffer<TStreamItem<DataType>>();
  }
  flush(): DataType[] {
    let result: DataType[] = [];
    while (this.buffer.get().value !== null)
      result.push(this.buffer.value as DataType);
    return result;
  }
}

export class WritableStream<DataType> extends Stream<DataType> {
  write(data: DataType, timestamp :number): DataType[] {
    const item: TStreamItem<DataType> = { data, timestamp };
    if (this.buffer.put(item).value === null) {
      return this.flush();
    }
    return [data];
  }
}

export class ReadableStream<DataType> extends Stream<DataType> {
  read() {
    // not implemented
  }
}