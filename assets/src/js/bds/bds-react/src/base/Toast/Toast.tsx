import clsx from 'clsx';
import { CircleCheck, CircleX, Sparkles, TriangleAlert, X } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';

import { InteractiveIcon } from '../InteractiveIcon';
import styles from './Toast.module.css';

/** Toast tones, matching the Figma `Type` variant. */
export const TOAST_TYPES = [
	'info',
	'neutral',
	'negative',
	'positive',
	'warning',
] as const;

export type ToastType = ( typeof TOAST_TYPES )[ number ];

/** The icon Figma pairs with each type. */
const TYPE_ICON: Record< ToastType, ReactNode > = {
	info: <Sparkles />,
	neutral: <Sparkles />,
	negative: <CircleX />,
	positive: <CircleCheck />,
	warning: <TriangleAlert />,
};

/** Negative toasts interrupt; everything else is polite. */
const TYPE_ROLE: Record< ToastType, 'alert' | 'status' > = {
	info: 'status',
	neutral: 'status',
	negative: 'alert',
	positive: 'status',
	warning: 'status',
};

export interface ToastProps extends HTMLAttributes< HTMLDivElement > {
	/** Maps to the Figma `Type` variant. */
	type?: ToastType;
	/** The Figma `Title` property. */
	title: string;
	/** The Figma `Secondary text` property. */
	children?: ReactNode;
	/** Maps to the Figma `Icon` boolean. The glyph itself is fixed per type. */
	showIcon?: boolean;
	/** An `AlertActions` row. Supplying it turns on the Figma `Actions` flag. */
	actions?: ReactNode;
	/** Supplying it turns on the Figma `Dismissible` flag and renders a close button. */
	onDismiss?: () => void;
	/** Accessible name for the close button. */
	dismissLabel?: string;
}

/**
 * A notification that appears briefly in response to a user action. Typically
 * used for confirmations, errors, or status updates that don't require a
 * response. AKA Snackbar, Flash message.
 *
 * Figma: Base Design System — `Toast` (`2101:28589`).
 *
 * This is the toast surface only — the design system models a single card, not
 * a queue. Placement, stacking and auto-dismiss timing belong to the app's
 * toaster; render this inside it.
 *
 * Figma keeps the card surface identical across all five Types; `type` only
 * changes inner styling (chiefly the leading icon treatment). This differs from
 * Alert, where Type also shifts the surface colours.
 *
 * @example
 * <Toast type="positive" title="Deployment finished" onDismiss={ close }>
 *   staging.example.com is now running build 412.
 * </Toast>
 */
export function Toast( {
	type = 'info',
	title,
	children,
	showIcon = true,
	actions,
	onDismiss,
	dismissLabel = 'Dismiss',
	className,
	...rest
}: ToastProps ) {
	// Figma only draws the card with a description; a lone title centres on
	// the icon instead of sitting on its top edge (see figma-divergences.md).
	const titleOnly = ! children && ! actions;

	return (
		<div
			role={ TYPE_ROLE[ type ] }
			{ ...rest }
			className={ clsx(
				styles.toast,
				styles[ type ],
				titleOnly && styles.titleOnly,
				className
			) }
		>
			<div className={ styles.content }>
				{ showIcon ? (
					<span className={ styles.iconBox } aria-hidden="true">
						<span className={ styles.icon }>
							{ TYPE_ICON[ type ] }
						</span>
					</span>
				) : null }
				<div className={ styles.body }>
					<div className={ styles.copy }>
						<span className={ styles.title }>{ title }</span>
						{ children ? (
							<span className={ styles.message }>
								{ children }
							</span>
						) : null }
					</div>
					{ actions }
				</div>
			</div>
			{ onDismiss ? (
				<InteractiveIcon
					icon={ <X /> }
					label={ dismissLabel }
					size="sm"
					onClick={ onDismiss }
					className={ styles.close }
				/>
			) : null }
		</div>
	);
}
