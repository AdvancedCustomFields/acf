import { Portal } from '@ark-ui/react/portal';
import { Tooltip as Ark } from '@ark-ui/react/tooltip';
import clsx from 'clsx';
import type { ReactElement, ReactNode } from 'react';

import styles from './Tooltip.module.css';

/**
 * Arrow positions, matching the Figma `Arrow` variant.
 *
 * The value names the edge of the *tooltip* the pointer sits on, which is the
 * opposite of where the tooltip sits relative to its trigger: a `bottom-center`
 * arrow means the tooltip floats above the trigger.
 */
export const TOOLTIP_ARROWS = [
	'none',
	'bottom-left',
	'bottom-center',
	'bottom-right',
	'top-left',
	'top-center',
	'top-right',
	'left',
	'right',
] as const;

export type TooltipArrow = ( typeof TOOLTIP_ARROWS )[ number ];

/** Colour treatments, matching the Figma `Style` variant. */
export const TOOLTIP_APPEARANCES = [ 'default', 'subtle' ] as const;

export type TooltipAppearance = ( typeof TOOLTIP_APPEARANCES )[ number ];

/** Where the surface sits relative to its trigger. */
export const TOOLTIP_PLACEMENTS = [
	'top',
	'top-start',
	'top-end',
	'bottom',
	'bottom-start',
	'bottom-end',
	'left',
	'right',
] as const;

export type TooltipPlacement = ( typeof TOOLTIP_PLACEMENTS )[ number ];

/** Where the surface has to sit for the pointer to land on the named edge. */
const ARROW_PLACEMENT: Record< TooltipArrow, TooltipPlacement > = {
	none: 'top',
	'bottom-left': 'top-start',
	'bottom-center': 'top',
	'bottom-right': 'top-end',
	'top-left': 'bottom-start',
	'top-center': 'bottom',
	'top-right': 'bottom-end',
	left: 'right',
	right: 'left',
};

export interface TooltipProps {
	/** The Figma `Text` property — the tooltip's content. */
	content: ReactNode;
	/** The element the tooltip describes. Must be a single focusable element. */
	children: ReactElement;
	/** Maps to the Figma `Arrow` variant. `none` hides the pointer. */
	arrow?: TooltipArrow;
	/**
	 * Where the surface sits. Only meaningful with `arrow="none"`: every other
	 * `arrow` value names the edge the pointer sits on, which fixes the placement
	 * on its own, so this is ignored for those.
	 *
	 * Without a pointer there is nothing to contradict, and `top` is not always
	 * right — a collapsed navigation rail needs its labels beside the icons, not
	 * over the row above.
	 */
	placement?: TooltipPlacement;
	/** Maps to the Figma `Style` variant. */
	appearance?: TooltipAppearance;
	/** Milliseconds to wait before opening on hover. */
	openDelay?: number;
	/** Milliseconds to wait before closing once the pointer leaves. */
	closeDelay?: number;
	/** Class applied to the tooltip surface. */
	className?: string;
}

/**
 * A small informational label that appears on hover or focus to provide
 * context for an element.
 *
 * Figma: Base Design System — `Tooltip` (`955:200`).
 *
 * `appearance` maps to Figma's `Style` axis: `default` is the higher-weight
 * tooltip (`bg-inverse` / `text-inverse`); `subtle` is the lower-weight
 * alternative on the primary surface.
 *
 * Built on Ark UI's Tooltip, so hover intent, focus, Escape-to-close and the
 * `aria-describedby` wiring come for free. Figma's nine `Arrow` values are
 * positions, not decorations — each one implies where the surface sits, so the
 * prop drives Ark's placement rather than just toggling a triangle. `none` is the
 * exception: with no pointer the placement is undetermined, so `placement` sets
 * it.
 *
 * A tooltip is supplementary. Never put information in one that the user
 * cannot get any other way, and never attach one to a non-focusable element.
 *
 * @example
 * <Tooltip content="Copy to clipboard" arrow="bottom-center">
 *   <Button variant="ghost" iconLeading={ <Copy /> } aria-label="Copy" />
 * </Tooltip>
 */
export function Tooltip( {
	content,
	children,
	arrow = 'none',
	placement,
	appearance = 'default',
	openDelay,
	closeDelay,
	className,
}: TooltipProps ) {
	const resolvedPlacement =
		arrow === 'none' && placement ? placement : ARROW_PLACEMENT[ arrow ];

	return (
		<Ark.Root
			positioning={ { placement: resolvedPlacement } }
			{ ...( openDelay === undefined ? {} : { openDelay } ) }
			{ ...( closeDelay === undefined ? {} : { closeDelay } ) }
		>
			<Ark.Trigger asChild>{ children }</Ark.Trigger>
			<Portal>
				<Ark.Positioner
					className={ styles.positioner }
					data-bds-tooltip-positioner=""
				>
					<Ark.Content
						className={ clsx(
							styles.content,
							styles[ appearance ],
							className
						) }
					>
						{ arrow === 'none' ? null : (
							<Ark.Arrow className={ styles.arrow }>
								<Ark.ArrowTip className={ styles.arrowTip } />
							</Ark.Arrow>
						) }
						{ content }
					</Ark.Content>
				</Ark.Positioner>
			</Portal>
		</Ark.Root>
	);
}
