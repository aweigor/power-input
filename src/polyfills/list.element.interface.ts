export interface IListElement<DataType> {
	data: DataType;
	next: IListElement<DataType> | null;
	prev: IListElement<DataType> | null;
}
