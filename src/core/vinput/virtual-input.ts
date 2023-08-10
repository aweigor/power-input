import { DoublyLinkedList, ListElement } from '../../polyfills/doublyLinkedList';
import { IListElement } from '../../polyfills/listElement.interface';
import { TInputState, TSelectionState } from '../../types';
import { SelectionListener } from '../selection/selection.listener';
import { Carret } from './carret';
import { Letter } from './letter.entity';
import { Paragraph } from './paragraph';
import { IVirtualInput } from './virtual-input.interface';

export class VirtualInput implements IVirtualInput {
	data: Letter[] = [];
	paragraphs: Paragraph[] = [new Paragraph()];
	carret: Carret = new Carret(this);
	get paragraph(): Paragraph {
		// no multiple paragraphs yet
		return this.paragraphs[0];
	}
	get text(): string {
		return '';
	}
	insert(letter: Letter): void {
		const elt = new ListElement(letter);
		if (this.carret.nextLine !== null) {
			this.carret.nextLine.data.insertBefore(elt, this.carret.nextOffset);

			console.log('insert', this.carret.nextLine);
		}
	}
	remove(): void {}
	syncState(state: TInputState): IVirtualInput {
		if (state.selection !== undefined) {
			this.paragraph.syncState(state.selection);
			this.carret.syncState(state.selection);

			console.log('sync state', state.selection, this.carret);
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
