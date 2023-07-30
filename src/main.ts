import { createKeyboardInputEvent } from './core/events/keyboard.input.event';
import { SelectionEventDto } from './core/transfer/dto/selectionEvent.dto';
import { KeyboardInputStreambuf } from './core/transfer/kbin.transfer.service';
import {} from './types';

function createInput(dispatcher: EventDispatcher) {
  const el = document.createElement('div');
  const ch = document.createElement('div');

  el.appendChild(ch);
  
  ch.setAttribute("style", "background: red; ");
  ch.setAttribute("contenteditable", "true");
  ch.setAttribute("tabIndex", "0");

  dispatcher.attachListener(ch);

  return el;
}

class EventDispatcher {
  constructor(private readonly _handler: (event: KeyboardEvent) => any) {}
  attachListener(el: HTMLElement) {
    el.addEventListener('keydown', (event) => {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
  
      this._handler(event);
  
    }, { capture: true });
  }
}

class SelectionListener {
  selection: Selection | null = window?.getSelection() || null;
  value: SelectionEventDto;
  constructor(private readonly _el: HTMLDivElement) {
    this.init();
  }
  init() {
    document.addEventListener('selectionchange', (event) => {
      if (this.selection !== null) {
        this.value = new SelectionEventDto(this._el, this.selection);
      } 
      console.log('selection is changed', event, this.value);
    })
  }
}


class PowerInput extends HTMLElement {
  el: HTMLDivElement = createInput(new EventDispatcher(this.handleInput.bind(this)));
  selection = new SelectionListener(this.el);
  streambuf = new KeyboardInputStreambuf();
  constructor() {
    super();
    this.init();
  }
  init() {
    document.body.appendChild(this.el);
  }
  handleInput(event: KeyboardEvent) {
    this.streambuf.push(
      createKeyboardInputEvent(this.selection.value, event)
    );
  }
}

customElements.define("power-input", PowerInput);