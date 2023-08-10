import { IListElement } from './list.element.interface';

export class ListElement<DT> implements IListElement<DT> {
	data: DT;
	next: IListElement<DT> | null = null;
	prev: IListElement<DT> | null = null;
}

export class DoublyLinkedList<DT> {
	head: IListElement<DT> | null = null;
	tail: IListElement<DT> | null = null;
	constructor(element?: IListElement<DT>) {
		if (element !== undefined) {
			this.init(element);
		}
	}
	init(element: IListElement<DT>): void {
		this.head = element;
		this.tail = element;
	}
	[Symbol.iterator](): Iterator<IListElement<DT>, null> {
		let current = this.head;
		let value: IListElement<DT> | null = null;
		return {
			next: (): IteratorResult<IListElement<DT>, null> => {
				value = current;
				if (current !== null) {
					current = current.next;
				}
				if (value === null) {
					return { value: null, done: true };
				} else {
					return { value: value as IListElement<DT>, done: false };
				}
			},
		};
	}
	insertAfter(item: IListElement<DT>, index: number): IListElement<DT> | null {
		const element: IListElement<DT> | null = this.find(index);
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

	insertBefore(item: IListElement<DT>, index: number): IListElement<DT> | null {
		const element: IListElement<DT> | null = this.find(index);
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

	find(index: number): IListElement<DT> | null {
		let i = 0,
			item: IListElement<DT>,
			res: IListElement<DT> | null = null;

		for (item of this) {
			if (i++ == index) {
				res = item;
				break;
			}
		}
		return res;
	}

	remove(index: number): IListElement<DT> | null {
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
		return element;
	}
}
