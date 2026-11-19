import { Search, X } from 'lucide-react';
import { useRef, type InputHTMLAttributes, type KeyboardEvent } from 'react';

import styles from './menu.module.css';

export interface MenuSearchProps {
	/** Controlled search text. Omit to leave the field uncontrolled. */
	value?: string | undefined;
	/** Called as the search text changes, and with `''` when cleared. */
	onValueChange?: ( ( value: string ) => void ) | undefined;
	placeholder: string;
	/** Accessible name for the field. */
	label: string;
	/** Shows the trailing clear control. */
	clearable: boolean;
	/** Accessible name for the clear control. */
	clearLabel: string;
	/**
	 * Marks the field as the panel's initial focus. Zag's dismissable layers
	 * look for `[data-autofocus]` before falling back to the first tabbable
	 * element, and that fallback needs layout to decide what is visible.
	 */
	initialFocus?: boolean;
	/**
	 * Extra attributes for the field — the ARIA wiring and key handling a
	 * consumer's list needs. The field's own type, class, name, value and
	 * change handler are not overridable.
	 */
	inputProps?: Omit<
		InputHTMLAttributes< HTMLInputElement >,
		'type' | 'className' | 'value' | 'defaultValue' | 'onChange'
	>;
}

/**
 * The `Search` row of `Dropdown menu` (2162:2115), revealed by its
 * `Searchable` boolean. Shared by every surface that embeds the menu.
 *
 * Not exported from the package.
 */
export function MenuSearch( {
	value,
	onValueChange,
	placeholder,
	label,
	clearable,
	clearLabel,
	initialFocus = false,
	inputProps,
}: MenuSearchProps ) {
	const inputRef = useRef< HTMLInputElement >( null );
	const valueProps = value === undefined ? {} : { value };
	const focusProps = initialFocus ? { 'data-autofocus': '' } : {};

	/*
	 * The menus' panel handlers map Enter and Space to "pick the highlighted
	 * row" and swallow the event, so without this the clear control could not
	 * be pressed from the keyboard. Kept on the button, the keys fall through
	 * to its native click.
	 */
	const keepClearKey = ( event: KeyboardEvent< HTMLButtonElement > ) => {
		if ( event.key === 'Enter' || event.key === ' ' ) {
			event.stopPropagation();
		}
	};

	return (
		<div className={ styles.search }>
			<div className={ styles.searchWrapper }>
				<span className={ styles.searchIcon } aria-hidden="true">
					<Search />
				</span>
				<input
					{ ...inputProps }
					ref={ inputRef }
					type="text"
					className={ styles.searchInput }
					placeholder={ placeholder }
					aria-label={ label }
					{ ...focusProps }
					{ ...valueProps }
					onChange={ ( event ) =>
						onValueChange?.( event.target.value )
					}
				/>
				{ clearable ? (
					<button
						type="button"
						className={ styles.searchClear }
						aria-label={ clearLabel }
						onKeyDown={ keepClearKey }
						onClick={ () => {
							onValueChange?.( '' );
							// Back to the field, ready for the next query.
							inputRef.current?.focus();
						} }
					>
						<X aria-hidden="true" />
					</button>
				) : null }
			</div>
		</div>
	);
}
