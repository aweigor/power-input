import { KeyboardInputEvent } from './core/events/keyboard.input.event';
import { KeyboardInputStreambuf } from './core/transfer/kbin.transfer.service';
import { Speller } from './core/transform/speller';
import { Typographer } from './core/transform/typographer';
import { Writer } from './core/transform/writer';
import { VirtualInput } from './core/vinput/virtual-input';
import { IVirtualInput } from './core/vinput/virtual-input.interface';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import {} from './types';

hljs.registerLanguage('javascript', javascript);

function createElement(dispatcher: EventDispatcher): HTMLDivElement {
	const el = document.createElement('div');
	const ch = document.createElement('div');

	el.appendChild(ch);

	ch.setAttribute(
		'style',
		'background: red; white-space-collapse: preserve; white-space: -moz-pre-space;',
	);
	ch.setAttribute('contenteditable', 'true');
	ch.setAttribute('tabIndex', '0');

	dispatcher.attachListener(ch);

	return ch;
}

class EventDispatcher {
	constructor(private readonly _handler: (event: KeyboardEvent) => unknown) {}
	attachListener(el: HTMLElement): void {
		el.addEventListener(
			'keydown',
			(event) => {
				event.stopPropagation();
				event.preventDefault();

				this._handler(event);
			},
			{ capture: true },
		);

		el.addEventListener('change', (event) => {
			console.log('content has changed', event);
		});
	}
}

class PowerInput extends HTMLElement {
	processors: TransformStream[] = [];
	element: HTMLDivElement = createElement(new EventDispatcher(this.handleInput.bind(this)));
	virtualInput: VirtualInput = new VirtualInput();
	streambuf = new KeyboardInputStreambuf([new Speller(), new Typographer(this.virtualInput)]);
	constructor() {
		super();
		this.init();
	}
	init(): void {
		const writer = new Writer(this.element, (text: string) => {
			this.virtualInput.syncState({
				value: text,
			});
		});

		this.virtualInput.bindElement(this.element);

		for (const processor of PowerInput.prototype.processors) {
			console.log('piping..');
			this.streambuf.pipe(processor);
		}

		this.streambuf.pipeTo(writer);
		document.body.appendChild(this.element);
	}
	handleInput(event: KeyboardEvent): void {
		this.streambuf.push(new KeyboardInputEvent(event).value);
	}
}

export class Highlighter extends TransformStream {
	eventEncoder: () => void;
	constructor() {
		super({
			start(controller) {
				console.log('starting2..');
			},
			async transform(event: Awaited<{ text: string; caret: number }>, controller) {
				event = await event;
				controller.enqueue({
					text: hljs.highlight(event.text, { language: 'javascript' }).value,
					caret: event.caret,
				});
			},
			flush() {},
		});
		this.eventEncoder = () => {};
	}
}

//PowerInput.prototype.processors = [new Highlighter()];
PowerInput.prototype.processors = [new Highlighter()];

customElements.define('power-input', PowerInput);
