import {
	createContext,
	useContext,
	useMemo,
	type MouseEvent,
	type ReactNode,
} from 'react';

/**
 * What an app hands BDS so its links can navigate without a full page load.
 */
export interface RouterProviderProps {
	/**
	 * Client-side navigation, called with an app path (`/settings?tab=x`)
	 * exactly as the component was given it. With React Router, pass
	 * `useNavigate()`'s function.
	 */
	navigate: ( href: string ) => void;
	/**
	 * Maps an app path to the URL written to the DOM, for routers mounted under
	 * a base path. React Router's `navigate` resolves its `basename`, but a raw
	 * `href` would not, so "Open in new tab" would miss it. Only called for app
	 * paths. Defaults to the path unchanged.
	 */
	resolveHref?: ( href: string ) => string;
	children?: ReactNode;
}

interface RouterContextValue {
	navigate: ( href: string ) => void;
	resolveHref: ( href: string ) => string;
}

const RouterContext = createContext< RouterContextValue | null >( null );

function identity( href: string ): string {
	return href;
}

/**
 * Lets `Link`, and `Button` and `IconButton` given an `href`, navigate through
 * the app's own router instead of reloading the page. BDS stays
 * router-agnostic: it only calls the `navigate` it is given.
 *
 * Only app paths — an `href` starting with a single `/`, written relative to
 * the router as React Router's `to` is — belong to the router. An absolute URL
 * (`https://…`), even on the same origin, is always left to the browser and
 * written to the DOM untouched, so link to anything outside the router (another
 * app or a server endpoint on the same host) with an absolute URL.
 *
 * Without a provider those components are ordinary links, which is right for
 * multi-page hosts such as wp-admin.
 *
 * @example
 * function BdsRouter( { children } ) {
 *   const navigate = useNavigate();
 *   return <RouterProvider navigate={ navigate }>{ children }</RouterProvider>;
 * }
 */
export function RouterProvider( {
	navigate,
	resolveHref = identity,
	children,
}: RouterProviderProps ) {
	const value = useMemo(
		() => ( { navigate, resolveHref } ),
		[ navigate, resolveHref ]
	);
	return (
		<RouterContext.Provider value={ value }>
			{ children }
		</RouterContext.Provider>
	);
}

/**
 * True only for a click the browser would turn into a same-tab, same-origin
 * navigation: an unmodified primary-button click on a link with no `download`
 * and no `target` other than `_self`. Everything else — cmd/ctrl/shift/alt
 * clicks, middle clicks, new windows, downloads, other origins — is left to
 * the browser so a link always behaves like a link.
 */
export function isRouterNavigableClick(
	event: MouseEvent< HTMLAnchorElement >
): boolean {
	if (
		event.defaultPrevented ||
		event.button !== 0 ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey
	) {
		return false;
	}
	const anchor = event.currentTarget;
	const target = anchor.getAttribute( 'target' );
	if (
		( target != null && target !== '' && target !== '_self' ) ||
		anchor.hasAttribute( 'download' )
	) {
		return false;
	}
	if ( ! anchor.hasAttribute( 'href' ) ) {
		return false;
	}
	try {
		return new URL( anchor.href ).origin === globalThis.location.origin;
	} catch {
		return false;
	}
}

/**
 * True for an app path the router owns: starts with one `/`. Protocol-relative
 * (`//host/…`) and absolute URLs are not app paths.
 */
export function isAppPath( href: string ): boolean {
	return href.startsWith( '/' ) && ! href.startsWith( '//' );
}

/**
 * `rel` for a link opening a new browsing context: keep the caller's, or
 * default to `noopener noreferrer` so the new page cannot reach `opener`.
 */
export function linkRel(
	target: string | undefined,
	rel: string | undefined
): string | undefined {
	if ( rel != null ) {
		return rel;
	}
	return target === '_blank' ? 'noopener noreferrer' : undefined;
}

/**
 * Wires an anchor into the nearest `RouterProvider`. Returns the `href` to
 * render and a click handler that runs the caller's `onClick` first and then,
 * unless it prevented default, hands eligible clicks to the router.
 */
export function useRouterLink(
	href: string | undefined,
	onClick: ( ( event: MouseEvent< HTMLAnchorElement > ) => void ) | undefined
): {
	href: string | undefined;
	onClick: ( event: MouseEvent< HTMLAnchorElement > ) => void;
} {
	const router = useContext( RouterContext );
	const routed =
		router != null && href !== undefined && isAppPath( href )
			? { router, href }
			: null;
	return {
		href: routed ? routed.router.resolveHref( routed.href ) : href,
		onClick: ( event ) => {
			onClick?.( event );
			if ( routed == null || ! isRouterNavigableClick( event ) ) {
				return;
			}
			event.preventDefault();
			routed.router.navigate( routed.href );
		},
	};
}
