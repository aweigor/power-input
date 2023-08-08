export function isDescendantNode(parent: Node, child: Node | null): boolean {
	let node: Node | null = child;

	while (node !== null) {
		if (node == parent) break;
		node = node.parentNode;
	}

	return node !== null;
}
