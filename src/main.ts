import { KeyboardInputEvent, createKeyboardInputEvent } from './core/events/keyboard.input.event';
import { SelectionEventDto } from './core/selection/selection.dto';
import { KeyboardInputStreambuf } from './core/transfer/kbin.transfer.service';
import { Speller } from './core/transform/speller';
import { VirtualInput } from './core/vinput/virtual.input';
import { IVirtualInput } from './core/vinput/virtual.input.interface';
import {} from './types';

function createElement(dispatcher: EventDispatcher) {
	const el = document.createElement('div');
	const ch = document.createElement('div');

	el.appendChild(ch);

	ch.setAttribute('style', 'background: red; ');
	ch.setAttribute('contenteditable', 'true');
	ch.setAttribute('tabIndex', '0');

	dispatcher.attachListener(ch);

	return el;
}

class EventDispatcher {
	constructor(private readonly _handler: (event: KeyboardEvent) => any) {}
	attachListener(el: HTMLElement) {
		el.addEventListener(
			'keydown',
			(event) => {
				event.stopImmediatePropagation();
				event.stopPropagation();
				event.preventDefault();

				this._handler(event);
			},
			{ capture: true },
		);
	}
}

class PowerInput extends HTMLElement {
	element: HTMLDivElement = createElement(new EventDispatcher(this.handleInput.bind(this)));
	virtualInput: IVirtualInput = new VirtualInput();
	streambuf = new KeyboardInputStreambuf();
	constructor() {
		super();
		this.init();
	}
	init() {
		document.body.appendChild(this.element);
		this.streambuf.pipe(new Speller());
	}
	handleInput(event: KeyboardEvent) {
		this.streambuf.push(new KeyboardInputEvent(event));
	}
}

customElements.define('power-input', PowerInput);
