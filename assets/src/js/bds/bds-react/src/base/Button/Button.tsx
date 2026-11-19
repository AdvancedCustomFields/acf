import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';
import {
	forwardRef,
	type AnchorHTMLAttributes,
	type ButtonHTMLAttributes,
	type ForwardedRef,
	type MouseEvent,
	type ReactElement,
	type ReactNode,
	type RefAttributes,
} from 'react';

import { linkRel, useRouterLink } from '../router/RouterProvider';
import styles from './Button.module.css';

/**
 * Button hierarchy levels, matching the Figma `Type` variant.
 */
export const BUTTON_TYPES = [
	'primary',
	'secondary',
	'outline',
	'ghost',
	'negative',
] as const;

export type ButtonType = ( typeof BUTTON_TYPES )[ number ];

/**
 * Button sizes, matching the Figma `Size` variant.
 */
export const BUTTON_SIZES = [ 'xs', 'sm', 'md', 'lg' ] as const;

export type ButtonSize = ( typeof BUTTON_SIZES )[ number ];

interface ButtonOwnProps {
	/** Hierarchy level. Maps to the Figma `Type` variant. */
	variant?: ButtonType;
	/** Control size. Maps to the Figma `Size` variant. */
	size?: ButtonSize;
	/** Icon rendered before the label. */
	iconLeading?: ReactNode;
	/** Icon rendered after the label. */
	iconTrailing?: ReactNode;
	/** The button's label. */
	children?: ReactNode;
	/**
	 * Renders the Figma `Disabled` state. A `<button>` gets the native
	 * attribute; a link (`href`) drops its `href`, leaves the tab order and is
	 * marked `aria-disabled`, because an anchor cannot be natively disabled.
	 */
	disabled?: boolean | undefined;
	/**
	 * Loading state. Maps to the Figma `State=Loading` variant. Keep the
	 * resting label as `children` and set `loading` rather than swapping copy.
	 */
	loading?: boolean;
	/**
	 * Accessible name while `loading`. Defaults to `aria-label`, then to
	 * string or number `children`.
	 */
	loadingAriaLabel?: string;
}

/** An action on the current page: renders a `<button>`. */
export interface ButtonAsButtonProps
	extends
		ButtonOwnProps,
		Omit< ButtonHTMLAttributes< HTMLButtonElement >, 'type' | 'disabled' > {
	href?: never;
	/** Native button behaviour. Renamed from `type` so `variant` can own the visual axis. */
	nativeType?: ButtonHTMLAttributes< HTMLButtonElement >[ 'type' ];
}

/**
 * Navigation that looks like a button: renders an `<a>`, so it is announced
 * as a link and supports open-in-new-tab. Inside a `RouterProvider`, a plain
 * same-origin click navigates client-side.
 */
