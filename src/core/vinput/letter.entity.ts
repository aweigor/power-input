/**
 * VirtualInput token
 * @param code -- keyboard code of letter
 * @param capitalized -- if letter is capitalized
 * @param next -- next Letter pointer
 * @param prev -- prev Letter pointer
 * @param type -- type of letter (contr)
 *
 */

import { LetterTypes } from '../../types';

export class Letter {
	code: number;
	shift: boolean = false;
	alt: boolean = false;
	next: Letter | null = null;
	prev: Letter | null = null;
	type: LetterTypes;
	constructor() {}
}
