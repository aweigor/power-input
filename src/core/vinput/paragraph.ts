import { DoublyLinkedList, ListElement } from '../../polyfills/doublyLinkedList';
import { IListElement } from '../../polyfills/listElement.interface';
import { TSelectionState } from '../../types';
import { Letter } from './letter.entity';

export type TCaret = {
	prev: number;
	next: number;
	type: string;
};

export class Paragraph extends DoublyLinkedList<Letter> {
	caret: TCaret = {
		prev: -1,
		next: -1,
		type: 'Caret',
	};
	get caretPrev(): IListElement<Letter> | null {
		return this.find(this.caret.prev);
	}
	get caretNext(): IListElement<Letter> | null {
		return this.find(this.caret.next);
	}
	get caretPosition(): number {
		if (this.caret.type === 'Caret') {
			return this.caret.prev + 1;
		}
		return -1;
	}
	syncState(selection: TSelectionState): Paragraph {
		this.caret.prev = selection.leftOffset - 1;
		this.caret.next = selection.rightOffset;
		this.caret.type = 'Caret';
		return this;
	}
	/***
	 * Collapsing selected area
	 * Removes every symbols between left and right bounds of selection
	 * Returns removed elements;
	 * The action performed before every insertion
	 */
	collapse(): void {}

	insertNext(letter: Letter): void {
		if (this.caretPrev === null && this.caretNext === null) {
			if (this.length !== 0) {
				this.insertAfter(letter, this.length - 1);
				this.caret.next = this.length;
				this.caret.prev = this.length - 1;
			} else {
				this.init(letter);
			}
		} else if (this.caretPrev !== null && this.caretNext !== null) {
			this.insertAfter(letter, this.caret.prev);
		} else if (this.caretPrev !== null) {
			this.insertAfter(letter, this.length - 1);
		} else if (this.caretNext !== null) {
			this.insertBefore(letter, 0);
		}
	}

	removePrev(): void {
		if (this.caretPrev !== null) {
			const prev = this.caretPrev.prev;
			const next = this.caretNext;
			const removedItem = this.remove(this.caret.prev);
			if (removedItem !== null) {
				if (next) {
					this.caret.next = this.findIndex(next);
				} else {
					this.caret.next = -1;
				}
				if (prev) {
					this.caret.prev = this.findIndex(prev) - 1;
				} else {
					this.caret.prev = -1;
				}
			}
		}
	}
}
