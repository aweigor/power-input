import { TSelectionState } from '../../types';
import { SelectionState } from './selection.state';

export type TSelectionHandler = (state: TSelectionState | null) => unknown;

/**
 * SelectionListener
 * The class binds Html Element to Window's selection changes
 * in order to get its current SelectionState.
 * State is null means that:
 * 1. element is not currently selected
 * 2. anchorNode of selection differs from its focusNode
 * 3. class is not being initialized
 */

export class SelectionListener {
	state: TSelectionState | null;

	get selection(): Selection | null {
		return window?.getSelection();
	}

	constructor(
		private readonly _element: HTMLElement,
		private readonly _handler: TSelectionHandler,
	) {}

	init(): SelectionListener {
		document.addEventListener('selectionchange', () => {
			if (this.selection !== null) {
				this._handler((this.state = new SelectionState(this._element, this.selection).value));
			}
		});
		return this;
	}

	static bind(element: HTMLElement, handler: TSelectionHandler): SelectionListener {
		return new SelectionListener(element, handler).init();
	}
}
