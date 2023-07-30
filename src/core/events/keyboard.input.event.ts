import { 
  TSerializedSelectionObject,
	TKeyboardInputEvent
} from '../../types';

/**
 * Keyboard input event
 * In order to provide ability to transform (decode) keyboard events to input state,
 * the event must contain:
 * 1. Information about selection: 
 * 	- current position of carret in focused element, basically
 * 	- selection range of text
 * 2. Code of original KeyboardEvent
 * 3. Information about control keys pressed
 * 4. Time, when event was fired
 * 
*/

export function createKeyboardInputEvent(
	_selection: TSerializedSelectionObject, 
	_originalEvent: KeyboardEvent
): TKeyboardInputEvent {
	return {
		selection: JSON.parse(JSON.stringify(_selection)), // make copy?
		timestamp: _originalEvent.timeStamp,
		code: _originalEvent.code,
	}
}

export class KeyboardInputEvent {
	get value(): TKeyboardInputEvent {
		return {
			selection: JSON.parse(JSON.stringify(this._selection)), // make copy?
			timestamp: this._originalEvent.timeStamp,
			code: this._originalEvent.code,
		}
	}
	constructor(
		private readonly _selection: TSerializedSelectionObject, 
		private readonly _originalEvent: KeyboardEvent
	) {}
}