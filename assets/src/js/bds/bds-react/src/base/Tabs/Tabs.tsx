import { useTabs } from '@ark-ui/react/tabs';
import type { UseTabsReturn } from '@ark-ui/react/tabs';
import clsx from 'clsx';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import { Badge } from '../Badge';
import styles from './Tabs.module.css';

/** Styles available to horizontal tabs, matching the Figma `Style` variant. */
export const HORIZONTAL_TAB_STYLES = [ 'line', 'button', 'accent' ] as const;

/**
 * Styles available to vertical tabs, matching the Figma `Style` variant.
 * `line` is horizontal-only — the vertical component set does not have it.
 */
export const VERTICAL_TAB_STYLES = [ 'button', 'accent' ] as const;

export type HorizontalTabStyle = ( typeof HORIZONTAL_TAB_STYLES )[ number ];

export type VerticalTabStyle = ( typeof VERTICAL_TAB_STYLES )[ number ];

type TabAppearance = HorizontalTabStyle | VerticalTabStyle;

interface TabsContextValue {
	api: UseTabsReturn;
	appearance: TabAppearance;
	orientation: 'horizontal' | 'vertical';
}

/**
 * The hooks every style rule keys off. On the list rather than the root, so a
 * wrapper between `<Tabs>` and `<TabList>` keeps the styling, and the same
 * on `TabList` and `TabNav`'s `<ul>`, so both modes share one set of rules.
 * `data-part="list"` is also the stable hook for a wrapper's own CSS.
 */
function listAttributes(
	orientation: 'horizontal' | 'vertical',
	appearance: TabAppearance
) {
	return {
		'data-part': 'list',
		'data-orientation': orientation,
		'data-appearance': appearance,
	};
}

const TabsContext = createContext< TabsContextValue | null >( null );

/** The style a `<TabNav>` hands its `<TabLink>`s, for the badge colour. */
const TabNavContext = createContext< TabAppearance | null >( null );

function useTabsContext( component: string ): TabsContextValue {
	const context = useContext( TabsContext );
	if ( ! context ) {
		throw new Error( `<${ component }> must be rendered inside <Tabs>.` );
	}
	return context;
}

function useTabsApi( component: string ): UseTabsReturn {
	return useTabsContext( component ).api;
}

interface TabsBaseProps extends Omit<
	HTMLAttributes< HTMLDivElement >,
	'onChange' | 'defaultValue'
> {
	/** A `<TabList>` of `<Tab>`s, plus one `<TabPanel>` per tab. */
	children: ReactNode;
	/** Controlled selected tab value. */
	value?: string;
	/** Uncontrolled initial selected tab value. */
	defaultValue?: string;
	/** Called with the value of the newly selected tab. */
	onValueChange?: ( value: string ) => void;
	/**
	 * `automatic` selects a tab as soon as it receives focus; `manual` waits for
	 * Enter or Space. Defaults to `automatic`.
	 */
	activationMode?: 'automatic' | 'manual';
}

export interface HorizontalTabsProps extends TabsBaseProps {
	/** Left-to-right tabs. This is the default. */
	orientation?: 'horizontal';
	/** Maps to the Figma `Style` variant of `Horizontal tabs`. */
	appearance?: HorizontalTabStyle;
}

export interface VerticalTabsProps extends TabsBaseProps {
	/** Top-to-bottom tabs, for sidebars and settings layouts. */
	orientation: 'vertical';
	/** Maps to the Figma `Style` variant of `Vertical tabs`. */
	appearance?: VerticalTabStyle;
}

/**
 * Union of the two Figma component sets. The type enforces the difference
 * between them: `line` exists on horizontal tabs only.
 */
export type TabsProps = HorizontalTabsProps | VerticalTabsProps;

/**
 * Switches between distinct sections of content.
 *
 * Figma models the two orientations as two component sets, because a Figma
 * variant cannot change a layout direction and a style list at once:
 *
 * - `Horizontal tabs` (`1656:1720`) — "Switches between distinct sections of
 *   content arranged left to right. AKA Tab bar." `Style = Line | Button |
 *   Accent`.
 * - `Vertical tabs` (`1656:1821`) — "Switches between distinct sections of
 *   content arranged top to bottom. Use in sidebars and settings layouts."
 *   `Style = Button | Accent`.
 *
 * They share the same `_Tab base`, so they are one component here with an
 * `orientation` prop; the props type keeps `line` horizontal-only.
 *
 * Selection, roving focus and arrow-key behaviour come from Ark UI's `useTabs`.
 * We render our own elements rather than Ark's `Tabs.*` components so the
 * markup stays minimal and the props stay strictly typed — Ark's polymorphic
 * props don't satisfy `exactOptionalPropertyTypes`.
 *
 * @example
 * <Tabs defaultValue="overview" appearance="line">
 *   <TabList>
 *     <Tab value="overview">Overview</Tab>
 *     <Tab value="activity">Activity</Tab>
 *   </TabList>
 *   <TabPanel value="overview">…</TabPanel>
 *   <TabPanel value="activity">…</TabPanel>
 * </Tabs>
 */
