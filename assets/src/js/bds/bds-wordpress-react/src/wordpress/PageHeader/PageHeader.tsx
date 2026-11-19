import clsx from 'clsx';
import { createElement, type HTMLAttributes, type ReactNode } from 'react';

import { ButtonGroup } from '@wpengine/bds-react/base/ButtonGroup';
import styles from './PageHeader.module.css';

/**
 * Heading levels the title may render as.
 *
 * Not a Figma variant. A WP-Admin screen usually already has WordPress's own
 * `<h1>` in `.wrap`, so a plugin embedding this inside an existing screen needs
 * to be able to step down a level and keep the document outline valid.
 */
export const PAGE_HEADER_HEADING_LEVELS = [ 1, 2, 3 ] as const;
export type PageHeaderHeadingLevel =
	( typeof PAGE_HEADER_HEADING_LEVELS )[ number ];

export interface PageHeaderProps extends Omit<
	HTMLAttributes< HTMLElement >,
	'title'
> {
	/** The screen title. Maps to the Figma `Title` text property. */
	title: ReactNode;
	/**
	 * Screen-level actions, typically Buttons. Supplying them shows the actions
	 * area — Figma's `Actions` boolean. They are wrapped in a base
	 * {@link ButtonGroup}, which is what the Figma component composes.
	 */
	actions?: ReactNode;
	/**
	 * Status or metadata beside the title. Supplying it shows the Figma `Badge`
	 * slot beside the page title.
	 */
	badge?: ReactNode;
	/**
	 * A row of tabs under the title row, intended for a
	 * {@link TabbedNavigation}. Supplying it turns on the Figma `Tabbed
	 * navigation` boolean. In the header the bar draws a faint top rule and no
	 * bottom one, because the header's own border closes it; that is styled
	 * here, not a variant of the bar.
	 */
	navigation?: ReactNode;
	/**
	 * Heading level for the title.
	 *
	 * @default 1
	 */
	headingLevel?: PageHeaderHeadingLevel;
}

/**
 * Titles a WP-Admin screen and holds its screen-level actions. Includes an
 * optional actions area built on the Base Button group.
 *
 * The bar is **full-bleed** — flush to the top/left/right of the page shell.
 * Title and actions align with {@link PageContent} via inline padding on the
 * inner row, not outer margin on the header. An optional `navigation` row
 * (a {@link TabbedNavigation}) runs under the title row: its background and
 * top rule are full-bleed too, and its tabs sit in the same centred column,
 * so the first tab's label lines up with the title.
 *
 * Figma: WordPress Component Library — `Page header` (`59:609`).
 *
 * @example
 * <PageHeader
 *   title="Settings"
 *   actions={ <Button>Save changes</Button> }
 *   navigation={
 *     <TabbedNavigation>
 *       <TabNav aria-label="Settings sections" appearance="line">
 *         <TabLink href="?page=power&tab=general" current>General</TabLink>
 *         <TabLink href="?page=power&tab=advanced">Advanced</TabLink>
 *       </TabNav>
 *     </TabbedNavigation>
 *   }
 * />
 */
export function PageHeader( {
	title,
	actions,
	badge,
	navigation,
	headingLevel = 1,
	className,
	...rest
}: PageHeaderProps ) {
	const hasNavigation =
		navigation !== undefined && navigation !== null && navigation !== false;

	return (
		<header { ...rest } className={ clsx( styles.header, className ) }>
			<div className={ styles.content }>
				<div className={ styles.titleContainer }>
					{ createElement(
						`h${ headingLevel }`,
						{ className: styles.title },
						title
					) }
					{ badge ? (
						<div className={ styles.badge }>{ badge }</div>
					) : null }
				</div>
				{ actions ? (
					<ButtonGroup className={ styles.actions }>
						{ actions }
					</ButtonGroup>
				) : null }
			</div>
			{ hasNavigation ? (
				<div className={ styles.navigation }>{ navigation }</div>
			) : null }
		</header>
	);
}
