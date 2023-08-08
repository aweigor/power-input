export function isDescendantNode(parent: Node, child: Node | null): boolean {
	let node: Node | null = child;

	while (node !== null) {
		if (node == parent) break;
		node = node.parentNode;
	}

	return node !== null;
}

export function isEqualNode(one: Node, two: Node): boolean {
	return one.isEqualNode(two);
}

export function getHtmlChildIndex(parent: HTMLElement, child: HTMLElement): number {
	return Array.from(parent.children).indexOf(child);
}
