export function getFocusNode(
	caret: number,
	root: HTMLElement,
): {
	focusNode: Node | null;
	nodeCaret: number;
} {
	// Result of Finding Focus Node is Node, which text content belongs to caret's index in continous text of root element
	let focusNode: Node | null = null;
	let contentLength = 0;
	for (const node of traverseNodes(root)) {
		if (node.textContent?.length !== undefined) {
			contentLength = node.textContent.length;
		} else {
			contentLength = 0;
		}
		if (contentLength >= caret) {
			focusNode = node;
			break;
		} else {
			caret -= contentLength;
		}
	}
	return {
		focusNode,
		nodeCaret: caret,
	};

	function* traverseNodes(root): IterableIterator<Node> {
		function* t(node): IterableIterator<Node> {
			if (node.hasChildNodes() as boolean) {
				for (const child of node.childNodes) {
					yield* t(child);
				}
			} else {
				yield node;
			}
		}

		for (const i of t(root)) {
			yield i;
		}
	}
}

export class Writer extends WritableStream {
	constructor(
		private readonly _element: HTMLElement,
		onWriteEnd: (text: string) => void,
	) {
		super({
			write(chunk) {
				return new Promise((resolve, reject) => {
					_element.innerHTML = chunk.text;

					const range = document.createRange();
					const sel = window.getSelection();

					const { focusNode, nodeCaret } = getFocusNode(chunk.caret + 1, _element);
					if (focusNode !== null) {
						range.setStart(focusNode, nodeCaret);

						if (sel !== null) {
							sel.removeAllRanges();
							sel.addRange(range);
						}
					}

					onWriteEnd(_element.innerText);

					resolve();
				});
			},
			close() {},
			abort(err) {
				console.error('Sink error:', err);
			},
		});
	}
}
