/**
 * Carret is virtual class, that binds rear part of selection to its front part
 * Every symbol types in front of carret, so when typing symbol we actually insert a symbol between rear and front part of it.
 *
 */

export interface ICarret<Lt> {
	prevLine: Lt | null;
	prevOffset: number;
	nextLine: Lt | null;
	nextOffset: number;
}
