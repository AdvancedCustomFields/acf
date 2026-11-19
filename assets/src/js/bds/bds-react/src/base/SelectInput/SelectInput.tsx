import { createListCollection } from '@ark-ui/react/collection';
import { Portal } from '@ark-ui/react/portal';
import {
	useSelect,
	type UseSelectProps,
	type UseSelectReturn,
} from '@ark-ui/react/select';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import {
	useId,
	useMemo,
	useState,
	type KeyboardEvent,
	type ReactNode,
} from 'react';

import { DropdownItem } from '../DropdownItem';
import {
	INPUT_MODALITY_ATTR,
	useInputModality,
} from '../menu/useInputModality';
import { filterByLabel, scrollRowIntoList } from '../menu/collection';
import { MenuSearch } from '../menu/MenuSearch';
import { HintText } from '../HintText';
import { Label } from '../Label';
import { usePortaledBdsTheme } from '../theme/usePortaledBdsTheme';

import styles from './SelectInput.module.css';

/** Sizes, matching the Figma `Size` variant. */
export const SELECT_INPUT_SIZES = [ 'sm', 'md', 'lg' ] as const;

export type SelectInputSize = ( typeof SELECT_INPUT_SIZES )[ number ];

export interface SelectInputItem {
	/** The value reported to `onValueChange` and submitted with the form. */
	value: string;
	/** The row's text, and the text shown in the closed field once chosen. */
	label: string;
	/** Leading icon for the row. */
	icon?: ReactNode;
	/** Makes the row unselectable. */
	disabled?: boolean;
}

export interface SelectInputProps {
	/** The choices. Rendered as `Dropdown item`s in the floating list. */
	items: SelectInputItem[];
	/** Field label. Maps to the Figma `Label` boolean. Omit to hide it. */
	label?: ReactNode;
	/**
	 * Accessible name when `label` is omitted because the surrounding UI
	 * already titles the field. Ignored when `label` is set.
	 */
	'aria-label'?: string;
	/**
	 * Id of an element elsewhere that names the field, for when the
	 * surrounding UI renders its own label. Ignored when `label` is set; wins
	 * over `aria-label`.
	 */
	'aria-labelledby'?: string;
	/** Secondary label text, e.g. "(optional)". */
	subLabel?: ReactNode;
	/** Trailing icon on the label, typically a tooltip trigger. */
	labelIcon?: ReactNode;
	/** Supporting text below the field. Maps to the Figma `Hint text` boolean. */
	hint?: ReactNode;
	/** Text shown when nothing is selected. Maps to Figma's `Input text`. */
	placeholder?: string;
	/** Maps to the Figma `Size` variant. */
	size?: SelectInputSize;
	/** Maps to the Figma `Error` state. Also sets `aria-invalid`. */
	invalid?: boolean;
	/** Maps to the Figma `Disabled` state. */
	disabled?: boolean;
	/** Marks the field required, on both the label and the control. */
	required?: boolean;
	/** Icon inside the field, before the value. Maps to `Icon leading`. */
	iconLeading?: ReactNode;
	/** Controlled selected value. */
	value?: string | null;
	/** Uncontrolled initial selected value. */
	defaultValue?: string;
	/** Called with the newly selected value, or `null` once cleared. */
	onValueChange?: ( value: string | null ) => void;
	/** Controlled open state. Maps to the Figma `Open` state. */
	open?: boolean;
	/** Called when the list opens or closes. */
	onOpenChange?: ( open: boolean ) => void;
	/**
	 * Shows a search row above the list and filters the items by label as the
	 * reader types. Maps to the `Searchable` boolean on the embedded
	 * `Dropdown menu`. The query is cleared each time the list closes.
	 */
	searchable?: boolean;
	/**
	 * Placeholder for the search field.
	 *
	 * @default 'Search...'
	 */
	searchPlaceholder?: string;
	/**
	 * Accessible name for the search field.
	 *
	 * @default 'Search'
	 */
	searchLabel?: string;
	/**
	 * Shows a clear control at the trailing edge of the search row. Maps to
	 * the embedded `Dropdown menu`'s `↪ Search clear action` boolean, so it
	 * does nothing unless `searchable` is set.
	 */
	searchClearable?: boolean;
	/**
	 * Accessible name for the clear control.
	 *
	 * @default 'Clear search'
	 */
	searchClearLabel?: string;
	/**
	 * Shown in place of the list when the search matches nothing. A function
	 * receives the trimmed query, to name it in the message as Figma does.
	 *
	 * @default ( query ) => `No results for ‘${ query }’`
	 */
	emptyMessage?: ReactNode | ( ( query: string ) => ReactNode );
	/** Name for form submission. Renders a hidden native `<select>`. */
	name?: string;
	/**
	 * Id for the trigger, so an outside `<Label htmlFor>` can point at it. The
	 * built-in label and hint are wired to it either way.
	 */
	id?: string;
	/** Class for the outer field wrapper. */
	className?: string;
}

