export interface IListElement {
	next: IListElement | null;
	prev: IListElement | null;
	data: unknown;
}
