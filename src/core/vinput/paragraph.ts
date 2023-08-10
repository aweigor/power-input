import { DoublyLinkedList, ListElement } from '../../polyfills/doublyLinkedList';
import { IListElement } from '../../polyfills/listElement.interface';
import { TSelectionState } from '../../types';
import { Line } from './line';

export class Paragraph extends DoublyLinkedList<Line> {
	createElement(): IListElement<Line> {
		return new ListElement(new Line());
	}
	syncState(selection: TSelectionState): Paragraph {
		if (selection.linesCount > this.length) {
			if (!this.head && !this.tail) {
				this.init(this.createElement());
			}
			while (selection.linesCount > this.length) {
				this.insertBefore(this.createElement(), selection.focusLine);
			}
		}
		return this;
	}
}
