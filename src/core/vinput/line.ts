import { DoublyLinkedList } from '../../polyfills/doublyLinkedList';
import { Letter } from './letter.entity';

export class Line extends DoublyLinkedList<Letter> {}
