/**
 * keyboard input event dto
 * serializer for kbin event
 * 
 */

export class kbinEventDto {
	selection: any = {};
	timestamp: number = 0;
	code: number = 0;
	construcor() {}
	decode(number) {
		return {
			selection: {},
			timestamp: 0,
			code: 0
		}
	}
	serialize(): number {
		return 1;
	}
}