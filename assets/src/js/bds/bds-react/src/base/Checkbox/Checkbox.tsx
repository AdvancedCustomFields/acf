import clsx from 'clsx';
import {
	forwardRef,
	useEffect,
	useId,
	useRef,
	type InputHTMLAttributes,
	type ReactNode,
} from 'react';

import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<
	InputHTMLAttributes< HTMLInputElement >,
	'type' | 'children'
> {
	/**
	 * Inline label. Maps to the Figma `Checkbox with label` component
	 * (`2095:2022`); omit for the bare control.
	 */
	label?: ReactNode;
	/**
	 * Secondary text after the label — "(Private)" in the design. Maps to the
	 * nested Label's `Sub label`. Ignored without `label`.
	 */
	subLabel?: ReactNode;
	/** Supporting text below the label. Maps to that component's `Hint text`. */
	hint?: ReactNode;
	/**
	 * Neither checked nor unchecked. Maps to the Figma `Intermediate` variant.
	 * Set on the DOM node as the native `indeterminate` property — it has no
	 * HTML attribute.
	 */
	indeterminate?: boolean;
	/** Class for the label wrapper. `className` goes on the `<input>`. */
	wrapperClassName?: string;
}

/**
 * A binary selection control supporting checked, unchecked and indeterminate
 * states.
 *
 * Figma: Base Design System — `Checkbox` (`629:8492`), `Checkbox with label`
 * (`2095:2022`).
 *
 * A native `<input type="checkbox">` styled with `appearance: none`, so
 * keyboard behaviour, form participation and the indeterminate state are all
 * the browser's. Figma's Checked / Intermediate / State axes map onto
 * `:checked`, `:indeterminate`, `:hover`, `:focus-visible` and `:disabled`.
 *
 * @example
 * <Checkbox label="Email me updates" />
 * <Checkbox label="Select all" indeterminate />
 * <Checkbox label="Analytics" hint="Anonymous usage data only." />
 * <Checkbox label="Sessions" subLabel="(Private)" />
 */
export const Checkbox = forwardRef< HTMLInputElement, CheckboxProps >(
	function Checkbox(
		{
			label,
			subLabel,
			hint,
			indeterminate = false,
			wrapperClassName,
			className,
			id,
			...rest
		},
		ref
	) {
		const innerRef = useRef< HTMLInputElement >( null );
		const generatedId = useId();
		const inputId = id ?? generatedId;
		const hintId = `${ inputId }-hint`;

		// `indeterminate` is a DOM property, not an attribute — React cannot set it.
		useEffect( () => {
			if ( innerRef.current )
				innerRef.current.indeterminate = indeterminate;
		}, [ indeterminate ] );

		const setRefs = ( node: HTMLInputElement | null ) => {
			innerRef.current = node;
			if ( typeof ref === 'function' ) ref( node );
			else if ( ref ) ref.current = node;
		};

		const input = (
			<input
				{ ...rest }
				ref={ setRefs }
				id={ inputId }
				type="checkbox"
				aria-describedby={
					[ hint ? hintId : null, rest[ 'aria-describedby' ] ]
						.filter( Boolean )
						.join( ' ' ) || undefined
				}
				className={ clsx( styles.checkbox, className ) }
			/>
		);

		if ( ! label ) return input;

		return (
			<div className={ clsx( styles.wrapper, wrapperClassName ) }>
				{ input }
				<label className={ styles.labelText } htmlFor={ inputId }>
					{ subLabel ? (
						<span
							className={ clsx(
								styles.title,
								styles.titleGroup
							) }
						>
							{ label }{ ' ' }
							<span className={ styles.subLabel }>
								{ subLabel }
							</span>
						</span>
					) : (
						<span className={ styles.title }>{ label }</span>
					) }
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

export interface CheckboxGroupProps {
	/** Group label, rendered as the fieldset legend. */
	label?: ReactNode;
	/** Supporting text below the group label. */
	hint?: ReactNode;
	/**
	 * Accessible name for the group when Figma's `Label` is off and the
	 * surrounding UI titles it. Ignored when `label` is set.
	 */
	'aria-label'?: string;
	/**
	 * Id of an element elsewhere that names the group. Ignored when `label`
	 * is set; wins over `aria-label`.
	 */
	'aria-labelledby'?: string;
	children: ReactNode;
	className?: string;
}

/**
 * A stack of checkboxes under a shared label.
 *
 * Figma: Base Design System — `Checkbox group` (`2162:1027`).
 *
 * Renders a `<fieldset>`/`<legend>`, which is what associates the label with
 * the whole group for assistive technology.
 */
export function CheckboxGroup( {
	label,
	hint,
	'aria-label': ariaLabel,
	'aria-labelledby': labelledBy,
	children,
	className,
}: CheckboxGroupProps ) {
	// A visible legend names the fieldset; without one, take the outside name.
	let nameProps = {};
	if ( ! label && labelledBy ) {
		nameProps = { 'aria-labelledby': labelledBy };
	} else if ( ! label && ariaLabel ) {
		nameProps = { 'aria-label': ariaLabel };
	}

	return (
		<fieldset
			{ ...nameProps }
			className={ clsx( styles.group, className ) }
		>
			{ label ? (
				<legend className={ styles.groupLabel }>{ label }</legend>
			) : null }
			{ hint ? (
				<span className={ styles.groupHint }>{ hint }</span>
			) : null }
			<div className={ styles.groupItems }>{ children }</div>
		</fieldset>
	);
}
