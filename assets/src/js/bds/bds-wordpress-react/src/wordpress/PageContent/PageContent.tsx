import clsx from 'clsx';
import type { FC, HTMLAttributes, ReactNode } from 'react';

import type {
	PageShellGap,
	PageShellPadding,
} from '../layoutShell/layoutShell';
import styles from './PageContent.module.css';

export { PAGE_SHELL_GAP, PAGE_SHELL_PADDING } from '../layoutShell/layoutShell';
export type { PageShellGap, PageShellPadding };

export interface PageContentProps extends HTMLAttributes< HTMLDivElement > {
	children?: ReactNode;
	/**
	 * Horizontal and bottom padding on the content wrapper.
	 *
	 * @default 'default' — `space-3xl` (32px) on all sides unless
	 * {@link paddingTop} is `none`. `none` removes all padding.
	 */
	padding?: PageShellPadding;
	/**
	 * Top padding on the content wrapper.
	 *
	 * @default 'default' — `space-3xl` (32px). Use `none` when content sits
	 * flush under {@link PageHeader}.
	 */
	paddingTop?: PageShellPadding;
}

export interface PageContentRegionProps extends HTMLAttributes< HTMLDivElement > {
	children?: ReactNode;
	/**
	 * Vertical gap between stacked children inside the region.
	 *
	 * @default 'default' — `space-2xl` (24px); `none` removes gap.
	 */
	gap?: PageShellGap;
}

/**
 * Primary content column. Required inside {@link PageContent}.
 */
export function PageContentMain( {
	children,
	className,
	gap = 'default',
	...rest
}: PageContentRegionProps ) {
	return (
		<div
			className={ clsx(
				styles.main,
				gap === 'none' && styles.mainGapNone,
				className
			) }
			{ ...rest }
		>
			{ children }
		</div>
	);
}

/**
 * Optional secondary column for two-column layouts. Place after
 * {@link PageContentMain}.
 */
export function PageContentSidebar( {
	children,
	className,
	gap = 'default',
	...rest
}: PageContentRegionProps ) {
	return (
		<div
			className={ clsx(
				styles.sidebar,
				gap === 'none' && styles.sidebarGapNone,
				className
			) }
			{ ...rest }
		>
			{ children }
		</div>
	);
}

export interface PageContentComponent extends FC< PageContentProps > {
	Main: typeof PageContentMain;
	Sidebar: typeof PageContentSidebar;
}

/**
 * Centred content wrapper with page padding and optional sidebar column.
 *
 * **Engineering layout shell** — no Figma component. Ported from `pds-react`.
 * Use as the body of {@link Page} (or inside each tab panel when using tabs).
 * Always include {@link PageContentMain}; {@link PageContentSidebar} is optional.
 *
 * @example
 * <PageContent>
 *   <PageContent.Main>
 *     <Section>{ content }</Section>
 *   </PageContent.Main>
 * </PageContent>
 */
export const PageContent = ( ( {
	children,
	className,
	padding = 'default',
	paddingTop = 'default',
	...rest
}: PageContentProps ) => {
	return (
		<div className={ styles.container }>
			<div
				className={ clsx(
					styles.content,
					padding === 'none' && styles.contentPaddingNone,
					paddingTop === 'none' && styles.contentPaddingTopNone,
					className
				) }
				{ ...rest }
			>
				{ children }
			</div>
		</div>
	);
} ) as PageContentComponent;

PageContent.Main = PageContentMain;
PageContent.Sidebar = PageContentSidebar;
