import ANCII_codemap from './keyboards/ancii/codemap.json';
import ANCII_locales from './keyboards/ancii/locales.json';
import ANCII_arrowsmap from './keyboards/ancii/special.json';
import { LetterTypes } from '../../../types';

export enum Locales {
	en = 'en',
	ru = 'ru',
}

export type TLocaleKeys = {
	default: (string | number)[];
	alt: (string | number)[];
	shift: (string | number)[];
};

export function defineType(charCode: number): LetterTypes {
	const codemap: number[] = ANCII_codemap;
	if (codemap.includes(charCode)) return LetterTypes.SYMB;
	if (Object.keys(ANCII_arrowsmap).includes(charCode.toString())) return LetterTypes.CTRL;
	return LetterTypes.UNKNOWN;
}

const specialKeys = {
	space: ' ',
	enter: '\n',
};

export function decode(
	charCode: number,
	type: number,
	altKey: boolean = false,
	shiftKey: boolean = false,
	locale: Locales = Locales.en,
): string | number | undefined {
	let result: string | number | undefined = undefined;

	if (type === LetterTypes.CTRL) {
		result = specialKeys[ANCII_arrowsmap[charCode]];
	} else if (type === LetterTypes.SYMB) {
		const localeKeys: TLocaleKeys | undefined = ANCII_locales[locale];
		const keyIndex = ANCII_codemap.indexOf(charCode);

		if (!localeKeys || isNaN(keyIndex)) return;

		if (altKey === false && shiftKey === false) {
			result = localeKeys['default'][keyIndex];
		} else if (altKey === true) {
			result = localeKeys['alt'][keyIndex];
		} else if (shiftKey === true) {
			result = localeKeys['shift'][keyIndex];
		}
	}

	return result;
}
