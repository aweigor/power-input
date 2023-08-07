import { TSelectionState } from '../../types';
import { SelectionStateDto } from './selection.dto';

export type TSelectionHandler = (state: TSelectionState) => unknown;

export class SelectionListener {
	get selection(): Selection | null {
		return window?.getSelection();
	}
	state: TSelectionState;
	handler: TSelectionHandler | null = null;
	constructor(private readonly _el: HTMLElement) {
		this.init();
	}
	init(): void {
		document.addEventListener('selectionchange', (event) => {
			if (this.selection !== null) {
				const dto = new SelectionStateDto(this._el, this.selection);
				this.state = dto.serialize();
				this.handler && this.handler(this.state);
				console.log('selection changed', event);
			}
		});
	}
	onChange(callback: TSelectionHandler): void {}
}