export function Tabs( {
	children,
	value,
	defaultValue,
	onValueChange,
	activationMode,
	orientation = 'horizontal',
	appearance = orientation === 'vertical' ? 'button' : 'line',
	className,
	...rest
}: TabsProps ) {
	const api = useTabs( {
		value,
		defaultValue,
		orientation,
		activationMode,
		onValueChange: onValueChange
			? ( details ) => onValueChange( details.value )
			: undefined,
	} );
	const context = useMemo(
		() => ( { api, appearance, orientation } ),
		[ api, appearance, orientation ]
	);

	return (
		<TabsContext.Provider value={ context }>
			<div
				{ ...rest }
				{ ...api.getRootProps() }
				className={ clsx(
					styles.root,
					styles[ orientation ],
					className
				) }
			>
				{ children }
			</div>
		</TabsContext.Provider>
	);
}

export interface TabListProps extends HTMLAttributes< HTMLDivElement > {
	/** The `<Tab>`s. */
	children: ReactNode;
	/** Accessible name for the tab list. */
	'aria-label'?: string;
}

/** The row (or column) of tab triggers. */
export function TabList( {
	children,
	className,
	'aria-label': ariaLabel,
	...rest
}: TabListProps ) {
	const { api, appearance, orientation } = useTabsContext( 'TabList' );

	return (
		<div
			{ ...rest }
			{ ...api.getListProps() }
			// Ark sets its own `aria-label` from its translations, so a
			// consumer's has to be reapplied after the spread.
			{ ...( ariaLabel === undefined
				? {}
				: { 'aria-label': ariaLabel } ) }
			{ ...listAttributes( orientation, appearance ) }
			className={ clsx( styles.list, className ) }
		>
			{ children }
		</div>
	);
}

export interface TabProps extends Omit<
	HTMLAttributes< HTMLButtonElement >,
	'children'
> {
	/** Identifies the tab, and the panel it controls. */
	value: string;
	/** Maps to the Figma `Label` text property. */
	children: ReactNode;
	/** Leading icon. Maps to the Figma `Icon` boolean and `↪ Icon` swap. */
	icon?: ReactNode;
	/**
	 * Trailing badge content, such as a count. Maps to the Figma `Badge`
	 * boolean. Rendered as a small pill `Badge` — blue for `line` and `button`,
	 * gray for `accent`, as `_Tab base` binds it.
	 */
	badge?: ReactNode;
	/** Disable this tab. */
	disabled?: boolean;
}

interface TabContentProps {
	appearance: TabAppearance;
	icon: ReactNode;
	badge: ReactNode;
	children: ReactNode;
}

/**
 * The inside of `_Tab base`: Figma's `Icon and Label Container` (icon and
 * label, `space-xs` apart), then the optional badge `space-sm` after it.
 */
function TabContent( { appearance, icon, badge, children }: TabContentProps ) {
	return (
		<>
			<span className={ styles.content }>
				{ icon ? (
					<span aria-hidden="true" className={ styles.icon }>
						{ icon }
					</span>
				) : null }
				<span className={ styles.label }>{ children }</span>
			</span>
			{ badge === undefined || badge === null ? null : (
				<>
					{ /*
					 * Keeps the label and badge apart in the accessible name
					 * ("Logs 2", not "Logs2"). Whitespace between flex items
					 * is not rendered, so it costs nothing visually.
					 */ }{ ' ' }
					<Badge
						size="sm"
						radius="pill"
						stroke
						color={ appearance === 'accent' ? 'gray' : 'blue' }
					>
						{ badge }
					</Badge>
				</>
			) }
		</>
	);
}

/** A single tab trigger. Figma calls it `_Tab base`. */
export function Tab( {
	value,
	children,
	icon,
	badge,
	disabled,
	className,
	...rest
}: TabProps ) {
	const { api, appearance } = useTabsContext( 'Tab' );
	const triggerProps = {
		value,
		...( disabled === undefined ? {} : { disabled } ),
	};

	return (
		<button
			type="button"
			{ ...rest }
			{ ...api.getTriggerProps( triggerProps ) }
			className={ clsx( styles.tab, className ) }
		>
			<TabContent appearance={ appearance } icon={ icon } badge={ badge }>
				{ children }
			</TabContent>
		</button>
	);
}

export interface TabPanelProps extends HTMLAttributes< HTMLDivElement > {
	/** The value of the tab this panel belongs to. */
	value: string;
	/** Panel content. */
	children?: ReactNode;
}

