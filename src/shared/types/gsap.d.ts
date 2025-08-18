declare module 'gsap' {
	// Minimal gsap types to satisfy TS in this project context
	export type TweenTarget = Element | Element[] | NodeList | string
	export interface GSAPStatic {
		to(target: TweenTarget, vars: Record<string, unknown>): unknown
		fromTo(target: TweenTarget, fromVars: Record<string, unknown>, toVars: Record<string, unknown>): unknown
		set(target: TweenTarget, vars: Record<string, unknown>): void
		timeline(opts?: Record<string, unknown>): unknown
		registerPlugin(...plugins: unknown[]): void
		killTweensOf(target?: TweenTarget): void
	}
	const gsap: GSAPStatic
	export default gsap
}


