import { KbinEvent } from './kbin.entity';

/**
 * keyboard input event dto
 * serializer for kbin event
 * 
 */

export class KbinEventDto {
	get originalEvent(): any {
		return this._event;
	}
	constructor(private readonly _event: any) {}
	serialize(): KbinEvent {
		const e = new KbinEvent()
		e.code = 0;
		e.selection = {};
		e.timestamp = 0;
		return e;
	}
}