type SelectMachineOptions = {
	triggerId: string | undefined;
	rootId: string;
	items: SelectInputItem[];
	searchable: boolean;
	disabled: boolean;
	invalid: boolean;
	required: boolean;
	name?: string | undefined;
	open?: boolean | undefined;
	value?: string | null | undefined;
	defaultValue?: string | undefined;
	onValueChange?: ( ( value: string | null ) => void ) | undefined;
	onOpenChange?: ( ( open: boolean ) => void ) | undefined;
};

function useSelectInputApi( {
	rootId,
	triggerId,
	items,
	searchable,
	disabled,
	invalid,
	required,
	name,
	open,
	value,
	defaultValue,
	onValueChange,
	onOpenChange,
}: SelectMachineOptions ): UseSelectReturn< SelectInputItem > {
	const collection = useMemo(
		() =>
			createListCollection( {
				items,
				itemToValue: ( item ) => item.value,
				itemToString: ( item ) => item.label,
				isItemDisabled: ( item ) => item.disabled === true,
			} ),
		[ items ]
	);

	const props: UseSelectProps< SelectInputItem > = {
		id: rootId,
		collection,
		/*
		 * Composite puts `role="listbox"` on the panel itself. A searchable
		 * panel also holds the search field, which a listbox may not contain,
		 * so the role moves down onto the list and the panel becomes the
		 * dialog around it.
		 */
		composite: ! searchable,
		scrollToIndexFn: scrollRowIntoList,
		disabled,
		invalid,
		required,
	};
	if ( triggerId !== undefined ) {
		props.ids = { trigger: triggerId };
	}
	if ( name !== undefined ) {
		props.name = name;
	}
	if ( open !== undefined ) {
		props.open = open;
	}
	if ( value !== undefined ) {
		props.value = value === null ? [] : [ value ];
	}
	if ( defaultValue !== undefined ) {
		props.defaultValue = [ defaultValue ];
	}
	if ( onValueChange ) {
		props.onValueChange = ( details ) =>
			onValueChange( details.value[ 0 ] ?? null );
	}
	if ( onOpenChange ) {
		props.onOpenChange = ( details ) => onOpenChange( details.open );
	}

	return useSelect( props );
}

type AccessibleNameProps =
	| Record< string, never >
	| { 'aria-label': string; 'aria-labelledby': undefined }
	| { 'aria-labelledby': string };

/**
 * Zag points the trigger and listbox `aria-labelledby` at the label element
 * even when no label is rendered, so an outside name has to replace that
 * reference (`aria-labelledby`) or drop it (`aria-label`), or an empty label
 * would win.
 */
function accessibleNameProps(
	label: ReactNode,
	ariaLabel: string | undefined,
	labelledBy: string | undefined
): AccessibleNameProps {
	if ( label ) {
		return {};
	}
	if ( labelledBy ) {
		return { 'aria-labelledby': labelledBy };
	}
	if ( ariaLabel ) {
		return { 'aria-label': ariaLabel, 'aria-labelledby': undefined };
	}
	return {};
}

