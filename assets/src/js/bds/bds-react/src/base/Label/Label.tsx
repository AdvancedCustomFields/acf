import clsx from 'clsx';
import type { LabelHTMLAttributes, ReactNode } from 'react';

import styles from './Label.module.css';

export interface LabelProps extends LabelHTMLAttributes< HTMLLabelElement > {
	/** The field label. Maps to the Figma `Field label` property. */
	children: ReactNode;
	/**
	 * Marks the field as required with an asterisk. Maps to the Figma `Required`
	 * property.
	 */
	required?: boolean;
	/**
	 * Secondary text after the label — "(optional)" in the design. Maps to the
	 * Figma `Sub label` property.
	 */
	subLabel?: ReactNode;
	/**
	 * Trailing icon, typically a tooltip trigger explaining the field. Maps to
	 * the Figma `Icon trailing` property, whose default is Lucide `info`.
	 *
	 * Rendered beside the `<label>`, not inside it, so it may be interactive
	 * (a `Tooltip` around an `IconButton`) without nesting a button in a label
	 * or leaking into the control's name. A bare Lucide icon hides itself from
	 * assistive technology; give anything else `aria-hidden` if it is purely
	 * decorative.
	 */
	icon?: ReactNode;
}

/**
 * A text label for a form input, with support for required and tooltip
 * indicators.
 *
 * Figma: Base Design System — `Label` (`1749:3222`).
 *
 * Renders a native `<label>`, so pass `htmlFor` to associate it with its
 * control. With an `icon`, the label and the icon sit side by side in a `<span>`
 * that takes `className`; every other prop still goes to the `<label>`.
 *
 * `required` draws the asterisk only. The asterisk is `aria-hidden`, because
 * requiredness is conveyed by the control's own `required` / `aria-required`
 * attribute — announcing it here as well would duplicate it. Set both.
 *
 * @example
 * <Label htmlFor="email" required>Email address</Label>
 * <Label htmlFor="nickname" subLabel="(optional)">Nickname</Label>
 * <Label htmlFor="key" icon={ <Info /> }>API key</Label>
 * <Label
 *   htmlFor="greeting"
 *   icon={
 *     <Tooltip content="Shown to signed-in visitors">
 *       <IconButton icon={ <Info /> } label="About greetings" size="xs" variant="ghost" />
 *     </Tooltip>
 *   }
 * >
 *   Greeting
 * </Label>
 */
export function Label( {
	children,
	required = false,
	subLabel,
	icon,
	className,
	...rest
}: LabelProps ) {
	const text = (
		<>
			{ children }
			{ required ? (
				<span className={ styles.required } aria-hidden="true">
					*
				</span>
			) : null }
			{ subLabel ? (
				<span className={ styles.subLabel }>{ subLabel }</span>
			) : null }
		</>
	);

	if ( ! icon ) {
		return (
			<label { ...rest } className={ clsx( styles.label, className ) }>
				<span className={ styles.group }>{ text }</span>
			</label>
		);
	}

	return (
		<span className={ clsx( styles.label, className ) }>
			<label { ...rest } className={ styles.group }>
				{ text }
			</label>
			<span className={ styles.icon }>{ icon }</span>
		</span>
	);
}
