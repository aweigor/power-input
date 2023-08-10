/**
 * Transformer for VirtualInput
 * Gets Letter from stream
 * Applies Letter to the class
 * Writes Input's result value to stream
 */

import { Letter } from '../vinput/letter.entity';
import { IVirtualInput } from '../vinput/virtual-input.interface';

export class Typographer extends TransformStream {
	eventEncoder: () => void;
	constructor(_vInput: IVirtualInput) {
		super({
			start(controller): void {},
			async transform(event: Awaited<Letter>, controller): Promise<void> {
				const letter = await event;
				if (!(letter instanceof Letter)) return;
				_vInput.insert(letter);
				controller.enqueue({
					value: _vInput.text,
					carret: 0,
				});
			},
			flush(): void {},
		});
	}
}
