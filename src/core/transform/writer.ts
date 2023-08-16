export class Writer extends WritableStream {
	constructor(private readonly _element: HTMLElement) {
		super({
			write(chunk) {
				return new Promise((resolve, reject) => {
					_element.innerHTML = chunk.text;

					const range = document.createRange();
					const sel = window.getSelection();

					if (sel !== null) {
						sel.removeAllRanges();
						sel.addRange(range);
					}

					range.setStart(_element, 1);
					range.collapse(true);

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
