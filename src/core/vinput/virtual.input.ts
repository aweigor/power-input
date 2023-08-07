import { Letter } from '../transform/letter.entity';
import { IVirtualInput } from './virtual.input.interface';

export class VirtualInput implements IVirtualInput {
	data: Letter[];
	lines: unknown[] = [];
	paragraphs: unknown[] = [];
	carret: unknown;
	get text(): string {
		return '';
	}
	insert(letter: Letter): void {}
	remove(): void {}
	constructor(value: string = '') {}
}
