import { DoublyLinkedList, ListElement } from '../../polyfills/doublyLinkedList';
import { IListElement } from '../../polyfills/listElement.interface';
import { CommandTypes, TInputState, TSelectionState } from '../../types';
import { Locales, decode } from '../format/charcode/decode';
import { SelectionListener } from '../selection/selection.listener';
import { Letter } from './letter.entity';
import { Paragraph } from './paragraph';
import { IVirtualInput } from './virtual-input.interface';

export class VirtualInput implements IVirtualInput {
	data: Letter[] = [];
	paragraph: Paragraph = new Paragraph();
	get text(): string {
		let text = '';

		for (const letter of this.paragraph) {
			text += decode(
				letter.data.code,
				letter.data.type,
				letter.data.alt,
				letter.data.shift,
				Locales.en,
			);
		}

		return text;
	}
	insertSymbol(letter: Letter): void {
		this.paragraph.insertNext(letter);
	}
	runCommand(letter: Letter): void {
		switch (CommandTypes[letter.code]) {
			case 'BACKSPACE': {
				this.paragraph.removePrev();
				break;
			}
			case 'SPACE': {
				this.insertSymbol(letter);
				break;
			}
			case 'ENTER': {
				this.insertSymbol(letter);
				break;
			}
			case 'LEFT': {
				this.paragraph.setCaretPosition(this.paragraph.caret.prev);
				break;
			}
			case 'RIGHT': {
				this.paragraph.setCaretPosition(this.paragraph.caret.next + 1);
				break;
			}
			case 'TOP': {
				break;
			}
			case 'BOTTOM': {
				break;
			}
			default:
				break;
		}
	}
	syncState(state: TInputState): IVirtualInput {
		if (state.selection !== undefined) {
			this.paragraph.syncState(state.selection);
		}
		if (state.value !== undefined) {
			//console.log('state sync', state.value);
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
