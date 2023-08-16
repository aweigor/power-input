import { DoublyLinkedList, ListElement } from '../../polyfills/doublyLinkedList';
import { IListElement } from '../../polyfills/listElement.interface';
import { TInputState, TSelectionState } from '../../types';
import { Locales, decode } from '../format/charcode/decode';
import { SelectionListener } from '../selection/selection.listener';
import { Caret } from './caret';
import { Letter } from './letter.entity';
import { Paragraph } from './paragraph';
import { IVirtualInput } from './virtual-input.interface';

export class VirtualInput implements IVirtualInput {
	data: Letter[] = [];
	paragraphs: Paragraph[] = [new Paragraph()];
	caret: Caret = new Caret(this);
	get paragraph(): Paragraph {
		// no multiple paragraphs yet
		return this.paragraphs[0];
	}
	get text(): string {
		let text = '';
		for (const letter of this.paragraph) {
			console.log(decode(letter.data.code, letter.data.alt, letter.data.shift, Locales.en));
			text += decode(letter.data.code, letter.data.alt, letter.data.shift, Locales.en);
		}

		return text;
	}
	insert(letter: Letter): void {
		if (this.caret.next === null && this.caret.prev === null) {
			const item = this.paragraph.init(letter);
			this.caret.next = item;
		} else if (this.caret.prev && this.caret.next) {
			const item = this.paragraph.insertAfter(letter, this.paragraph.findIndex(this.caret.prev));
			if (item !== null) {
				this.caret.prev.next = item;
				this.caret.next.prev = item;
				item.next = this.caret.next;
				this.caret.next = item;
			}
		} else if (this.caret.prev !== null) {
			const item = this.paragraph.insertAfter(letter, this.paragraph.length);
			if (item !== null) {
				this.caret.prev.next = item;
				this.caret.next = item;
			}
		} else if (this.caret.next !== null) {
			const item = this.paragraph.insertBefore(letter, 0);
			if (item !== null) {
				this.caret.next.prev = item;
				this.caret.next = item;
			}
		}
	}
	remove(): void {}
	syncState(state: TInputState): IVirtualInput {
		if (state.selection !== undefined) {
			this.caret.syncState(state.selection);

			console.log('sync state', state.selection, this.caret);
		}
		return this;
	}
	bindElement(element: HTMLElement): void {
		SelectionListener.bind(element, (state: TSelectionState | null) => {
			if (state === null) return;
			this.syncState({
				selection: state,
			});
		});
	}
	constructor(state?: TInputState) {
		state && this.syncState(state);
	}
}
