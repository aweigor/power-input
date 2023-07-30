import { 
  TSerializedSelectionObject
} from '../../types';

export class KeyboardInputEvent {
	get value() {
		return {
			timestamp: this._originalEvent.timeStamp
		}
	}
	constructor(
		private readonly _selection: TSerializedSelectionObject, 
		private readonly _originalEvent: KeyboardEvent
	) {}
}