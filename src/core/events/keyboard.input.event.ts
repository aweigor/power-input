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

export function createKeyboardInputEvent(_originalEvent: KeyboardEvent): TKeyboardInputEvent {
	return {
		timestamp: _originalEvent.timeStamp,
		code: _originalEvent.charCode,
	};
}

export class KeyboardInputEvent {
	timestamp: number;
	code: number;
	shift: boolean;
	get value(): TKeyboardInputEvent {
		return {
			timestamp: this._originalEvent.timeStamp,
			code: this._originalEvent.charCode,
		};
	}
	constructor(private readonly _originalEvent: KeyboardEvent) {
		this.timestamp = _originalEvent.timeStamp;
		this.shift = _originalEvent.shiftKey;
		this.code = this._originalEvent.charCode; // deprecated
	}
}
