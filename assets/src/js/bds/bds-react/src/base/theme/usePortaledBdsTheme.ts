import { useLayoutEffect, useRef, useState } from 'react';

/** The values `data-bds-theme` takes. */
export type BdsTheme = 'light' | 'dark';

/**
 * Copies the nearest ancestor `data-bds-theme` so overlay markup that Ark
 * portals to `document.body` still resolves the caller's tokens.
 *
 * Ark Portal accepts `container`, but it syncs that ref in `useEffect` (after
 * paint) and targeting the themed hub root would put the overlay back inside
 * host stacking and overflow — the very trap portaling escapes. A body-portaled
 * wrapper that repeats the attribute keeps overlays on `body`, applies the
 * caller's theme before paint, and does not set the attribute on `html` /
 * `body`.
 *
 * While open, the ancestor is observed so a host theme flip (Storybook toolbar,
 * runtime toggle) does not leave the portal on stale tokens.
 *
 * `override` opts out of inheritance for surfaces that must not take the host's
 * theme — a menu opened from the console's permanently dark sidebar, say, which
 * design draws on the light surface like every other menu.
 *
 * Attach `hostRef` to a layout-neutral element at the call site and render the
 * portaled overlay inside `<div data-bds-theme={ theme }>`.
 *
 * Shared by `Modal` and the floating menus (`DropdownMenu`, `SelectInput`,
 * `MultiSelectInput`), which all portal a themed surface to `document.body`.
 */
export function usePortaledBdsTheme< T extends HTMLElement = HTMLElement >(
	open: boolean,
	override?: BdsTheme
) {
	const hostRef = useRef< T >( null );
	const [ theme, setTheme ] = useState< string | undefined >( undefined );

	useLayoutEffect( () => {
		const read = () => {
			const host = hostRef.current?.closest( '[data-bds-theme]' );
			const next =
				host instanceof HTMLElement
					? host.dataset[ 'bdsTheme' ] || undefined
					: undefined;
			setTheme( ( current ) => ( current === next ? current : next ) );
		};

		read();
		if ( ! open ) {
			return;
		}

		const host = hostRef.current?.closest( '[data-bds-theme]' );
		if ( ! ( host instanceof HTMLElement ) ) {
			return;
		}

		const observer = new MutationObserver( read );
		observer.observe( host, {
			attributes: true,
			attributeFilter: [ 'data-bds-theme' ],
		} );
		return () => observer.disconnect();
	}, [ open ] );

	return { hostRef, theme: override ?? theme } as const;
}
