import ANCII_codemap from './keyboards/ancii/codemap.json';
import ANCII_locales from './keyboards/ancii/locales.json';
import ANCII_arrowsmap from './keyboards/ancii/special.json';

export enum Locales {
	en = 'en',
	ru = 'ru',
}

export type TLocaleKeys = {
	default: (string | number)[];
	alt: (string | number)[];
	shift: (string | number)[];
};

export function defineType(charCode: number): string | undefined {
	const codemap: number[] = ANCII_codemap;
	if (codemap.includes(charCode)) return 'symbol';
	if (Object.keys(ANCII_arrowsmap).includes(charCode.toString())) return 'control';
}

export function decode(
	charCode: number,
	altKey: boolean = false,
	shiftKey: boolean = false,
	locale: Locales,
): string | number | undefined {
	let result: string | number | undefined = undefined;

	const keyCodes: TLocaleKeys | undefined = ANCII_locales[locale];
	const keyIndex = ANCII_codemap.indexOf(charCode);

	if (!keyCodes || isNaN(keyIndex)) return;

	if (altKey === false && shiftKey === false) {
		result = keyCodes['default'][keyIndex];
	} else if (altKey === true) {
		result = keyCodes['alt'][keyIndex];
	} else if (shiftKey === true) {
		result = keyCodes['shift'][keyIndex];
	}

	return result;
}
