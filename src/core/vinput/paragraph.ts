import { DoublyLinkedList, ListElement } from '../../polyfills/doublyLinkedList';
import { IListElement } from '../../polyfills/listElement.interface';
import { TSelectionState } from '../../types';
import { Letter } from './letter.entity';

export class Paragraph extends DoublyLinkedList<Letter> {}
