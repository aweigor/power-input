/**
 * Represents VirtualInput token
 * @param code -- keyboard code of letter
 * @param capitalized -- if letter is capitalized
 * @param next -- next Letter pointer
 * @param prev -- prev Letter pointer
 *
 */

export class Letter {
	code: number;
	capitalized: boolean = false;
	next: Letter | null = null;
	prev: Letter | null = null;
	constructor() {}
}
