/**
 * Circular buffer
 * 
 * 
*/

import { ICircularBuffer } from './buffer.interfaces';

export type { ICircularBuffer };

enum props { N = 10 };

export function createBuffer<ItemType = void>(): ICircularBuffer<ItemType>  {
  let buffer: ItemType[] = [];
  let writeIdx: number = 0;
  let readIdx: number = 0;

  const context: ICircularBuffer<ItemType> = { put, get, value: null };

  function put(item: ItemType): ICircularBuffer<ItemType> {
    if ((writeIdx + 1) % props.N === readIdx) {
      // overflow
      return context;
    }
    
    buffer[writeIdx] = item;
    writeIdx = (writeIdx + 1) % props.N;

    return context;
  }

  function get(): ICircularBuffer<ItemType> {
    if (readIdx === writeIdx) {
      // empty
      context.value = null;
      return context;
    }

    context.value = buffer[readIdx];
    readIdx = (readIdx + 1) % props.N;

    return context;
  }

  return context;
}