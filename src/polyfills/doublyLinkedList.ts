import { IListElement } from './list.element.interface';

export class DoublyLinkedList {
	head: IListElement | null = null;
	tail: IListElement | null = null;
	constructor(element?: IListElement) {
		if (element !== undefined) {
			this.init(element);
		}
	}
	init(element: IListElement): void {
		this.head = element;
		this.tail = element;
	}
	[Symbol.iterator](): Iterator<IListElement, null> {
		let current = this.head;
		let value: IListElement | null = null;
		return {
			next: (): IteratorResult<IListElement, null> => {
				value = current;
				if (current !== null) {
					current = current.next;
				}
				if (value === null) {
					return { value: null, done: true };
				} else {
					return { value: value as IListElement, done: false };
				}
			},
		};
	}
	insertAfter(item: IListElement, index: number): IListElement | null {
		const element: IListElement | null = this.find(index);
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

	insertBefore(item: IListElement, index: number): IListElement | null {
		const element: IListElement | null = this.find(index);
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

	find(index: number): IListElement | null {
		let i = 0,
			item: IListElement,
			res: IListElement | null = null;

		for (item of this) {
			if (i++ == index) {
				res = item;
				break;
			}
		}
		return res;
	}

	remove(index: number): IListElement | null {
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
