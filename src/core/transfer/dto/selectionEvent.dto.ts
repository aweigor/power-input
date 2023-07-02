import { 
  TSelectionChangeEventParameters,
  TSelectionEventObject
} from '../../../types';

export class SelectionEventDto {
  element?: HTMLElement;
  paragraphs?: string[];
  focusOffset: TSelectionEventObject['focusOffset'];
  anchorOffset: TSelectionEventObject['anchorOffset'];
  focusLine: TSelectionEventObject['focusLine'];
  anchorLine: TSelectionEventObject['anchorLine'];
  lines: TSelectionEventObject['lines'];
  text?: TSelectionEventObject['text'];
  focus?: TSelectionEventObject['focus'];

  constructor({ element, selection }: { element: HTMLElement, selection: Selection }) {
    this.element = element;
    this.paragraphs = element.innerText.split('\n\n');
    this.focusOffset = selection.focusOffset
    this.anchorOffset = selection.anchorOffset
    this.focusLine = this.getFocusLine(selection)
    this.anchorLine = this.getAnchorLine(selection)
    this.lines = this.paragraphs.reduce((acc, el) => el.split('\n').length + acc, 0);
    this.text = element.innerText;
    this.focus = this.isDescendant(element, selection.focusNode);
  }
  
  get value(): TSelectionEventObject {
    return {
      focusOffset: this.focusOffset,
      anchorOffset: this.anchorOffset,
      focusLine: this.focusLine,
      anchorLine: this.anchorLine,
      lines: this.lines,
      text: this.text,
      focus: this.focus
    }
  }

  static getDto(event: CustomEvent<TSelectionChangeEventParameters>, element: HTMLElement, selection: Selection):TSelectionEventObject  {
    console.log('create dto', event);
    const instance = new SelectionEventDto({ element, selection });
    return instance.value;
  }

  getFocusLine (selection: Selection) {
    let index = this.indexOf(selection.focusNode?.parentElement) !== -1 
      ? this.indexOf(selection.focusNode?.parentElement) 
      : this.indexOf(selection.focusNode);
    return index + 1;
  }

  getAnchorLine (selection) {
    let index = this.indexOf(selection.anchorNode.parentElement) !== -1 
      ? this.indexOf(selection.anchorNode.parentElement) 
      : this.indexOf(selection.anchorNode);
    return index + 1;
  }

  indexOf (elt) {
    if (!this.element) return -1;
    return Array.from(this.element.children).indexOf(elt);
  }

  isDescendant(parent, child) {
    let node = child;

    while( node ) {
      if (node == parent) return true;
      node = node.parentNode;
    }
  
    return false;
  }
}