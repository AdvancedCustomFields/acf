import clsx from 'clsx';
import { Check } from 'lucide-react';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { Checkbox } from '../Checkbox';
import { Separator } from '../Separator';
import { Switch } from '../Switch';

import styles from './DropdownItem.module.css';

/**
 * Row treatments, matching the Figma `Item type` variant.
 *
 * Figma writes the last one `Group title`; kebab-case is the value here because
 * a prop value cannot carry a space.
 */
export const DROPDOWN_ITEM_TYPES = [
	'basic',
	'checkbox',
	'switch',
	'user',
	'divider',
	'group-title',
] as const;

export type DropdownItemType = ( typeof DROPDOWN_ITEM_TYPES )[ number ];

export interface DropdownItemProps extends Omit<
	HTMLAttributes< HTMLDivElement >,
	'children'
> {
	/** Maps to the Figma `Item type` variant. */
	type?: DropdownItemType;
	/** Row text. Maps to the Figma `Label` / `Group title` text properties. */
	children?: ReactNode;
	/** Leading icon. Maps to the Figma `Leading Icon` boolean. */
	icon?: ReactNode;
	/**
	 * Maps to the Figma `Highlighted` variant — the *selected* row, drawn with
	 * the secondary surface and a trailing check.
	 */
	highlighted?: boolean;
	/**
	 * Draw the trailing check without the surface — the selected row, for a
	 * context that already spends `bg-secondary` on something else.
	 *
	 * That context is a menu: Ark's roving cursor lands as `data-highlighted`
	 * for pointer and keyboard alike and takes the same `bg-secondary`, so a
	 * selected row using the full `Highlighted` variant would be
	 * indistinguishable from the row the reader is simply on. The check alone
	 * carries it, which is what the Coworker library's own composites draw.
	 *
	 * Implied by {@link DropdownItemProps.highlighted}. Reach for this through
	 * `DropdownMenuItem`'s `selected` rather than directly.
	 */
	check?: boolean;
	/**
	 * State of the row's Checkbox or Switch, for those item types. The control
	 * is decorative: the row is the control, so the state is mirrored onto it
	 * rather than owned by the inner input.
	 */
	checked?: boolean;
	/** Dims the row and blocks pointer interaction. */
	disabled?: boolean;
	/** Avatar for `type="user"`. */
	avatar?: ReactNode;
	/** Secondary line for `type="user"` — an email address in the design. */
	description?: ReactNode;
}

/**
 * An individual row within a dropdown menu.
 *
 * Figma: Base Design System — `Dropdown item` (`1719:3136`).
 *
 * Presentational on purpose: it carries no interaction of its own so that a
 * `Menu`, a `Select` listbox and a `Combobox` listbox can each spread their own
 * item props onto it. Figma's `State` axis (Default / Hover / Focus) is CSS
 * state; Ark's roving cursor arrives as `data-highlighted`, which fills the row
 * for both pointer and keyboard but only draws the focus ring while the
 * keyboard is driving.
 *
 * The Checkbox and Switch item types render the real components but make them
 * inert — the row itself is the control, so a nested focusable input would be a
 * second tab stop announcing the same thing.
 *
 * @example
 * <DropdownItem icon={ <Sparkles /> }>Item label</DropdownItem>
 * <DropdownItem highlighted>Selected item</DropdownItem>
 * <DropdownItem type="checkbox" checked>Include drafts</DropdownItem>
 * <DropdownItem type="group-title">Group title</DropdownItem>
 * <DropdownItem type="divider" />
 */
/*
 * The trailing check. Two rows draw it — the plain row and the user row — so it
 * is one component rather than the same conditional written twice.
 */
function CheckMark( { shown }: { shown: boolean } ) {
	if ( ! shown ) {
		return null;
	}
	return (
		<span className={ styles.check } aria-hidden="true">
			<Check />
		</span>
	);
}

/*
 * The trailing control on the `checkbox` and `switch` types. Both are
 * `aria-hidden` and untabbable: the row itself carries the state and the
 * interaction, and the control is the picture of it.
 */
function RowControl( {
	type,
	checked,
}: {
	type: DropdownItemType;
	checked: boolean;
} ) {
	if ( type === 'checkbox' ) {
		return (
			<span className={ styles.control } aria-hidden="true">
				<Checkbox checked={ checked } readOnly tabIndex={ -1 } />
			</span>
		);
	}
	if ( type === 'switch' ) {
		return (
			<span className={ styles.control } aria-hidden="true">
				<Switch checked={ checked } readOnly tabIndex={ -1 } />
			</span>
		);
	}
	return null;
}

export const DropdownItem = forwardRef< HTMLDivElement, DropdownItemProps >(
	function DropdownItem(
		{
			type = 'basic',
			children,
			icon,
			highlighted = false,
			check = false,
			checked = false,
			disabled = false,
			avatar,
			description,
			className,
			...rest
		},
		ref
	) {
		if ( type === 'divider' ) {
			return (
				<div
					{ ...rest }
					ref={ ref }
					className={ clsx( styles.divider, className ) }
				>
					<Separator appearance="subtle" />
				</div>
			);
		}

		if ( type === 'group-title' ) {
			return (
				<div
					{ ...rest }
					ref={ ref }
					className={ clsx( styles.groupTitle, className ) }
				>
					{ children }
				</div>
			);
		}

		const disabledAttrs = disabled ? { 'data-disabled': '' } : {};

		const rowClassName = clsx(
			styles.item,
			type === 'user' && styles.user,
			highlighted && styles.selected,
			className
		);

		if ( type === 'user' ) {
			return (
				<div
					{ ...rest }
					ref={ ref }
					className={ rowClassName }
					{ ...disabledAttrs }
				>
					{ avatar }
					<span className={ styles.userDetails }>
						<span className={ styles.userName }>{ children }</span>
						{ description ? (
							<span className={ styles.userDescription }>
								{ description }
							</span>
						) : null }
					</span>
					<CheckMark shown={ highlighted || check } />
				</div>
			);
		}

		return (
			<div
				{ ...rest }
				ref={ ref }
				className={ rowClassName }
				{ ...disabledAttrs }
			>
				<span className={ styles.wrapper }>
					{ icon ? (
						<span className={ styles.icon } aria-hidden="true">
							{ icon }
						</span>
					) : null }
					<span className={ styles.label }>{ children }</span>
				</span>

				<RowControl type={ type } checked={ checked } />

				<CheckMark shown={ highlighted || check } />
			</div>
		);
	}
);