/** Everything the panel needs to draw and drive the search row. */
type SelectInputSearch = {
	query: string;
	/**
	 * The name for the list, which non-composite carries `role="listbox"`.
	 * Zag points it at the trigger, but with a visible label the trigger is
	 * itself named by reference, which `aria-labelledby` does not follow — so
	 * the list would take the trigger's text (the value) as its name.
	 */
	listName: AccessibleNameProps;
	onQueryChange: ( query: string ) => void;
	placeholder: string;
	label: string;
	clearable: boolean;
	clearLabel: string;
	emptyMessage: ReactNode | ( ( query: string ) => ReactNode );
	listId: string;
};

/*
 * Keys the search field keeps for itself. Zag's panel handler treats Space as
 * "select the highlighted row" and Home/End as list navigation, which would
 * stop a reader typing a space or moving the caret. Arrows, Enter and Escape
 * still reach it, so the list stays drivable from the field.
 */
const SEARCH_OWN_KEYS = new Set( [ ' ', 'Home', 'End' ] );

/**
 * Keeps typing in the search field from driving the list when it should not.
 *
 * - An IME composition owns every key until it commits: Enter there confirms
 *   the candidate and the arrows pick one, and Zag's panel handler does not
 *   check `isComposing`.
 * - Enter with no highlighted row (no matches, or the pointer just left a row)
 *   would still close the panel through Zag's `ITEM.CLICK` — selecting
 *   nothing and throwing the query away.
 */
function keepSearchKey(
	event: KeyboardEvent< HTMLInputElement >,
	hasHighlight: boolean
) {
	if ( event.nativeEvent.isComposing || SEARCH_OWN_KEYS.has( event.key ) ) {
		event.stopPropagation();
		return;
	}
	if ( event.key === 'Enter' && ! hasHighlight ) {
		event.preventDefault();
		event.stopPropagation();
	}
}

/**
 * The embedded `Dropdown menu`'s `Search` row, focused as the panel opens.
 * The field is the
 * combobox for the list below it: it owns `aria-activedescendant`, so a screen
 * reader announces the highlighted row while focus stays in the field.
 */
function SelectInputSearchRow( {
	api,
	search,
}: {
	api: UseSelectReturn< SelectInputItem >;
	search: SelectInputSearch;
} ) {
	/*
	 * Non-composite, Zag computes the highlighted row's id for the list; the
	 * field needs the same reference, because it is what holds focus.
	 */
	const activeDescendant = api.getListProps()[ 'aria-activedescendant' ];

	return (
		<MenuSearch
			value={ search.query }
			onValueChange={ search.onQueryChange }
			placeholder={ search.placeholder }
			label={ search.label }
			clearable={ search.clearable }
			clearLabel={ search.clearLabel }
			initialFocus
			inputProps={ {
				role: 'combobox',
				'aria-expanded': true,
				'aria-controls': search.listId,
				'aria-autocomplete': 'list',
				'aria-activedescendant': activeDescendant,
				autoComplete: 'off',
				onKeyDown: ( event: KeyboardEvent< HTMLInputElement > ) =>
					keepSearchKey( event, api.highlightedValue !== null ),
			} }
		/>
	);
}

function defaultEmptyMessage( query: string ): string {
	return `No results for ‘${ query }’`;
}

/**
 * Body-portaled listbox. Mounted only while open so Modal `aria-hidden` does
 * not trap an always-present portal node.
 */
