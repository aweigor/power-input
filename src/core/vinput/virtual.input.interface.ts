/**
 * Virtual element represents html input element's value (text), its carret,
 * in a form that later can be translated to real text.
 * In the implementation class represents text as array of tokens (letters),
 * that linked together in lists (lines), that linked together in paragraphs.
 * Carret is an element(class), that contains link to previous and next element of text
 * Virtaul element listens itself, or provide sync method in order to be synchronized with its original element
 *
 *
 * @param data - Array of tokens
 * @param lines - Array of lines
 * @param paragraphs = Array of paragraphs
 * @param carret - Carret
 *
 * @method text()  - compile text value
 * @method insert(@param letter) - insert new token at carret position
 * @method remove() - removes token at carret position
 */

import { TInputState } from '../../types';
import { Letter } from '../transform/letter.entity';

export interface IVirtualInput {
	data: Letter[];
	lines: unknown[];
	paragraphs: unknown[];
	carret: unknown;
	text: string;
	insert: (letter: Letter) => void;
	remove: () => void;
	syncState: (state: TInputState) => IVirtualInput;
	bindElement: (element: HTMLElement) => void;
}
