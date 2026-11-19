import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './HintText.module.css';

/** Sizes, matching the Figma `Size` variant. */
export const HINT_TEXT_SIZES = [ 'sm', 'md' ] as const;

export type HintTextSize = ( typeof HINT_TEXT_SIZES )[ number ];

export interface HintTextProps extends HTMLAttributes< HTMLSpanElement > {
	children: ReactNode;
	/** Maps to the Figma `Size` variant. */
	size?: HintTextSize;
}

/**
 * Supporting text displayed below an input to aid completion.
 * AKA Helper text, Caption, Supporting text.
 *
 * Figma: Base Design System — `Hint text` (`3183:170980`).
 *
 * Give it an `id` and point the control's `aria-describedby` at it, so the hint
 * is announced with the field rather than being visual-only.
 *
 * @example
 * <HintText id="pw-hint">Must be at least 12 characters.</HintText>
 * <input aria-describedby="pw-hint" />
 */
export function HintText( {
	children,
	size = 'md',
	className,
	...rest
}: HintTextProps ) {
	return (
		<span
			{ ...rest }
			className={ clsx( styles.hint, styles[ size ], className ) }
		>
			{ children }
		</span>
	);
}