function SelectInputPortal( {
	api,
	items,
	theme,
	nameProps,
	search,
}: {
	api: UseSelectReturn< SelectInputItem >;
	items: SelectInputItem[];
	theme: string | undefined;
	nameProps: AccessibleNameProps;
	search: SelectInputSearch | null;
} ) {
	const modality = useInputModality();
	const isEmpty = search !== null && items.length === 0;
	const query = search ? search.query.trim() : '';
	let emptyText: ReactNode = null;
	if ( search && isEmpty && query ) {
		emptyText =
			typeof search.emptyMessage === 'function'
				? search.emptyMessage( query )
				: search.emptyMessage;
	}

	return (
		<Portal>
			<div data-bds-theme={ theme }>
				<div
					{ ...api.getPositionerProps() }
					className={ styles.positioner }
				>
					<div
						{ ...api.getContentProps() }
						{ ...nameProps }
						{ ...{ [ INPUT_MODALITY_ATTR ]: modality } }
						className={ styles.popover }
					>
						{ search ? (
							<SelectInputSearchRow
								api={ api }
								search={ search }
							/>
						) : null }
						<div
							{ ...api.getListProps() }
							{ ...( search
								? { id: search.listId, ...search.listName }
								: {} ) }
							hidden={ isEmpty }
							className={ styles.list }
						>
							{ items.map( ( item ) => {
								const state = api.getItemState( { item } );
								return (
									<DropdownItem
										key={ item.value }
										{ ...api.getItemProps( { item } ) }
										icon={ item.icon }
										highlighted={ state.selected }
										disabled={ state.disabled }
									>
										{ item.label }
									</DropdownItem>
								);
							} ) }
						</div>
						{ search ? (
							/*
							 * Beside the list, not in it: a listbox may only
							 * hold options. An `<output>` (implicitly a polite
							 * `status` region: the result of the search) mounted
							 * for as long as the search row is, empty until
							 * nothing matches, because a live region inserted
							 * already filled is often not announced.
							 */
							<output
								className={
									emptyText ? styles.empty : styles.status
								}
							>
								{ emptyText }
							</output>
						) : null }
					</div>
				</div>
			</div>
		</Portal>
	);
}

/**
 * A select input for choosing a single value from a list. AKA Dropdown.
 *
 * Figma: Base Design System — `Select input` (`3196:173592`), whose open state
 * embeds `Dropdown menu` (`2162:2115`) with `Preset=Select`.
 *
 * The closed field is the same shell as Text input — identical container,
 * padding and heights — so it composes `field.module.css`. Figma's
 * `Placeholder` / `Filled` states are just whether a value is set, and `Open`
 * is the list's open state, so neither is a prop.
 *
 * Behaviour comes from Ark UI's `useSelect`: listbox semantics, typeahead,
 * arrow-key navigation and outside-click dismissal. We render our own elements
 * rather than Ark's `Select.*` components so the markup stays minimal and the
 * props stay strictly typed — Ark's polymorphic props don't satisfy
 * `exactOptionalPropertyTypes`.
 *
 * `searchable` turns on the embedded menu's `Searchable` row and filters the
 * items by label as the reader types — unlike `DropdownMenu`, which leaves
 * filtering to its consumer, because a select owns its items. The list is
 * capped at seven and a half rows, the cut-off row showing that it scrolls.
 *
 * @example
 * <SelectInput label="Region" items={ regions } placeholder="Choose a region" />
 * <SelectInput label="Plan" items={ plans } defaultValue="pro" size="lg" />
 * <SelectInput label="Region" items={ regions } invalid hint="Pick a region." />
 * <SelectInput aria-label="Region" items={ regions } />
 * <SelectInput label="Site" items={ sites } searchable />
 */
