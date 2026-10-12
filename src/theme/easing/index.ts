// Property Documentation
// ------------

// NOTE • This file exports the easing object, the easing object is used to store all the easing values for the application.

// REVIEW — Usage: transition-timing-function: var(--easing-bezzy3);

// Imports
// ------------
import { toVarRefs } from '@theme/cssVariables';

// SECTION • Raw Easing Values
// NOTE • Emitted as --easing-{key} on :root in the generated src/css/tokens.css.
// Pure curves only — durations live in @theme/time (--time-{key})
export const easingValues = {
	bezzy: 'cubic-bezier(0.8, 0, 0, 1)',
	bezzy2: 'cubic-bezier(0.430, 0.195, 0.020, 1)',
	bezzy3: 'cubic-bezier(0.5, 0, 0, 1)',
	// NOTE • The iOS app's Motion.spring (response 0.45, damping 0.82) sampled
	// as a CSS curve — pair it with --time-spring so web and app feel the same
	spring: 'linear(0, 0.036, 0.121, 0.232, 0.352, 0.47, 0.578, 0.673, 0.754, 0.82, 0.874, 0.915, 0.947, 0.97, 0.986, 0.997, 1.004, 1.009, 1.011, 1.011, 1.011, 1.01, 1.009, 1.007, 1.006, 1.005, 1.004, 1.003, 1.002, 1.001, 1)',
};

// Exports
// ------------
export const easing = toVarRefs('easing', easingValues);
