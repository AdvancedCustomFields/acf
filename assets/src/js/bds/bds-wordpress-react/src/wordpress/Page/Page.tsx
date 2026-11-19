import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './Page.module.css';

export interface PageProps extends HTMLAttributes< HTMLDivElement > {
	/**
	 * Screen title bar — typically {@link PageHeader}. Rendered above the body.
	 */
	headerComponent?: ReactNode;
	/**
	 * A self-contained tabbed body, rendered below the header in place of
	 * `children` — a base `Tabs` holding a {@link TabbedNavigation} and its
	 * `TabPanel`s, each panel wrapping its body in {@link PageContent}.
	 *
	 * To put the tab row *inside* the header instead, as Figma's `Page header`
	 * does, pass it to {@link PageHeader}'s `navigation`, wrap this
	 * `Page` in the `Tabs`, and render the panels as `children`.
	 */
	tabs?: ReactNode;
	/** Page body when there are no `tabs`. Should include {@link PageContent}. */
	children?: ReactNode;
}

/**
 * Root container for a WP-admin plugin screen or route.
 *
 * **Engineering layout shell** — no Figma component. Ported from `pds-react`.
 * Optionally renders a header and either tab navigation or direct children.
 * Establishes the page-width container query context for {@link PageHeader} and
 * {@link PageContent}.
 *
 * @example
 * <Page headerComponent={ <PageHeader title="Settings" /> }>
 *   <PageContent>
 *     <PageContent.Main>{ children }</PageContent.Main>
 *   </PageContent>
 * </Page>
 */
export function Page( {
	headerComponent,
	tabs,
	children,
	className,
	...rest
}: PageProps ) {
	return (
		<div className={ clsx( styles.page, className ) } { ...rest }>
			{ headerComponent }
			{ tabs }
			{ ! tabs ? children : null }
		</div>
	);
}
