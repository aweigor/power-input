import { TInputState, TSelectionState } from '../../types';
import { SelectionListener } from '../selection/selection.listener';
import { Letter } from '../transform/letter.entity';
import { IVirtualInput } from './virtual.input.interface';

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
	insert(letter: Letter): void {}
	remove(): void {}
	syncState(state: TInputState): IVirtualInput {
		return this;
	}
	bindElement(element: HTMLElement): void {
		const selectionListener = new SelectionListener(element);
		selectionListener.onChange((event: TSelectionState) => {
			this.syncState({
				selection: event,
			});
		});
	}
	constructor(state?: TInputState) {
		state && this.syncState(state);
	}
}
