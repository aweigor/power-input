import { IListElement } from '../../polyfills/listElement.interface';
import { TSelectionState } from '../../types';
import { ICarret } from './carret.interface';
import { Letter } from './letter.entity';
import { Line } from './line';
import { VirtualInput } from './virtual-input';

export class Carret implements ICarret<IListElement<Line>> {
	prevLine: IListElement<Line> | null = null;
	prevOffset: number = -1;
	nextLine: IListElement<Line> | null = null;
	nextOffset: number = -1;

	constructor(private readonly _ctx: VirtualInput) {}

	get prev(): IListElement<Letter> | null {
		if (this.prevLine === null) return null;
		return this.prevLine.data.find(this.prevOffset);
	}

	get next(): IListElement<Letter> | null {
		if (this.nextLine === null) return null;
		return this.nextLine.data.find(this.nextOffset);
	}

	syncState(selection: TSelectionState): Carret {
		const focus_orient_forward =
			selection.anchorLine - selection.focusLine <= 0 &&
			selection.anchorOffset - selection.focusOffset <= 0;

		const nextPos = {
			line: focus_orient_forward ? selection.focusLine : selection.anchorLine,
			offset: focus_orient_forward ? selection.focusOffset : selection.anchorOffset,
		};

		const prevPos = {
			line: focus_orient_forward ? selection.anchorLine : selection.focusLine,
			offset: focus_orient_forward ? selection.anchorOffset - 1 : selection.focusOffset - 1,
		};

		this.nextLine = this._ctx.paragraph.find(nextPos.line);
		this.prevLine = this._ctx.paragraph.find(prevPos.line);

		this.nextOffset = nextPos.offset;
		this.prevOffset = prevPos.offset;

		return this;
	}
}
