import clsx from 'clsx';
import {
	forwardRef,
	useId,
	type InputHTMLAttributes,
	type ReactNode,
} from 'react';

import { HintText } from '../HintText';
import { Label } from '../Label';
import styles from './TextInput.module.css';

/** Sizes, matching the Figma `Size` variant. */
export const TEXT_INPUT_SIZES = [ 'sm', 'md', 'lg' ] as const;

export type TextInputSize = ( typeof TEXT_INPUT_SIZES )[ number ];

export interface TextInputProps extends Omit<
	InputHTMLAttributes< HTMLInputElement >,
	'size' | 'prefix'
> {
	/** Field label. Omit for a control labelled some other way. */
	label?: ReactNode;
	/** Secondary label text, e.g. "(optional)". */
	subLabel?: ReactNode;
	/** Trailing icon on the label, typically a tooltip trigger. */
	labelIcon?: ReactNode;
	/** Supporting text below the field. */
	hint?: ReactNode;
	/** Maps to the Figma `Size` variant. */
	size?: TextInputSize;
	/** Maps to the Figma `Error` state. Also sets `aria-invalid`. */
	invalid?: boolean;
	/** Static text flush to the left of the field, e.g. "https://". */
	prefix?: ReactNode;
	/** Static text flush to the right of the field, e.g. ".com". */
	suffix?: ReactNode;
	/** Icon inside the field, before the text. */
	iconLeading?: ReactNode;
	/** Icon inside the field, after the text. */
	iconTrailing?: ReactNode;
	/** Class for the outer field wrapper. `className` goes on the `<input>`. */
	fieldClassName?: string;
}

/**
 * A single-line field for free-text entry. AKA Text field, Input field.
 *
 * Figma: Base Design System — `Text input` (`3183:170719`).
 *
 * Composes {@link Label} and {@link HintText}, and wires `id`,
 * `aria-describedby` and `aria-invalid` between them so the hint is announced
 * with the field. Figma's `Placeholder` / `Filled` / `Blank` states are just
 * whether the control has a value, so they are not props.
 *
 * This shell is the archetype for the rest of the input family — Number,
 * Password, Date, Time and Credit card reuse it.
 *
 * Testing note: with `required`, the label renders an `aria-hidden` asterisk.
 * The accessible name is unaffected, but Testing Library's `getByLabelText`
 * matches on the label's *text content*, which does include it — so query by
 * role and assert `toHaveAccessibleName` instead.
 *
 * @example
 * <TextInput label="Email address" type="email" required />
 * <TextInput label="Site" prefix="https://" suffix=".com" />
 * <TextInput label="Search" iconLeading={ <Search /> } size="sm" />
 * <TextInput label="Email" invalid hint="Enter a valid address." />
 */
export const TextInput = forwardRef< HTMLInputElement, TextInputProps >(
	function TextInput(
		{
			label,
			subLabel,
			labelIcon,
			hint,
			size = 'md',
			invalid = false,
			prefix,
			suffix,
			iconLeading,
			iconTrailing,
			fieldClassName,
			className,
			id,
			required,
			'aria-describedby': describedBy,
			...rest
		},
		ref
	) {
		const generatedId = useId();
		const inputId = id ?? generatedId;
		const hintId = `${ inputId }-hint`;

		const describedByIds =
			[ hint ? hintId : null, describedBy ]
				.filter( Boolean )
				.join( ' ' ) || undefined;

		return (
			<div
				className={ clsx(
					styles.field,
					styles[ size ],
					invalid && styles.invalid,
					fieldClassName
				) }
			>
				{ label ? (
					<Label
						htmlFor={ inputId }
						required={ required ?? false }
						subLabel={ subLabel }
						icon={ labelIcon }
					>
						{ label }
					</Label>
				) : null }

				<div className={ styles.container }>
					{ prefix ? (
						<span className={ clsx( styles.affix, styles.prefix ) }>
							{ prefix }
						</span>
					) : null }

					<div className={ styles.inputContainer }>
						{ iconLeading ? (
							<span className={ styles.icon } aria-hidden="true">
								{ iconLeading }
							</span>
						) : null }
						<input
							{ ...rest }
							ref={ ref }
							id={ inputId }
							required={ required }
							aria-invalid={ invalid || undefined }
							aria-describedby={ describedByIds }
							className={ clsx( styles.input, className ) }
						/>
						{ iconTrailing ? (
							<span className={ styles.icon } aria-hidden="true">
								{ iconTrailing }
							</span>
						) : null }
					</div>

					{ suffix ? (
						<span className={ clsx( styles.affix, styles.suffix ) }>
							{ suffix }
						</span>
					) : null }
				</div>

				{ hint ? (
					<HintText id={ hintId } size="sm">
						{ hint }
					</HintText>
				) : null }
			</div>
		);
	}
);
