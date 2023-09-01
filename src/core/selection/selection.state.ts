import { TRange, TSelectionState } from '../../types';
import { getHtmlChildIndex, isDescendantNode, isEqualNode, swapRange } from '../../utils/common';
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
		const selectionRange = getTextSelection(element, selection);
		this.leftOffset = selectionRange.start;
		this.rightOffset = selectionRange.end;
		this.nodeText = HtmlTextParser.parse(element);
		this.selectionType = selection.type;
	}

	/**
	 * @returns number Array - 1st - focus line, 2nd - anchor line
	 */
	getSelectionLineRange(element: HTMLElement, selection: Selection): TRange {
		const range: TRange = {
			from: -1,
			to: -1,
		};

		if (!selection.focusNode?.parentElement || !selection.anchorNode?.parentElement) return range;

		const anchorNode: HTMLElement =
			selection.anchorNode instanceof HTMLElement
				? selection.anchorNode
				: selection.anchorNode.parentElement;

		const focusNode: HTMLElement =
			selection.focusNode instanceof HTMLElement
				? selection.focusNode
				: selection.focusNode.parentElement;

		const textToAnchor = HtmlTextParser.parseTo(element, anchorNode);
		const textToFocus = HtmlTextParser.parseTo(element, focusNode);

		range.from = textToAnchor.length + selection.anchorOffset;
		range.to = textToFocus.length + selection.focusOffset;

		if (range.from > range.to) swapRange(range);

		return range;
	}
}

export type TTextSelection = {
	start: number;
	end: number;
};

/**
 * Stolen from: https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container
 * Candor's algorythm
 *
 * @param editor
 * @param selection
 *
 */
export const getTextSelection = function (
	editor: HTMLElement,
	selection: Selection,
): TTextSelection {
	const range = selection.getRangeAt(0);

	return {
		start: getTextLength(editor, range.startContainer, range.startOffset),
		end: getTextLength(editor, range.endContainer, range.endOffset),
	};
};

const getTextLength = function (parent, node, offset) {
	let textLength = 0;

	if (node.nodeName == '#text') textLength += offset;
	else for (let i = 0; i < offset; i++) textLength += getNodeTextLength(node.childNodes[i]);

	if (node != parent) textLength += getTextLength(parent, node.parentNode, getNodeOffset(node));

	return textLength;
};

const getNodeTextLength = function (node) {
	let textLength = 0;

	if (node.nodeName == 'BR') textLength = 1;
	else if (node.nodeName == '#text') textLength = node.nodeValue.length;
	else if (node.childNodes != null)
		for (let i = 0; i < node.childNodes.length; i++)
			textLength += getNodeTextLength(node.childNodes[i]);

	return textLength;
};

const getNodeOffset = function (node) {
	return node == null ? -1 : 1 + getNodeOffset(node.previousSibling);
};
