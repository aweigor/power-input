export type TEventBusHandler = {
  id?: string;
  callback: (...args: any[]) => void;
}

export type TStreamItem<StreamType> = {
  timestamp: number,
  data: StreamType
}

export type TSelectionChangeEventParameters = {
  parentElement: HTMLElement
}

export type TSerializedSelectionObject = {
  focusOffset: any;
  anchorOffset: any;
  focusLine: any;
  anchorLine: any;
  lines: any;
  text?: string;
  focus?: boolean;
}

export type TKeyboardInputEvent = {
	selection: TSerializedSelectionObject,
	timestamp: number,
	code: string
}
