import { TSelectionState } from '../../types';

export class SelectionStateDto {
	element?: HTMLElement;
	paragraphs?: string[];
	focusOffset: TSelectionState['focusOffset'];
	anchorOffset: TSelectionState['anchorOffset'];
	focusLine: TSelectionState['focusLine'];
	anchorLine: TSelectionState['anchorLine'];
	lines: TSelectionState['lines'];
	text?: TSelectionState['text'];
	focus?: TSelectionState['focus'];

	constructor(element: HTMLElement, selection: Selection) {
		this.element = element;
		this.paragraphs = element.innerText.split('\n\n');
		this.focusOffset = selection.focusOffset;
		this.anchorOffset = selection.anchorOffset;
		this.focusLine = this.getFocusLine(selection);
		this.anchorLine = this.getAnchorLine(selection);
		this.lines = this.paragraphs.reduce((acc, el) => el.split('\n').length + acc, 0);
		this.text = element.innerText;
		this.focus = this.isDescendant(element, selection.focusNode);
	}

	serialize(): TSelectionState {
		return {
			focusOffset: this.focusOffset,
			anchorOffset: this.anchorOffset,
			focusLine: this.focusLine,
			anchorLine: this.anchorLine,
			lines: this.lines,
			text: this.text,
			focus: this.focus,
		};
	}

	getFocusLine(selection: Selection): number | null {
		if (!selection.focusNode) return null;
		return this.indexOf(selection.focusNode.parentElement);
	}

	getAnchorLine(selection: Selection): number | null {
		if (!selection.anchorNode) return null;
		return this.indexOf(selection.anchorNode.parentElement);
	}

	indexOf(elt: HTMLElement | null): number {
		if (elt === null) return -1;
		return Array.from(elt.children).indexOf(elt);
	}

	isDescendant(parent, child): boolean {
		let node = child;

		while (node !== null) {
			if (node == parent) return true;
			node = node.parentNode;
		}

		return false;
	}
}
