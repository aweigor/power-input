export interface ICircularBuffer<ItemType> {
	get: () => ICircularBuffer<ItemType>;
	put: (item: ItemType) => ICircularBuffer<ItemType>;
	value: ItemType | null;
}
