export interface IEventStream {
	push: (event: any) => IEventStream;
}