import { IListElement } from './listElement.interface';

export class ListElement<Dt> implements IListElement<Dt> {
	data: Dt;
	next: IListElement<Dt> | null = null;
	prev: IListElement<Dt> | null = null;
	constructor(data: Dt) {
		this.data = data;
	}
}

export class DoublyLinkedList<Dt> {
	head: IListElement<Dt> | null = null;
	tail: IListElement<Dt> | null = null;
	constructor(data?: Dt) {
		if (data !== undefined) {
			this.init(data);
		}
	}
	init(data: Dt): IListElement<Dt> {
		const item = new ListElement(data);
		this.head = item;
		this.tail = item;
		return item;
	}
	get length(): number {
		let el = this.head;
		let result = 0;
		while (el !== null) {
			result += 1;
			el = el.next;
		}
		return result;
	}
	[Symbol.iterator](): Iterator<IListElement<Dt>, null> {
		let current = this.head;
		let value: IListElement<Dt> | null = null;
		return {
			next: (): IteratorResult<IListElement<Dt>, null> => {
				value = current;
				if (current !== null) {
					current = current.next;
				}
				if (value === null) {
					return { value: null, done: true };
				} else {
					return { value: value as IListElement<Dt>, done: false };
				}
			},
		};
	}
	insertAfter(data: Dt, index: number): IListElement<Dt> | null {
		if (!this.head && !this.tail && index === -1) return this.init(data);
		const item = new ListElement(data);
		const element: IListElement<Dt> | null = this.find(index);
		if (element === null) return null;
		if (element.next === null) {
			// element is tail
			this.tail = item;
		}
		item.next = element.next;
		item.prev = element;
		element.next = item;
		return item;
	}

	insertBefore(data: Dt, index: number): IListElement<Dt> | null {
		if (!this.head && !this.tail && index === 0) return this.init(data);
		const item = new ListElement(data);
		const element: IListElement<Dt> | null = this.find(index);
		if (element === null) return null;
		if (element.prev === null) {
			//element is head
			this.head = item;
		}
		item.next = element;
		item.prev = element.prev;
		element.prev = item;
		return item;
	}

	find(index: number): IListElement<Dt> | null {
		let i = 0,
			item: IListElement<Dt>,
			res: IListElement<Dt> | null = null;

		for (item of this) {
			if (i++ == index) {
				res = item;
				break;
			}
		}
		return res;
	}

	findIndex(element: IListElement<Dt>): number {
		let index = -1;
		for (const item of this) {
			++index;
			if (item === element) break;
		}
		return index;
	}

	remove(index: number): IListElement<Dt> | null {
		const element = this.find(index);
		if (element === null) return null;
		if (element.next) {
			element.next.prev = element.prev;
		}
		if (element.prev) {
			element.prev.next = element.next;
		}
		if (this.tail === element) {
			this.tail = null;
		}
		if (this.head === element) {
			this.head = null;
		}
		element.next = null;
		element.prev = null;
		return element;
	}
}
