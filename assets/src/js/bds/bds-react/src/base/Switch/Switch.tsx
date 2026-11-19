import clsx from 'clsx';
import {
	forwardRef,
	useId,
	type InputHTMLAttributes,
	type ReactNode,
} from 'react';

import styles from './Switch.module.css';

/** Sizes, matching the Figma `Size` variant. */
export const SWITCH_SIZES = [ 'sm', 'md', 'lg' ] as const;

export type SwitchSize = ( typeof SWITCH_SIZES )[ number ];

export interface SwitchProps extends Omit<
	InputHTMLAttributes< HTMLInputElement >,
	'type' | 'size' | 'children'
> {
	/**
	 * Inline label. Maps to the Figma `Switch with label` component
	 * (`2095:2072`); omit for the bare control.
	 */
	label?: ReactNode;
	/** Supporting text below the label. */
	hint?: ReactNode;
	/** Maps to the Figma `Size` variant. */
	size?: SwitchSize;
	/** Class for the label wrapper. `className` goes on the `<input>`. */
	wrapperClassName?: string;
}

/**
 * A binary on/off control. Use for settings that take immediate effect.
 * AKA Toggle.
 *
 * Figma: Base Design System — `Switch` (`857:10680`), `Switch with label`
 * (`2095:2072`).
 *
 * A native `<input type="checkbox">` with `role="switch"`, styled with
 * `appearance: none`. The switch role is what makes a screen reader announce
 * "on"/"off" rather than "checked"/"unchecked", which is the right wording for
 * a setting that applies immediately.
 *
 * Figma's `Toggle` axis is `:checked`; its State axis is the native
 * pseudo-classes. Disabled keeps default track colours at 30% opacity — interim
 * until design adds dedicated disabled tokens.
 *
 * @example
 * <Switch label="Enable analytics" />
 * <Switch label="Maintenance mode" hint="Takes effect immediately." size="lg" />
 */
export const Switch = forwardRef< HTMLInputElement, SwitchProps >(
	function Switch(
		{ label, hint, size = 'md', wrapperClassName, className, id, ...rest },
		ref
	) {
		const generatedId = useId();
		const inputId = id ?? generatedId;
		const hintId = `${ inputId }-hint`;

		const input = (
			<input
				{ ...rest }
				ref={ ref }
				id={ inputId }
				type="checkbox"
				role="switch"
				/*
				 * The built-in hint plus any description the consumer points at
				 * elsewhere (`SectionRow.Label` supporting text, an error).
				 */
				aria-describedby={
					[ hint ? hintId : null, rest[ 'aria-describedby' ] ]
						.filter( Boolean )
						.join( ' ' ) || undefined
				}
				className={ clsx( styles.switch, styles[ size ], className ) }
			/>
		);

		if ( ! label ) return input;

		return (
			<div className={ clsx( styles.wrapper, wrapperClassName ) }>
				{ input }
				<label className={ styles.labelText } htmlFor={ inputId }>
					<span className={ styles.title }>{ label }</span>
					{ hint ? (
						<span className={ styles.hint } id={ hintId }>
							{ hint }
						</span>
					) : null }
				</label>
			</div>
		);
	}
);
