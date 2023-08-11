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
