/**
 * Transforms KeyboardInputEvent to Letter
 * @param event - KeyboardInputEvent
 * 
*/

import { KeyboardInputEvent } from '../events/keyboard.input.event';
import { Letter } from './letter.entity';

export class Speller extends TransformStream {
  eventEncoder: () => void;
  constructor() {
    super({
      start(controller) {
				console.log('starting..')
			},
			async transform(event: Awaited<KeyboardInputEvent>, controller) {
        event = await event;
        const code = event.code;
        const capitalized = event.shift;
        const letter = new Letter(code, capitalized, null, null);
				controller.enqueue(letter);
			},
			flush() {},
    });
    this.eventEncoder = () => {};
  }
}