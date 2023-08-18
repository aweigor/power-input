/**
 * Transforms KeyboardInputEvent to Letter
 * @param event - KeyboardInputEvent
 *
 */

import { TKeyboardInputEvent } from '../../types';
import { KeyboardInputEvent } from '../events/keyboard.input.event';
import { defineType } from '../format/charcode/decode';
import { Letter } from '../vinput/letter.entity';

export class Speller extends TransformStream {
	eventEncoder: () => void;
	constructor() {
		super({
			start(controller) {
				console.log('starting..');
			},
			async transform(event: Awaited<TKeyboardInputEvent>, controller) {
				event = await event;
				const letter = new Letter();
				letter.code = event.code;
				letter.shift = event.shift;
				letter.alt = event.alt;
				letter.type = defineType(event.code);
				controller.enqueue(letter);
			},
			flush() {},
		});
		this.eventEncoder = () => {};
	}
}
