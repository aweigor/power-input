import { IListElement } from '../../polyfills/listElement.interface';
import { TSelectionState } from '../../types';
import { Letter } from './letter.entity';
import { VirtualInput } from './virtual-input';

export class Caret {
	prev: IListElement<Letter> | null = null;
	next: IListElement<Letter> | null = null;

	constructor(private readonly _ctx: VirtualInput) {}

	syncState(selection: TSelectionState): Caret {
		return this;
	}
}
