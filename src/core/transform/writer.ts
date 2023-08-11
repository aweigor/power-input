export class Writer extends WritableStream {
	constructor(private readonly _element: HTMLElement) {
		super({
			write(chunk) {
				return new Promise((resolve, reject) => {
					console.log('chunk', chunk);
					const value = '<span>1</span><span>2</span><span>3</span><span>4</span>';
					_element.innerHTML = value;
					//_element.innerText = chunk.value;
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
