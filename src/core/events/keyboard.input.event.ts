import { TKeyboardInputEvent } from '../../types';

/**
 * Keyboard input event
 * In order to provide ability to transform (decode) keyboard events to input state,
 * the event must contain:
 * 1. Code of original KeyboardEvent
 * 2. Information about control keys pressed
 * 3. Timestamp of event was fired
 *
 */

export class KeyboardInputEvent {
	get value(): TKeyboardInputEvent {
		return {
			timestamp: this._originalEvent.timeStamp,
			code: this._originalEvent.keyCode,
			shift: this._originalEvent.shiftKey,
			alt: this._originalEvent.altKey,
		};
	}
	constructor(private readonly _originalEvent: KeyboardEvent) {}
}
