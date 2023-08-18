export class Writer extends WritableStream {
	constructor(private readonly _element: HTMLElement) {
		super({
			write(chunk) {
				return new Promise((resolve, reject) => {
					_element.innerHTML = chunk.text;
					const range = document.createRange();
					const sel = window.getSelection();

					range.setStart(_element.childNodes[0], chunk.caret + 1);

					if (sel !== null) {
						sel.removeAllRanges();
						sel.addRange(range);
					}

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
