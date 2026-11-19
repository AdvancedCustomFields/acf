import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './TabbedNavigation.module.css';

/**
 * The data attribute every `TabbedNavigation` root carries.
 *
 * A stable hook for a container that restyles the bar's own edges, as
 * `PageHeader` does: there the bar draws a faint top rule and no bottom one,
 * because the header's border closes it. Target it from CSS as
 * `[data-bds-tabbed-navigation]`; it is not a variant, and only the bar's
 * borders should change through it.
 */
export const TABBED_NAVIGATION_ATTRIBUTE = 'data-bds-tabbed-navigation';

export interface TabbedNavigationProps extends HTMLAttributes< HTMLDivElement > {
	/**
	 * The tabs: a base `TabList` (inside a `Tabs`, whose panels render after
	 * this bar) when sections switch in place, or a base `TabNav` of
	 * `TabLink`s when each tab is its own URL. Use the `line` appearance,
	 * which the Figma component wraps.
	 */
	children: ReactNode;
	/**
	 * Controls that act on the whole row, shown at the end of the bar.
	 * Supplying it turns on the Figma `Secondary content` boolean and fills
	 * its `↪ Secondary content` slot.
	 */
	secondaryContent?: ReactNode;
}

/**
 * Moves between sections of a WordPress screen with a full-width row of tabs.
 * Wraps the Base Horizontal tabs component and adds an optional area beside
 * the tabs for controls that act on the whole row.
 *
 * Figma: WordPress Component Library — `Tabbed navigation` (`2056:6704`).
 *
 * The bar lays out a row and an optional secondary area, and does not care
 * which kind of tabs it holds. It sits the tab row flush (no list padding and
 * no list hairline) and stretches the tabs to its full height, so the selected
 * tab's line indicator lands on the bar's own bottom border, as Figma draws
 * it.
 *
 * @example
 * // Panels: the bar holds the TabList; the panels follow it inside Tabs.
 * <Tabs defaultValue="general" appearance="line">
 *   <TabbedNavigation>
 *     <TabList aria-label="Settings sections">
 *       <Tab value="general">General</Tab>
 *       <Tab value="advanced">Advanced</Tab>
 *     </TabList>
 *   </TabbedNavigation>
 *   <TabPanel value="general">…</TabPanel>
 *   <TabPanel value="advanced">…</TabPanel>
 * </Tabs>
 *
 * // Links: one URL per tab.
 * <TabbedNavigation secondaryContent={ <Button size="sm">Export</Button> }>
 *   <TabNav aria-label="Settings sections" appearance="line">
 *     <TabLink href="?page=power&tab=general" current>General</TabLink>
 *     <TabLink href="?page=power&tab=advanced">Advanced</TabLink>
 *   </TabNav>
 * </TabbedNavigation>
 */
export function TabbedNavigation( {
	children,
	secondaryContent,
	className,
	...rest
}: TabbedNavigationProps ) {
	const hasSecondaryContent =
		secondaryContent !== undefined &&
		secondaryContent !== null &&
		secondaryContent !== false;

	return (
		<div
			{ ...rest }
			{ ...{ [ TABBED_NAVIGATION_ATTRIBUTE ]: '' } }
			className={ clsx( styles.bar, className ) }
		>
			{ children }
			{ hasSecondaryContent ? (
				<div className={ styles.secondary }>{ secondaryContent }</div>
			) : null }
		</div>
	);
}
