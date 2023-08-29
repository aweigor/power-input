/**
 * Transformer for VirtualInput
 * Gets Letter from stream
 * Applies Letter to the class
 * Writes Input's result value to stream
 */

import { LetterTypes } from '../../types';
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
				console.log('letter', letter);
				if (!(letter instanceof Letter)) return;
				if (letter.type === LetterTypes.SYMB) {
					_vInput.insertSymbol(letter);
					controller.enqueue({
						text: _vInput.text,
						caret: _vInput.paragraph.caretPosition,
					});
				} else if (letter.type === LetterTypes.CTRL) {
					_vInput.runCommand(letter);
					controller.enqueue({
						text: _vInput.text,
						caret: _vInput.paragraph.caretPosition,
					});
				}
			},
			flush(): void {},
		});
	}
}
