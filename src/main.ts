import {
  TSelectionChangeEventParameters
} from './types';

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
  constructor() {
    document.addEventListener('selectionchange', (event) => {
      console.log('selection is changed', this.selection);
    })
  }
}


class PowerInput extends HTMLElement {
  el: HTMLDivElement = createInput(new EventDispatcher(this.handleInput.bind(this)));
  selection = new SelectionListener();
  constructor() {
    super();
    this.init();
  }
  init() {
    document.body.appendChild(this.el);
  }
  handleInput(event: KeyboardEvent) {
    console.log('input handled', event, this.selection);
  }
}

customElements.define("power-input", PowerInput);