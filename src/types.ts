export type TEventBusHandler = {
	id?: string;
	callback: (...args: any[]) => void;
};

export type TStreamItem<StreamType> = {
	timestamp: number;
	data: StreamType;
};

export type TSelectionChangeEventParameters = {
	parentElement: HTMLElement;
};

export type TSelectionState = {
	focusOffset: any;
	anchorOffset: any;
	focusLine: any;
	anchorLine: any;
	lines: any;
	text?: string;
	focus?: boolean;
};

export type TKeyboardInputEvent = {
	timestamp: number;
	code: number;
};

export type TInputState = {
	value?: string;
	selection?: TSelectionState;
};
