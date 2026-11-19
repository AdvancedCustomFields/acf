import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Badge.module.css';

/** Sizes, matching the Figma `Size` variant. */
export const BADGE_SIZES = [ 'sm', 'md' ] as const;

export type BadgeSize = ( typeof BADGE_SIZES )[ number ];

/** Colour treatments, matching the Figma `Color` variant. */
export const BADGE_COLORS = [
	'gray',
	'blue',
	'green',
	'orange',
	'red',
	'transparent',
] as const;

export type BadgeColor = ( typeof BADGE_COLORS )[ number ];

/** Corner treatments, matching the Figma `Radius` variant. */
export const BADGE_RADII = [ 'rounded', 'pill' ] as const;

export type BadgeRadius = ( typeof BADGE_RADII )[ number ];

// `string | undefined` because CSS-module lookups are indexed accesses and the
// project runs with noUncheckedIndexedAccess. clsx drops undefined anyway.
const SIZE_CLASS: Record< BadgeSize, string | undefined > = {
	sm: styles.sizeSm,
	md: styles.sizeMd,
};

const COLOR_CLASS: Record< BadgeColor, string | undefined > = {
	gray: styles.colorGray,
	blue: styles.colorBlue,
	green: styles.colorGreen,
	orange: styles.colorOrange,
	red: styles.colorRed,
	transparent: styles.colorTransparent,
};

export interface BadgeProps extends HTMLAttributes< HTMLSpanElement > {
	/** Maps to the Figma `Size` variant. */
	size?: BadgeSize;
	/** Maps to the Figma `Color` variant. */
	color?: BadgeColor;
	/** Maps to the Figma `Radius` variant. */
	radius?: BadgeRadius;
	/**
	 * Draw the border. Maps to the Figma `Stroke` variant. Ignored for
	 * `transparent` — that colour always keeps its border in Figma.
	 */
	stroke?: boolean;
	/**
	 * `StatusIndicator` rendered before everything else. Maps to the Figma
	 * `Status leading`.
	 *
	 * The badge's label should say what the tone means, so leave the
	 * indicator's own `label` off.
	 *
	 * @since 0.3.0
	 */
	statusLeading?: ReactNode;
	/** Icon rendered before the label. Maps to the Figma `Icon Leading`. */
	iconLeading?: ReactNode;
	/** Icon rendered after the label. Maps to the Figma `Icon trailing`. */
	iconTrailing?: ReactNode;
	/** Avatar rendered before the label. Maps to the Figma `Avatar Leading`. */
	avatar?: ReactNode;
	/** The badge's label. Maps to the Figma `Label` text property. */
	children?: ReactNode;
}

/**
 * A small label used to indicate status, categorize content, or highlight
 * counts. AKA Chip, Pill.
 *
 * Figma: Base Design System — `Badge` (`525:4768`).
 *
 * A badge is presentational. If it needs to be clicked or dismissed, reach for
 * `Tag` instead.
 *
 * @example
 * <Badge color="green" iconLeading={ <Check /> }>Published</Badge>
 * <Badge color="transparent" radius="pill" size="sm">Draft</Badge>
 * <Badge color="green" statusLeading={ <StatusIndicator status="positive" /> }>
 *   Online
 * </Badge>
 */
export function Badge( {
	size = 'md',
	color = 'gray',
	radius = 'rounded',
	stroke = true,
	statusLeading,
	iconLeading,
	iconTrailing,
	avatar,
	children,
	className,
	...rest
}: BadgeProps ) {
	const showStroke = stroke || color === 'transparent';

	return (
		<span
			{ ...rest }
			className={ clsx(
				styles.badge,
				SIZE_CLASS[ size ],
				COLOR_CLASS[ color ],
				radius === 'pill' && styles.radiusPill,
				showStroke && styles.stroke,
				className
			) }
		>
			{ statusLeading ? (
				<span className={ styles.statusLeading }>
					{ statusLeading }
				</span>
			) : null }
			{ avatar ? (
				<span className={ styles.avatar }>{ avatar }</span>
			) : null }
			{ iconLeading ? (
				<span className={ styles.icon } aria-hidden="true">
					{ iconLeading }
				</span>
			) : null }
			<span className={ styles.label }>{ children }</span>
			{ iconTrailing ? (
				<span className={ styles.icon } aria-hidden="true">
					{ iconTrailing }
				</span>
			) : null }
		</span>
	);
}