export interface ButtonAsLinkProps
	extends
		ButtonOwnProps,
		Omit< AnchorHTMLAttributes< HTMLAnchorElement >, 'href' | 'type' > {
	/** Destination. Setting it renders an `<a>` instead of a `<button>`. */
	href: string;
	nativeType?: never;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function loadingAccessibleName(
	loadingAriaLabel: string | undefined,
	ariaLabel: string | undefined,
	children: ReactNode
): string | undefined {
	if ( loadingAriaLabel != null && loadingAriaLabel !== '' ) {
		return loadingAriaLabel;
	}
	if ( ariaLabel != null && ariaLabel !== '' ) {
		return ariaLabel;
	}
	if ( typeof children === 'string' || typeof children === 'number' ) {
		return String( children );
	}
	return undefined;
}

interface ButtonLinkProps extends Omit<
	ButtonAsLinkProps,
	keyof ButtonOwnProps | 'nativeType'
> {
	inert: boolean;
	className: string;
	ariaLabel: string | undefined;
	loading: boolean;
	children: ReactNode;
}

/**
 * The anchor form, split out so the router hook only runs for links.
 * Disabled and loading links follow `Link`: no `href`, out of the tab order,
 * `aria-disabled`.
 */
const ButtonLink = forwardRef< HTMLAnchorElement, ButtonLinkProps >(
	function ButtonLink(
		{
			href,
			inert,
			className,
			ariaLabel,
			loading,
			onClick,
			target,
			rel,
			children,
			...rest
		},
		ref
	) {
		const router = useRouterLink( href, onClick );
		const resolvedRel = linkRel( target, rel );
		const shared = {
			...rest,
			className,
			...( target != null ? { target } : {} ),
			...( resolvedRel != null ? { rel: resolvedRel } : {} ),
			...( loading ? { 'aria-busy': true } : {} ),
			...( ariaLabel != null ? { 'aria-label': ariaLabel } : {} ),
		};
		if ( inert ) {
			// No href and no click handler: nothing to activate, as with Link.
			return (
				<a
					{ ...shared }
					ref={ ref }
					aria-disabled="true"
					tabIndex={ -1 }
				>
					{ children }
				</a>
			);
		}
		return (
			<a
				{ ...shared }
				ref={ ref }
				href={ router.href ?? href }
				onClick={ router.onClick }
			>
				{ children }
			</a>
		);
	}
);

function ButtonImpl(
	props: ButtonProps,
	ref: ForwardedRef< HTMLButtonElement | HTMLAnchorElement >
) {
	const {
		variant = 'primary',
		size = 'md',
		iconLeading,
		iconTrailing,
		children,
		className,
		loading = false,
		loadingAriaLabel,
		disabled,
		'aria-label': ariaLabel,
	} = props;

	const resolvedAriaLabel = loading
		? loadingAccessibleName( loadingAriaLabel, ariaLabel, children )
		: ariaLabel;

	const classes = clsx(
		styles.button,
		styles[ size ],
		styles[ variant ],
		loading && styles.loading,
		className
	);

	const content = (
		<>
			{ loading ? (
				<span
					className={ clsx( styles.icon, styles.spinner ) }
					aria-hidden="true"
				>
					<LoaderCircle />
				</span>
			) : null }
			<span
				className={ clsx(
					styles.content,
					loading && styles.contentHidden
				) }
			>
				{ iconLeading ? (
					<span className={ styles.icon } aria-hidden="true">
						{ iconLeading }
					</span>
				) : null }
				{ children != null ? (
					<span className={ styles.label }>{ children }</span>
				) : null }
				{ iconTrailing ? (
					<span className={ styles.icon } aria-hidden="true">
						{ iconTrailing }
					</span>
				) : null }
			</span>
		</>
	);

	if ( props.href !== undefined ) {
		const {
			variant: _variant,
			size: _size,
			iconLeading: _iconLeading,
			iconTrailing: _iconTrailing,
			children: _children,
			className: _className,
			loading: _loading,
			loadingAriaLabel: _loadingAriaLabel,
			disabled: _disabled,
			'aria-label': _ariaLabel,
			nativeType: _nativeType,
			...anchorRest
		} = props;
		return (
			<ButtonLink
				{ ...anchorRest }
				ref={ ref as ForwardedRef< HTMLAnchorElement > }
				inert={ Boolean( disabled || loading ) }
				className={ classes }
				ariaLabel={ resolvedAriaLabel }
				loading={ loading }
			>
				{ content }
			</ButtonLink>
		);
	}

	const {
		variant: _variant,
		size: _size,
		iconLeading: _iconLeading,
		iconTrailing: _iconTrailing,
		children: _children,
		className: _className,
		loading: _loading,
		loadingAriaLabel: _loadingAriaLabel,
		disabled: _disabled,
		'aria-label': _ariaLabel,
		nativeType = 'button',
		onClick,
		href: _href,
		...buttonRest
	} = props;

	const handleClick = ( event: MouseEvent< HTMLButtonElement > ) => {
		if ( loading ) {
			event.preventDefault();
			return;
		}
		onClick?.( event );
	};

	return (
		<button
			{ ...buttonRest }
			ref={ ref as ForwardedRef< HTMLButtonElement > }
			type={ nativeType }
			disabled={ Boolean( disabled || loading ) }
			onClick={ handleClick }
			className={ classes }
			{ ...( loading ? { 'aria-busy': true } : {} ) }
			{ ...( resolvedAriaLabel != null
				? { 'aria-label': resolvedAriaLabel }
				: {} ) }
		>
			{ content }
		</button>
	);
}

/**
 * `Button` is overloaded on `href` so each form keeps a precise ref type: a
 * `<button>` ref without `href`, an `<a>` ref with it. The last overload takes
 * the whole `ButtonProps` union, so a wrapper can forward `<Button { ...props } />`
 * in either form, and `ComponentProps< typeof Button >` (which reads the last
 * overload) keeps the link props. Each member of that union carries its own
 * ref type, so `ComponentRef< typeof Button >` and `ComponentPropsWithRef` keep
 * working, while a `<button>` ref on a link (or the reverse) stays an error.
 */
export interface ButtonComponent {
	(
		props: ButtonAsLinkProps & RefAttributes< HTMLAnchorElement >
	): ReactElement | null;
	(
		props: ButtonAsButtonProps & RefAttributes< HTMLButtonElement >
	): ReactElement | null;
	(
		props:
			| ( ButtonAsLinkProps & RefAttributes< HTMLAnchorElement > )
			| ( ButtonAsButtonProps & RefAttributes< HTMLButtonElement > )
	): ReactElement | null;
	displayName?: string;
}

/**
 * Triggers actions and submits data. Available in five hierarchy levels with
 * optional leading or trailing icons.
 *
 * Figma: Base Design System — `Button` (`530:13117`).
 *
 * The Figma component models Hover, Focus and Disabled as variants; here they
 * are CSS states and the native `disabled` attribute. `State=Loading` is the
 * `loading` prop: Type colours stay, the label and icons keep their layout
 * (so width does not collapse, matching Figma Usage), and a spinner overlays
 * them.
 *
 * Give it an `href` when it navigates. It then renders a real `<a>` with the
 * same styling, so assistive tech announces a link and "Open in new tab"
 * works; Figma draws one Button for both, since the element is a semantics
 * question it cannot express. Anything that acts on the current page stays a
 * `<button>`.
 *
 * @example
 * <Button variant="primary" size="md" iconLeading={ <Plus /> }>Add item</Button>
 * <Button loading loadingAriaLabel="Saving">Save</Button>
 * <Button href="/settings">Open settings</Button>
 */
export const Button = forwardRef( function Button(
	props: ButtonProps,
	ref: ForwardedRef< HTMLButtonElement | HTMLAnchorElement >
) {
	return ButtonImpl( props, ref );
} ) as ButtonComponent;
