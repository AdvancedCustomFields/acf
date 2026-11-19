import clsx from 'clsx';
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';

import { useRouterLink } from '../router/RouterProvider';
import styles from './Link.module.css';

/**
 * Link sizes, matching the Figma `Size` variant.
 */
export const LINK_SIZES = [ 'sm', 'md', 'lg' ] as const;

export type LinkSize = ( typeof LINK_SIZES )[ number ];

export interface LinkProps extends AnchorHTMLAttributes< HTMLAnchorElement > {
	/** The link text. Maps to the Figma `Label` text property. */
	children: ReactNode;
	/** Text size. Maps to the Figma `Size` variant. */
	size?: LinkSize;
	/** Icon rendered before the label. Maps to the Figma `Icon leading` slot. */
	iconLeading?: ReactNode;
	/** Icon rendered after the label. Maps to the Figma `Icon trailing` slot. */
	iconTrailing?: ReactNode;
	/**
	 * Renders the Figma `Disabled` state. An anchor has no native disabled
	 * attribute, so the href is dropped and the link is removed from the tab
	 * order and marked `aria-disabled`.
	 */
	disabled?: boolean;
}

/**
 * An inline text element for navigation between pages or sections.
 *
 * Figma: Base Design System — `Link` (`2098:26412`).
 *
 * Always a real `<a>`: navigation is the whole point of the component, and the
 * Figma set has no non-navigational variant, so there is no `as` or `asChild`
 * escape hatch. For an action that is not navigation, use `Button` with
 * `variant="ghost"`. For navigation that should look like a button — a
 * prominent call to action — use `<Button href>`, which renders an `<a>` with
 * button styling.
 *
 * Inside a `RouterProvider`, a plain same-origin click navigates client-side;
 * modified clicks, `target` and `download` behave as normal links.
 *
 * The Figma component models Hover, Focus and Disabled as variants; here Hover
 * and Focus are CSS states and Disabled is a prop, because an anchor cannot be
 * natively disabled.
 *
 * @example
 * <Link href="/settings" iconTrailing={ <ArrowRight /> }>Open settings</Link>
 */
export const Link = forwardRef< HTMLAnchorElement, LinkProps >( function Link(
	{
		children,
		size = 'md',
		iconLeading,
		iconTrailing,
		disabled = false,
		href,
		className,
		onClick,
		...rest
	},
	ref
) {
	const router = useRouterLink( disabled ? undefined : href, onClick );
	const linkable = ! disabled && href !== undefined;
	// A disabled or href-less Link passes the caller's onClick straight
	// through, as it always has; only a real link goes through the router.
	const behaviour = linkable
		? { href: router.href ?? href, onClick: router.onClick }
		: {
				...( onClick ? { onClick } : {} ),
				...( disabled
					? { 'aria-disabled': true as const, tabIndex: -1 }
					: {} ),
			};

	return (
		<a
			{ ...rest }
			{ ...behaviour }
			ref={ ref }
			className={ clsx(
				styles.link,
				styles[ size ],
				disabled && styles.disabled,
				className
			) }
		>
			{ iconLeading ? (
				<span className={ styles.icon } aria-hidden="true">
					{ iconLeading }
				</span>
			) : null }
			{ children }
			{ iconTrailing ? (
				<span className={ styles.icon } aria-hidden="true">
					{ iconTrailing }
				</span>
			) : null }
		</a>
	);
} );
