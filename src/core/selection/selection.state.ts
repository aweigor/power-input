import { TSelectionState } from '../../types';
import { getHtmlChildIndex, isDescendantNode, isEqualNode } from '../../utils/common';

export class SelectionState {
	element: HTMLElement;
	paragraphs: string[];
	focusOffset: TSelectionState['focusOffset'];
	anchorOffset: TSelectionState['anchorOffset'];
	focusLine: TSelectionState['focusLine'];
	anchorLine: TSelectionState['anchorLine'];
	linesCount: TSelectionState['linesCount'];
	nodeText: TSelectionState['nodeText'];
	selectionType: TSelectionState['selectionType'];

	constructor(element: HTMLElement, selection: Selection) {
		const selectionLineRange = this.getSelectionLineRange(element, selection);
		this.paragraphs = element.innerText.split('\n\n');
		this.focusOffset = selection.focusOffset;
		this.anchorOffset = selection.anchorOffset;
		this.focusLine = selectionLineRange[0];
		this.anchorLine = selectionLineRange[1];
		this.linesCount = this.paragraphs.reduce((acc, el) => el.split('\n').length + acc, 0);
		this.nodeText = element.innerText;
		this.selectionType = selection.type;
	}

	/**
	 * @returns number Array - 1st - focus line, 2nd - anchor line
	 */
	getSelectionLineRange(element: HTMLElement, selection: Selection): number[] {
		const res = [-1, -1];

		if (!selection.focusNode?.parentElement || !selection.anchorNode?.parentElement) return res;

		const anchorNode: HTMLElement =
			selection.anchorNode instanceof HTMLElement
				? selection.anchorNode
				: selection.anchorNode.parentElement;

		const focusNode: HTMLElement =
			selection.focusNode instanceof HTMLElement
				? selection.focusNode
				: selection.focusNode.parentElement;

		return [getHtmlChildIndex(element, anchorNode) + 1, getHtmlChildIndex(element, focusNode) + 1];
	}

	static instance(element: HTMLElement, selection: Selection): TSelectionState | null {
		if (
			selection.anchorNode === null ||
			selection.focusNode === null ||
			!isDescendantNode(element, selection.focusNode) ||
			!isDescendantNode(element, selection.anchorNode)
		)
			return null;

		const self = new SelectionState(element, selection);

		return {
			focusLine: self.focusLine,
			focusOffset: self.focusOffset,
			anchorLine: self.anchorLine,
			anchorOffset: self.anchorOffset,
			linesCount: self.linesCount,
			nodeText: self.nodeText,
			selectionType: self.selectionType,
		};
	}
}
