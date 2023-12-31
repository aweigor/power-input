import { TRange } from '../../types';
import { swapRange } from '../../utils/common';

export class HtmlTextParser {
	static parse(element: HTMLElement): string {
		return element.innerText;
	}
	static parseBetween(element: HTMLElement, from: HTMLElement, to: HTMLElement): string | null {
		const children = Array.from(element.children);
		const range = {
			from: children.indexOf(from),
			to: children.indexOf(to),
		};

		if (range.from > range.to) {
			swapRange(range);
		}

		const parseNodes = children.slice(range.from, range.to);
		const parseElement = document.createElement('div');

		for (const node of parseNodes) {
			parseElement.appendChild(node.cloneNode(true));
		}

		return parseElement.innerText;
	}
	static parseTo(element: HTMLElement, to: HTMLElement): string {
		if (element.isEqualNode(to)) return '';
		const elementCopy = element.cloneNode(true) as HTMLElement;
		const elementChildren = Array.from(element.children);
		const copyChildren = Array.from(elementCopy.children);
		for (const elt of copyChildren.slice(elementChildren.indexOf(to))) {
			elementCopy.removeChild(elt);
		}
		return elementCopy.innerText;
	}
}
