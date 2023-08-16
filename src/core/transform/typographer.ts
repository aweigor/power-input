/**
 * Transformer for VirtualInput
 * Gets Letter from stream
 * Applies Letter to the class
 * Writes Input's result value to stream
 */

import { Letter } from '../vinput/letter.entity';
import { VirtualInput } from '../vinput/virtual-input';
import { IVirtualInput } from '../vinput/virtual-input.interface';

export class Typographer extends TransformStream {
	eventEncoder: () => void;
	constructor(_vInput: VirtualInput) {
		super({
			start(controller): void {},
			async transform(event: Awaited<Letter>, controller): Promise<void> {
				const letter = await event;
				if (!(letter instanceof Letter)) return;
				_vInput.insert(letter);
				let caretPos = -1;
				if (_vInput.caret.prev) {
					caretPos = _vInput.paragraph.findIndex(_vInput.caret.prev);
				}
				controller.enqueue({
					text: _vInput.text,
					caret: caretPos,
				});
			},
			flush(): void {},
		});
	}
}
