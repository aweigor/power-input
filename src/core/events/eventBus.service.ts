import {
  TEventBusHandler
} from '../../types';

export class EventBus {
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