export function SelectInput( {
	items,
	label,
	'aria-label': ariaLabel,
	'aria-labelledby': labelledBy,
	subLabel,
	labelIcon,
	hint,
	placeholder = 'Select an option',
	size = 'md',
	invalid = false,
	disabled = false,
	required = false,
	iconLeading,
	value,
	defaultValue,
	onValueChange,
	open,
	onOpenChange,
	searchable = false,
	searchPlaceholder = 'Search...',
	searchLabel = 'Search',
	searchClearable = false,
	searchClearLabel = 'Clear search',
	emptyMessage = defaultEmptyMessage,
	name,
	id,
	className,
}: SelectInputProps ) {
	const generatedId = useId();
	const rootId = id ?? generatedId;
	const hintId = `${ rootId }-hint`;

	const [ query, setQuery ] = useState( '' );
	const visible = useMemo(
		() => ( searchable ? filterByLabel( items, query ) : items ),
		[ items, query, searchable ]
	);

	const api = useSelectInputApi( {
		rootId,
		triggerId: id,
		items: visible,
		searchable,
		disabled,
		invalid,
		required,
		name,
		open,
		value,
		defaultValue,
		onValueChange,
		onOpenChange,
	} );

	/*
	 * Clear the query whenever the list opens or closes, however that happens
	 * — a selection, Escape, an outside click, or a controlled `open`. Adjusted
	 * during render rather than in an effect so the reopened list never paints
	 * a stale filter first.
	 */
	const [ queryOpen, setQueryOpen ] = useState( api.open );
	if ( api.open !== queryOpen ) {
		setQueryOpen( api.open );
		setQuery( '' );
	}

	const onQueryChange = ( next: string ) => {
		setQuery( next );
		// Keep the cursor on a row that is still listed, so Enter picks the
		// top match rather than a row the filter has just hidden.
		const first = filterByLabel( items, next ).find(
			( item ) => item.disabled !== true
		);
		if ( first ) {
			api.setHighlightValue( first.value );
		} else {
			api.clearHighlightValue();
		}
	};

	const nameProps = accessibleNameProps( label, ariaLabel, labelledBy );

	const search: SelectInputSearch | null = searchable
		? {
				query,
				listName: label
					? { 'aria-labelledby': api.getLabelProps().id ?? '' }
					: nameProps,
				onQueryChange,
				placeholder: searchPlaceholder,
				label: searchLabel,
				clearable: searchClearable,
				clearLabel: searchClearLabel,
				emptyMessage,
				listId: `${ rootId }-search-list`,
			}
		: null;

	/*
	 * Resolved against every item, not Zag's `selectedItems`: with a
	 * controlled `value`, Zag derives those from the filtered collection, so
	 * the field would fall back to the placeholder while the search hides the
	 * chosen row.
	 */
	const selectedValue = api.value[ 0 ];
	const selected =
		selectedValue === undefined
			? undefined
			: items.find( ( item ) => item.value === selectedValue );
	const { hostRef, theme } = usePortaledBdsTheme< HTMLDivElement >(
		api.open
	);

	return (
		<div
			ref={ hostRef }
			{ ...api.getRootProps() }
			className={ clsx(
				styles.field,
				styles[ size ],
				invalid && styles.invalid,
				className
			) }
		>
			{ label ? (
				<Label
					{ ...api.getLabelProps() }
					required={ required }
					subLabel={ subLabel }
					icon={ labelIcon }
				>
					{ label }
				</Label>
			) : null }

			<button
				{ ...api.getTriggerProps() }
				/*
				 * Zag's trigger props already carry this; stating it keeps a
				 * reader (and a static analyser) from having to know that, and
				 * a select trigger inside a form must never be a submit.
				 */
				type="button"
				className={ styles.container }
				{ ...nameProps }
				/*
				 * Searchable, the popup is a dialog holding the search field
				 * and the list, not the listbox Zag's trigger props announce.
				 */
				{ ...( searchable
					? { 'aria-haspopup': 'dialog' as const }
					: {} ) }
				{ ...( hint ? { 'aria-describedby': hintId } : {} ) }
			>
				<span className={ styles.inputContainer }>
					{ iconLeading ? (
						<span className={ styles.icon } aria-hidden="true">
							{ iconLeading }
						</span>
					) : null }
					<span
						{ ...api.getValueTextProps() }
						className={ clsx(
							styles.value,
							! selected && styles.placeholder
						) }
					>
						{ selected ? selected.label : placeholder }
					</span>
					<span
						{ ...api.getIndicatorProps() }
						className={ styles.indicator }
						aria-hidden="true"
					>
						<ChevronDown />
					</span>
				</span>
			</button>

			{ api.open ? (
				<SelectInputPortal
					api={ api }
					items={ visible }
					theme={ theme }
					nameProps={ nameProps }
					search={ search }
				/>
			) : null }

			{ name ? (
				<select { ...api.getHiddenSelectProps() }>
					<option value="" />
					{ items.map( ( item ) => (
						<option key={ item.value } value={ item.value }>
							{ item.label }
						</option>
					) ) }
				</select>
			) : null }

			{ hint ? (
				<HintText id={ hintId } size="sm">
					{ hint }
				</HintText>
			) : null }
		</div>
	);
}
