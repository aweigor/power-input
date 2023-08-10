export class Writer extends WritableStream {
	constructor(private readonly _element: HTMLElement) {
		super({
			write(chunk) {
				return new Promise((resolve, reject) => {
					console.log('chunk', chunk);
					_element.innerText = chunk.value;
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
