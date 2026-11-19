import { Collapsible, useCollapsibleContext } from '@ark-ui/react/collapsible';
import clsx from 'clsx';
import { ChevronUp, Info, Puzzle } from 'lucide-react';
import { createElement, type HTMLAttributes, type ReactNode } from 'react';

import { InteractiveIcon } from '@wpengine/bds-react/base/InteractiveIcon';
import { Tooltip } from '@wpengine/bds-react/base/Tooltip';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps extends Omit<
	HTMLAttributes< HTMLDivElement >,
	'title'
> {
	/** The section title. Maps to the Figma `Title` text property. Omit to hide. */
	title?: ReactNode;
	/** Supporting copy below the title. Maps to Figma's `Secondary text` slot. */
	secondaryText?: ReactNode;
	/** Leading icon. Omit to hide the Figma `Icon leading` slot. */
	iconLeading?: ReactNode;
	/** Info tip content. Omit to hide the Figma `Info tip` slot. */
	infoTip?: ReactNode;
	/** Trailing action, typically a Link. Omit to hide the Figma `Action item`. */
	action?: ReactNode;
	/**
	 * When true, renders the collapse toggle and expects to sit inside a
	 * {@link Collapsible.Root}. Maps to the Figma `Collapsible` boolean.
	 */
	collapsible?: boolean;
	/**
	 * Accessible name for the collapse toggle. Defaults to `title` when it is
	 * a string, so each toggle in a stack is told apart ("Availability,
	 * expanded"); otherwise "Toggle section". Pass it when `title` is not
	 * plain text.
	 */
	toggleLabel?: string;
}

/**
 * A collapsible header's title, as a `<label>` for the collapse toggle: a
 * click on it activates the toggle natively, with no second control. The
 * toggle's own `aria-label` still names it.
 */
function CollapsibleTitle( { children }: { children: ReactNode } ) {
	const api = useCollapsibleContext();
	return (
		<label
			htmlFor={ api.getTriggerProps().id }
			className={ styles.titleLabel }
		>
			{ children }
		</label>
	);
}

/**
 * Titles a block of content and holds the controls that act on it. Supports a
 * leading icon, an info tip, a single action link and a collapse toggle, and is
 * composed by Section.
 *
 * Figma: WordPress Component Library — `Section header` (`95:222`).
 *
 * @example
 * <SectionHeader title="General" iconLeading={ <Puzzle /> } />
 */
export function SectionHeader( {
	title,
	secondaryText,
	iconLeading = <Puzzle aria-hidden />,
	infoTip,
	action,
	collapsible = false,
	toggleLabel,
	className,
	...rest
}: SectionHeaderProps ) {
	const resolvedToggleLabel =
		toggleLabel ??
		( typeof title === 'string' && title !== ''
			? title
			: 'Toggle section' );
	const titleContent = collapsible ? (
		<CollapsibleTitle>{ title }</CollapsibleTitle>
	) : (
		title
	);

	return (
		<div
			{ ...rest }
			className={ clsx(
				styles.header,
				collapsible && styles.collapsible,
				className
			) }
		>
			<div className={ styles.main }>
				<div className={ styles.inner }>
					<div className={ styles.titleStack }>
						<div className={ styles.titleGroup }>
							{ iconLeading ? (
								<span
									className={ styles.icon }
									aria-hidden="true"
								>
									{ iconLeading }
								</span>
							) : null }
							{ title != null && title !== ''
								? createElement(
										'h2',
										{ className: styles.title },
										titleContent
									)
								: null }
						</div>
						{ secondaryText != null && secondaryText !== '' ? (
							<div className={ styles.secondaryText }>
								{ secondaryText }
							</div>
						) : null }
					</div>
					{ infoTip ? (
						<Tooltip content={ infoTip } arrow="bottom-center">
							<InteractiveIcon
								icon={ <Info /> }
								label="More information"
								size="sm"
							/>
						</Tooltip>
					) : null }
				</div>
				{ action ? (
					<div className={ styles.action }>{ action }</div>
				) : null }
			</div>
			{ collapsible ? (
				/*
				 * The trigger is the whole 48px toggle square. The title is a
				 * `<label>` for it, so clicking the title toggles too while it
				 * stays one button and one tab stop. No hover background; the
				 * chevron steps to its hover colour instead.
				 */
				<Collapsible.Trigger asChild>
					<button
						type="button"
						className={ styles.toggle }
						aria-label={ resolvedToggleLabel }
					>
						<span
							className={ styles.toggleIcon }
							aria-hidden="true"
						>
							<ChevronUp />
						</span>
					</button>
				</Collapsible.Trigger>
			) : null }
		</div>
	);
}
