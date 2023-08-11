import { TSelectionState } from '../../types';
import { getHtmlChildIndex, isDescendantNode, isEqualNode } from '../../utils/common';
import { HtmlTextParser } from '../parser/HtmlText.parser';

/**
 * Selection State
 * Define begin and end position of selection in VISIBLE text
 * Use HtmlTextParser, same parser as for VirtualInput
 */

export class SelectionState {
	element: HTMLElement;
	leftOffset: number;
	rightOffset: number;
	nodeText: string;
	selectionType: string;

	get value(): TSelectionState {
		return {
			leftOffset: this.leftOffset,
			rightOffset: this.rightOffset,
			nodeText: this.nodeText,
			selectionType: this.selectionType,
		};
	}

	constructor(element: HTMLElement, selection: Selection) {
		const selectionRange = this.getSelectionLineRange(element, selection);
		this.leftOffset = selectionRange[0];
		this.rightOffset = selectionRange[1];
		this.nodeText = HtmlTextParser.parse(element);
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

		const textBetween = HtmlTextParser.parseBetween(element, anchorNode, focusNode);
		console.log('textBetween', textBetween);

		return [getHtmlChildIndex(element, anchorNode) + 1, getHtmlChildIndex(element, focusNode) + 1];
	}
}
