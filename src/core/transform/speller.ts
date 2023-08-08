/**
 * Transforms KeyboardInputEvent to Letter
 * @param event - KeyboardInputEvent
 *
 */

import { KeyboardInputEvent } from '../events/keyboard.input.event';
import { Letter } from '../vinput/letter.entity';

export class Speller extends TransformStream {
	eventEncoder: () => void;
	constructor() {
		super({
			start(controller) {
				console.log('starting..');
			},
			async transform(event: Awaited<KeyboardInputEvent>, controller) {
				event = await event;
				const letter = new Letter();
				letter.code = event.code;
				letter.capitalized = event.shift;
				controller.enqueue(letter);
			},
			flush() {},
		});
		this.eventEncoder = () => {};
	}
}
