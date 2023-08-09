import { TInputState, TSelectionState } from '../../types';
import { SelectionListener } from '../selection/selection.listener';
import { Letter } from './letter.entity';
import { IVirtualInput } from './virtual-input.interface';

class Line {
	head: Letter | null = null;
	next: Line | null = null;
	prev: Line | null = null;
}

class Paragraph {
	head: Line | null = null;
	next: Paragraph | null = null;
	prev: Paragraph | null = null;
}

class Carret {
	prev: Letter | null = null;
	next: Letter | null = null;
}

export class VirtualInput implements IVirtualInput {
	data: Letter[];
	lines: Line[] = [];
	paragraphs: Paragraph[] = [];
	carret: Carret = new Carret();
	get text(): string {
		return '';
	}
	insert(letter: Letter): void {
		console.log('insert', letter);
	}
	remove(): void {}
	syncState(state: TInputState): IVirtualInput {
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
