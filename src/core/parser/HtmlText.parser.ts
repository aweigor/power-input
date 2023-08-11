export class HtmlTextParser {
	static parse(element: HTMLElement): string {
		return element.innerText;
	}
	static parseBetween(element: HTMLElement, from: HTMLElement, to: HTMLElement): string | null {
		return null;
	}
}
