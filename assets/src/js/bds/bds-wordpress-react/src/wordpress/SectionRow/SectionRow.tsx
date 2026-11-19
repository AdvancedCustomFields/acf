import clsx from 'clsx';
import type { FC, HTMLAttributes, ReactNode } from 'react';

import styles from './SectionRow.module.css';

export interface SectionRowLabelProps extends HTMLAttributes< HTMLDivElement > {
	/** The row's label. Maps to the Figma `Label` property. */
	label: ReactNode;
	/** Text below the label. Maps to the Figma `Supporting text` property. */
	supportingText?: ReactNode | undefined;
	/**
	 * Shows the required indicator. Maps to the Figma `Required` property.
	 * Still set `required` on the control itself — this only marks the label.
	 */
	required?: boolean | undefined;
	/**
	 * Announced in place of the visual asterisk when {@link required} is set.
	 * Pass a translated string.
	 *
	 * @default 'required'
	 */
	requiredLabel?: string | undefined;
	/**
	 * Id of the control the label names. Set it when the content area holds a
	 * single native labelable control (a `TextInput`'s input) and the label
	 * renders as a `<label>`. Otherwise leave it unset and point the control's
	 * `aria-labelledby` at {@link labelId}, or give the control a matching
	 * `aria-label` (`SelectInput`, whose trigger id is derived).
	 */
	htmlFor?: string | undefined;
	/** Id for the label, for a control's `aria-labelledby`. */
	labelId?: string | undefined;
	/** Id for the supporting text, for a control's `aria-describedby`. */
	supportingTextId?: string | undefined;
}

export interface SectionRowContentAreaProps extends HTMLAttributes< HTMLDivElement > {
	/** The row's controls. Maps to the Figma `Content area` slot. */
	children?: ReactNode;
}

export interface SectionRowProps extends HTMLAttributes< HTMLDivElement > {
	/**
	 * The content area's children when {@link label} is set; otherwise a
	 * `SectionRow.Label` and a `SectionRow.ContentArea`, for rows that need
	 * props on either part.
	 */
	children?: ReactNode;
	/**
	 * Shorthand: the row builds `SectionRow.Label` from this and the label
	 * props, and wraps `children` in `SectionRow.ContentArea`.
	 */
	label?: ReactNode;
	/** Shorthand: see {@link SectionRowLabelProps.supportingText}. */
	supportingText?: SectionRowLabelProps[ 'supportingText' ];
	/** Shorthand: see {@link SectionRowLabelProps.required}. */
	required?: SectionRowLabelProps[ 'required' ];
	/** Shorthand: see {@link SectionRowLabelProps.requiredLabel}. */
	requiredLabel?: SectionRowLabelProps[ 'requiredLabel' ];
	/** Shorthand: see {@link SectionRowLabelProps.htmlFor}. */
	htmlFor?: SectionRowLabelProps[ 'htmlFor' ];
	/** Shorthand: see {@link SectionRowLabelProps.labelId}. */
	labelId?: SectionRowLabelProps[ 'labelId' ];
	/** Shorthand: see {@link SectionRowLabelProps.supportingTextId}. */
	supportingTextId?: SectionRowLabelProps[ 'supportingTextId' ];
}

/**
 * The label column of a {@link SectionRow}: label, optional required
 * indicator and supporting text on the secondary surface.
 *
 * Figma: WordPress Component Library — `_Section row label` (`2031:287`), an
 * internal part of `Section row`.
 */
export function SectionRowLabel( {
	label,
	supportingText,
	required = false,
	requiredLabel = 'required',
	htmlFor,
	labelId,
	supportingTextId,
	className,
	children,
	...rest
}: SectionRowLabelProps ) {
	const LabelElement = htmlFor ? 'label' : 'span';

	return (
		<div { ...rest } className={ clsx( styles.label, className ) }>
			<LabelElement
				id={ labelId }
				htmlFor={ htmlFor }
				className={ styles.labelRow }
			>
				<span className={ styles.labelText }>{ label }</span>
				{ required ? (
					<>
						{ /* Separates the words in the accessible name; a flex
						container drops it from layout, so it adds no gap. */ }{ ' ' }
						<span className={ styles.required }>
							<span aria-hidden="true">*</span>
							<span className={ styles.visuallyHidden }>
								{ `(${ requiredLabel })` }
							</span>
						</span>
					</>
				) : null }
			</LabelElement>
			{ supportingText ? (
				<p id={ supportingTextId } className={ styles.supportingText }>
					{ supportingText }
				</p>
			) : null }
			{ children }
		</div>
	);
}

/**
 * The content column of a {@link SectionRow}: the slot for the row's
 * controls.
 */
export function SectionRowContentArea( {
	children,
	className,
	...rest
}: SectionRowContentAreaProps ) {
	return (
		<div { ...rest } className={ clsx( styles.contentArea, className ) }>
			{ children }
		</div>
	);
}

export interface SectionRowComponent extends FC< SectionRowProps > {
	Label: typeof SectionRowLabel;
	ContentArea: typeof SectionRowContentArea;
}

/**
 * A settings row: a label column (label, required indicator, supporting text)
 * beside a content area that takes any control. Rows divide with a subtle
 * rule, and stack the label over the content area when the row is narrower
 * than the two columns need.
 *
 * Figma: WordPress Component Library — `Section row` (`2031:607`). Place rows
 * in a {@link Section} with `padding="none"` so they run edge to edge and sit
 * flush against each other.
 *
 * @example
 * <Section title="General" padding="none">
 *   <SectionRow label="Site name" htmlFor="site-name" required>
 *     <TextInput id="site-name" required />
 *   </SectionRow>
 *   <SectionRow label="Model" supportingText="Used for new graphs.">
 *     <SelectInput aria-label="Model" items={ models } />
 *   </SectionRow>
 *   <SectionRow>
 *     <SectionRow.Label label="Post types" labelId="types" />
 *     <SectionRow.ContentArea role="group" aria-labelledby="types">
 *       <Checkbox label="Posts" />
 *     </SectionRow.ContentArea>
 *   </SectionRow>
 * </Section>
 */
export const SectionRow = ( ( {
	children,
	label,
	supportingText,
	required,
	requiredLabel,
	htmlFor,
	labelId,
	supportingTextId,
	className,
	...rest
}: SectionRowProps ) => {
	return (
		<div { ...rest } className={ clsx( styles.row, className ) }>
			{ label === undefined ? (
				children
			) : (
				<>
					<SectionRowLabel
						label={ label }
						supportingText={ supportingText }
						required={ required }
						requiredLabel={ requiredLabel }
						htmlFor={ htmlFor }
						labelId={ labelId }
						supportingTextId={ supportingTextId }
					/>
					<SectionRowContentArea>{ children }</SectionRowContentArea>
				</>
			) }
		</div>
	);
} ) as SectionRowComponent;

SectionRow.Label = SectionRowLabel;
SectionRow.ContentArea = SectionRowContentArea;
