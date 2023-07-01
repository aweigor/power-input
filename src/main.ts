import {
  ICircularBuffer,
  createBuffer
} from './buffer';


type TEventBusHandler = {
  id?: string;
  callback: (...args: any[]) => void;
}

class EventBus {
  listeners: Map<string, TEventBusHandler[]> = new Map();
  subscribe(name: string, handler: TEventBusHandler) {
    if (!this.listeners.has(name)) {
      this.listeners.set(name, [handler]);
    } else {
      const eventHandlers = this.listeners.get(name);
      if (!eventHandlers) return;
      eventHandlers.push(handler);
    }
  }
  unsubscribe(name: string, id: string) {
    for (const [eventName, eventHandlers] of this.listeners) {
      for (const [index, handler] of eventHandlers.entries()) {
        if (handler.id === id && eventName === name) {
          return eventHandlers.splice(index, 1);
        }
      }
    }
  }
  emit(name, ...args: any[]) {
    const eventHandlers = this.listeners.get(name);
    if (!eventHandlers) return;
    eventHandlers.forEach((handler) => {
      handler.callback(...args);
    })
  }
}

const eventEmitter = new EventBus();


class EventBufferEntry {
  element?: HTMLElement;
  selection?: any;
}

class EventBufferSelectionEntry extends EventBufferEntry {
  focusOffset;
  anchorOffset;
  focusLine;
  anchorLine;
  lines;
  text;
  focus;
  constructor() {
    super();
    if (!this.element || !this.selection) return;

    if (!this.isDescendant(this.element, this.selection.focusNode)) {
      // not implemented yet
      return
    }
    
    const paragraphs = this.element.innerText.split('\n\n');
    this.focusOffset = this.selection.focusOffset
    this.anchorOffset = this.selection.anchorOffset
    this.focusLine = this.getFocusLine(this.selection)
    this.anchorLine = this.getAnchorLine(this.selection)
    this.lines = paragraphs.reduce((acc, el) => el.split('\n').length + acc, 0);
    this.text = this.element.innerText;
    this.focus = this.isDescendant(this.element, this.selection.focusNode);
  }
  static create(selectionEvent) {
    return new EventBufferSelectionEntry();
  }
  getFocusLine (selection) {
    let index = this.indexOf(selection.focusNode.parentElement) !== -1 
      ? this.indexOf(selection.focusNode.parentElement) 
      : this.indexOf(selection.focusNode);
    return index + 1;
  }

  getAnchorLine (selection) {
    let index = this.indexOf(selection.anchorNode.parentElement) !== -1 
      ? this.indexOf(selection.anchorNode.parentElement) 
      : this.indexOf(selection.anchorNode);
    return index + 1;
  }
  indexOf (elt) {
    if (!this.element) return -1;
    return Array.from(this.element.children).indexOf(elt);
  }
  isDescendant(parent, child) {
    let node = child;

    while( node ) {
      if (node == parent) return true;
      node = node.parentNode;
    }
  
    return false;
  }
}

class EventBufferInputEntry extends EventBufferEntry {
  constructor(event) {
    super();
  }
}

type StreamItem<StreamType> = {
  timestamp: number,
  data: StreamType
}

class Stream<DataType> {
  buffer: ICircularBuffer<StreamItem<DataType>>;
  constructor() {
    this.buffer = createBuffer<StreamItem<DataType>>();
  }
  flush(): DataType[] {
    let result: DataType[] = [];
    while (this.buffer.get().value !== null)
      result.push(this.buffer.value as DataType);
    return result;
  }
}

class WritableStream<DataType> extends Stream<DataType> {
  write(data: DataType, timestamp :number): DataType[] {
    const item: StreamItem<DataType> = { data, timestamp };
    if (this.buffer.put(item).value === null) {
      return this.flush();
    }
    return [data];
  }
}

class ReadableStream<DataType> extends Stream<DataType> {
  read() {
    // not implemented
  }
}

const selectionStream = new WritableStream<EventBufferSelectionEntry>()

class PowerInput extends HTMLElement {
  $el?: HTMLDivElement;
  $events: EventBus;
  constructor() {
    super();

    console.log('element created', this)
    this.$el = this.createInputElement();
    this.$events = eventEmitter;

    this.attachInputElement();
  }
  createInputElement(): HTMLDivElement {
    const el = document.createElement('div');

    el.setAttribute("contenteditable", "true" );
    el.setAttribute("tabIndex", "0" );

    return el;
  }
  onSelectionChanged(event) {
    selectionStream.write(EventBufferSelectionEntry.create(event), event.timestamp);
  }
  attachInputElement() {
    if (!this.$el) return;

    this.appendChild(this.$el);
    
    const selection = window.getSelection();
    const range = document.createRange();
    range.setStart(this.$el, 0);
    range.setEnd(this.$el, 0 );
    selection?.addRange(range);

    EventBufferEntry.prototype.element = this.$el;
    EventBufferEntry.prototype.selection = selection;

    document.addEventListener('selectionchange', this.onSelectionChanged.bind(this))

    this.$events.emit('element-attached', this.$el);
  }
}

customElements.define("power-input", PowerInput);