import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Separator.module.css';

/** Separator styles, matching the Figma `Style` variant. */
export const SEPARATOR_STYLES = [ 'default', 'subtle', 'accent' ] as const;

export type SeparatorStyle = ( typeof SEPARATOR_STYLES )[ number ];

/**
 * Separator types, matching the Figma `Type` variant.
 *
 * Figma also has `Button` and `Icon Button`, which differ from `Default` only
 * in what sits in the middle slot — pass a `Button` as `children` for those.
 */
export const SEPARATOR_TYPES = [
	'default',
	'label-center',
	'label-left',
	'filled',
] as const;

export type SeparatorType = ( typeof SEPARATOR_TYPES )[ number ];

export interface SeparatorProps extends Omit<
	HTMLAttributes< HTMLDivElement >,
	'style' | 'children'
> {
	/** Rule and label colour. Maps to the Figma `Style` variant. */
	appearance?: SeparatorStyle;
	/** Maps to the Figma `Type` variant. */
	type?: SeparatorType;
	/**
	 * Middle content. Rendered as label text when `type` is a label variant,
	 * inside the bar when `type="filled"`, and as an unstyled slot otherwise —
	 * which is how you get Figma's `Button` and `Icon Button` types.
	 */
	children?: ReactNode;
}

/**
 * A visual separator for dividing sections of content or layout.
 * AKA Divider, Rule.
 *
 * Figma: Base Design System — `Separator` (`2101:37609`).
 *
 * Renders a native `<hr>` when there is no middle content, and a
 * `role="separator"` element when there is — an `<hr>` cannot legally contain
 * children.
 *
 * @example
 * <Separator />
 * <Separator type="label-center">Or</Separator>
 * <Separator type="label-left">Section</Separator>
 * <Separator><Button size="sm">Load more</Button></Separator>
 * <Separator type="filled">Archived</Separator>
 */
export function Separator( {
	appearance = 'default',
	type = 'default',
	children,
	className,
	...rest
}: SeparatorProps ) {
	const appearanceClass = styles[ appearance ];

	if ( type === 'filled' ) {
		return (
			<div
				{ ...rest }
				role="separator"
				className={ clsx( styles.filled, appearanceClass, className ) }
			>
				{ children }
			</div>
		);
	}

	// No middle content — a plain rule, which is exactly what <hr> means.
	if ( children === undefined || children === null || children === false ) {
		return (
			<hr
				{ ...rest }
				className={ clsx(
					styles.separator,
					styles.line,
					appearanceClass,
					className
				) }
			/>
		);
	}

	const isLabelCenter = type === 'label-center';
	const isLabelLeft = type === 'label-left';

	return (
		<div
			{ ...rest }
			role="separator"
			className={ clsx( styles.separator, appearanceClass, className ) }
		>
			{ isLabelLeft ? null : <span className={ styles.line } /> }
			<span
				className={
					isLabelCenter || isLabelLeft ? styles.label : styles.slot
				}
			>
				{ children }
			</span>
			<span className={ styles.line } />
		</div>
	);
}
