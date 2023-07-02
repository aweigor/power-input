import {
  TSelectionChangeEventParameters
} from './types';

import {
  SelectionEventDto
} from './core/transfer/dto/selectionEvent.dto';

import { EventBus } from './services/eventBus.service';
import { WritableStream } from './core/transfer/stream';

/**
 * EventBus initialization
 * at the time it is there
*/
const eventBus = new EventBus();
const $emit = eventBus.emit;
const $subscribe = eventBus.subscribe;


/**
 * Streams initialization
 * at the thist time it is there
*/
const stream = new WritableStream();

class PowerInput extends HTMLElement {
  el?: HTMLDivElement;
  selection: Selection | null = null;
  constructor() {
    super();
    this.el = this.createInputElement();
    this.attachInputElement(this.el);
  }
  createInputElement(): HTMLDivElement {
    const el = document.createElement('div');

    el.setAttribute("contenteditable", "true" );
    el.setAttribute("tabIndex", "0" );

    return el;
  }
  onSelectionChanged(event: CustomEvent<TSelectionChangeEventParameters>) {
    const selectionDto = SelectionEventDto.getDto(event, this.el as HTMLElement, this.selection as Selection);
    stream.write(selectionDto, Date.now());
    console.log(selectionDto, stream.buffer);
  }
  attachInputElement(el: HTMLElement) {
    if (!el) return;

    this.appendChild(el);
    
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(el, 0);
    range.setEnd(el, 0 );
    selection?.addRange(range);

    this.selection = selection;

    document.addEventListener('selectionchange', (event) => {
      this.onSelectionChanged
        .bind(this, event as CustomEvent<TSelectionChangeEventParameters>);
    })

    $emit('element-attached', el);
  }
}

customElements.define("power-input", PowerInput);