/** The content shown for the selected tab. */
export function TabPanel( {
	value,
	children,
	className,
	...rest
}: TabPanelProps ) {
	const api = useTabsApi( 'TabPanel' );

	return (
		<div
			{ ...rest }
			{ ...api.getContentProps( { value } ) }
			className={ clsx( styles.panel, className ) }
		>
			{ children }
		</div>
	);
}

interface TabNavBaseProps extends HTMLAttributes< HTMLElement > {
	/** The `<TabLink>`s. */
	children: ReactNode;
	/**
	 * Accessible name for the navigation landmark. Required: a page can have
	 * several `<nav>`s, and each needs its own name.
	 */
	'aria-label': string;
}

export interface HorizontalTabNavProps extends TabNavBaseProps {
	/** Left-to-right links. This is the default. */
	orientation?: 'horizontal';
	/** Maps to the Figma `Style` variant of `Horizontal tabs`. */
	appearance?: HorizontalTabStyle;
}

export interface VerticalTabNavProps extends TabNavBaseProps {
	/** Top-to-bottom links, for sidebars and settings layouts. */
	orientation: 'vertical';
	/** Maps to the Figma `Style` variant of `Vertical tabs`. */
	appearance?: VerticalTabStyle;
}

/**
 * Union of the two Figma component sets, typed like `TabsProps`: `line` exists
 * on horizontal tabs only.
 */
export type TabNavProps = HorizontalTabNavProps | VerticalTabNavProps;

/**
 * Tabs that navigate between pages. An engineering mode of the Figma
 * `Horizontal tabs` (`1656:1720`) and `Vertical tabs` (`1656:1821`) sets, for
 * screens where each tab is its own URL — a WordPress admin page's
 * `?page=x&tab=y`, say.
 *
 * Same visuals as `Tabs`, link semantics: a `<nav>` landmark around a list of
 * `<TabLink>`s. There is no tablist, no panels and no roving focus — each tab
 * is an ordinary link, reached with Tab and followed with Enter, and the
 * current page carries `aria-current="page"`. Use `Tabs` instead when the
 * sections switch in place on one page.
 *
 * Figma has no separate component for this; it draws the same `_Tab base`.
 *
 * @example
 * <TabNav aria-label="Settings sections" appearance="line">
 *   <TabLink href="?page=power&tab=general" current>General</TabLink>
 *   <TabLink href="?page=power&tab=advanced">Advanced</TabLink>
 * </TabNav>
 */
export function TabNav( {
	children,
	orientation = 'horizontal',
	appearance = orientation === 'vertical' ? 'button' : 'line',
	className,
	...rest
}: TabNavProps ) {
	return (
		<TabNavContext.Provider value={ appearance }>
			<nav
				{ ...rest }
				className={ clsx(
					styles.root,
					styles[ orientation ],
					className
				) }
			>
				<ul
					{ ...listAttributes( orientation, appearance ) }
					className={ styles.list }
				>
					{ children }
				</ul>
			</nav>
		</TabNavContext.Provider>
	);
}

export interface TabLinkProps extends AnchorHTMLAttributes< HTMLAnchorElement > {
	/** Destination of the tab. */
	href: string;
	/** Maps to the Figma `Label` text property. */
	children: ReactNode;
	/**
	 * Marks the tab for the page being shown: `aria-current="page"` plus the
	 * Figma `State = Active` treatment.
	 */
	current?: boolean;
	/** Leading icon. Maps to the Figma `Icon` boolean and `↪ Icon` swap. */
	icon?: ReactNode;
	/**
	 * Trailing badge content, such as a count. Maps to the Figma `Badge`
	 * boolean, coloured as `Tab` colours it.
	 */
	badge?: ReactNode;
}

/**
 * A single link in a `<TabNav>`. Figma calls it `_Tab base`.
 *
 * Always a real `<a>`, like `Link`: pass an `onClick` to hand navigation to a
 * client-side router.
 */
export const TabLink = forwardRef< HTMLAnchorElement, TabLinkProps >(
	function TabLink(
		{ children, current = false, icon, badge, className, ...rest },
		ref
	) {
		const appearance = useContext( TabNavContext );
		if ( ! appearance ) {
			throw new Error( '<TabLink> must be rendered inside <TabNav>.' );
		}
		const currentProps = current
			? { 'aria-current': 'page' as const, 'data-selected': '' }
			: {};

		return (
			<li className={ styles.item }>
				<a
					{ ...rest }
					{ ...currentProps }
					ref={ ref }
					className={ clsx( styles.tab, className ) }
				>
					<TabContent
						appearance={ appearance }
						icon={ icon }
						badge={ badge }
					>
						{ children }
					</TabContent>
				</a>
			</li>
		);
	}
);
