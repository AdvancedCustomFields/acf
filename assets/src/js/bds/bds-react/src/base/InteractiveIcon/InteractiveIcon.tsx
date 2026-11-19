import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import styles from './InteractiveIcon.module.css';

/** Visual style, matching the Figma `Type` variant. */
export const INTERACTIVE_ICON_TYPES = [ 'secondary', 'accent' ] as const;

export type InteractiveIconType = ( typeof INTERACTIVE_ICON_TYPES )[ number ];

/** Control size, matching the Figma `Size` variant. */
export const INTERACTIVE_ICON_SIZES = [ 'sm', 'md', 'lg' ] as const;

export type InteractiveIconSize = ( typeof INTERACTIVE_ICON_SIZES )[ number ];

export interface InteractiveIconProps extends Omit<
	ButtonHTMLAttributes< HTMLButtonElement >,
	'type' | 'children' | 'aria-label'
> {
	/** The icon. Maps to the Figma `Icon` instance-swap property. */
	icon: ReactNode;
	/** Accessible name for the control. Required — the icon is decorative. */
	label: string;
	/** Visual style. Maps to the Figma `Type` variant. */
	variant?: InteractiveIconType;
	/** Control size. Maps to the Figma `Size` variant. */
	size?: InteractiveIconSize;
	/**
	 * Swaps the icon for a spinner and blocks interaction.
	 *
	 * Not a Figma state — `Interactive icon` has none. It is here because the
	 * alternative was worse: a slot Figma fills with an `Interactive icon`,
	 * whose action happens to be a network round trip, was taking an
	 * `IconButton` purely to borrow its spinner, and arrived at the wrong size
	 * and the wrong weight for the design. Mirrors
	 * {@link IconButtonProps.loading} exactly.
	 */
	loading?: boolean;
	/**
	 * Accessible name while `loading`. Defaults to `label`.
	 */
	loadingAriaLabel?: string;
	nativeType?: ButtonHTMLAttributes< HTMLButtonElement >[ 'type' ];
}

/**
 * A standalone icon that responds to interaction without the visual weight of a
 * button. Available in two styles and three sizes with hover, focus, and
 * disabled states.
 *
 * Figma: Base Design System — `Interactive icon` (`5705:1415`).
 *
 * @example
 * <InteractiveIcon icon={ <Plus /> } label="Add item" />
 */
export const InteractiveIcon = forwardRef<
	HTMLButtonElement,
	InteractiveIconProps
>( function InteractiveIcon(
	{
		icon,
		label,
		variant = 'secondary',
		size = 'md',
		loading = false,
		loadingAriaLabel,
		nativeType = 'button',
		className,
		disabled,
		onClick,
		...rest
	},
	ref
) {
	const resolvedAriaLabel =
		loading && loadingAriaLabel != null && loadingAriaLabel !== ''
			? loadingAriaLabel
			: label;

	return (
		<button
			{ ...rest }
			ref={ ref }
			type={ nativeType }
			// `loading` disables as well as spins, so the click never lands.
			disabled={ Boolean( disabled || loading ) }
			onClick={ onClick }
			aria-label={ resolvedAriaLabel }
			className={ clsx(
				styles.button,
				styles[ size ],
				variant === 'accent' && styles.accent,
				loading && styles.loading,
				className
			) }
			{ ...( loading ? { 'aria-busy': true } : {} ) }
		>
			{ loading ? (
				<span
					className={ clsx( styles.icon, styles.spinner ) }
					aria-hidden="true"
				>
					<LoaderCircle />
				</span>
			) : null }
			<span
				className={ clsx( styles.icon, loading && styles.iconHidden ) }
				aria-hidden="true"
			>
				{ icon }
			</span>
		</button>
	);
} );
