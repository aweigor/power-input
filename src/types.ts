export type TEventBusHandler = {
	id?: string;
	callback: (...args: unknown[]) => void;
};

export type TStreamItem<StreamType> = {
	timestamp: number;
	data: StreamType;
};

export type TSelectionChangeEventParameters = {
	parentElement: HTMLElement;
};

export type TSelectionState = {
	leftOffset: number;
	rightOffset: number;
	nodeText: string;
	selectionType: string;
};

export type TKeyboardInputEvent = {
	timestamp: number;
	code: number;
	shift: boolean;
	alt: boolean;
};

export type TInputState = {
	value?: string;
	selection?: TSelectionState;
};

export type TRange = { from: number; to: number };

export enum LetterTypes {
	SYMB,
	CTRL,
	UNKNOWN,
}

/*

"38":"top",
"39":"right",
"40":"bottom",
"37":"left",
"13":"enter",
"8":"backspace",
"17":"escape",
"36":"home",
"35":"end",
"33":"pageup",
"34":"pagedown",
"32":"space",
"46":"delete",
"9":"tab",
"20":"capslock"

*/

export enum CommandTypes {
	BACKSPACE = 8,
	SPACE = 32,
	ENTER = 13,
	LEFT = 37,
	RIGHT = 39,
	TOP = 38,
	BOTTOM = 40,
}
