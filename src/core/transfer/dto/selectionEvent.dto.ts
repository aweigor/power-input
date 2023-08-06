import { TSelectionChangeEventParameters, TSerializedSelectionObject } from '../../../types';

export class SelectionEventDto {
	element?: HTMLElement;
	paragraphs?: string[];
	focusOffset: TSerializedSelectionObject['focusOffset'];
	anchorOffset: TSerializedSelectionObject['anchorOffset'];
	focusLine: TSerializedSelectionObject['focusLine'];
	anchorLine: TSerializedSelectionObject['anchorLine'];
	lines: TSerializedSelectionObject['lines'];
	text?: TSerializedSelectionObject['text'];
	focus?: TSerializedSelectionObject['focus'];

	constructor(element: HTMLDivElement, selection: Selection) {
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

	serialize() {
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

	getFocusLine(selection: Selection) {
		if (!selection.focusNode) return null;
		return this.indexOf(selection.focusNode.parentElement);
	}

	getAnchorLine(selection: Selection) {
		if (!selection.anchorNode) return null;
		return this.indexOf(selection.anchorNode.parentElement);
	}

	indexOf(elt: HTMLElement | null) {
		if (elt === null) return -1;
		return Array.from(elt.children).indexOf(elt);
	}

	isDescendant(parent, child) {
		let node = child;

		while (node) {
			if (node == parent) return true;
			node = node.parentNode;
		}

		return false;
	}
}
