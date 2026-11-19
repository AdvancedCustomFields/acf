import clsx from 'clsx';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import styles from './ButtonGroup.module.css';

/**
 * Layout directions, matching the Figma `Orientation` variant.
 */
export const BUTTON_GROUP_ORIENTATIONS = [ 'horizontal', 'vertical' ] as const;

export type ButtonGroupOrientation =
	( typeof BUTTON_GROUP_ORIENTATIONS )[ number ];

export interface ButtonGroupProps extends HTMLAttributes< HTMLDivElement > {
	/** The buttons. Maps to the Figma `Buttons` slot. */
	children: ReactNode;
	/** Layout direction. Maps to the Figma `Orientation` variant. */
	orientation?: ButtonGroupOrientation;
}

/**
 * Groups related actions with consistent spacing. Holds two to five Buttons or
 * Icon buttons, arranged horizontally or vertically.
 *
 * Figma: Base Design System — `Button group` (`3849:28992`).
 *
 * The Figma component is a slot whose only styling is the layout: flex in the
 * chosen direction, `space-sm` between children, centred on the cross axis.
 * The buttons keep their own individual styling, so there is nothing to
 * override here.
 *
 * It renders a `role="group"`, which is what tells assistive technology the
 * buttons belong together — pass `aria-label` to name the group.
 *
 * @example
 * <ButtonGroup aria-label="Post actions">
 *   <Button variant="secondary">Cancel</Button>
 *   <Button>Publish</Button>
 * </ButtonGroup>
 */
export const ButtonGroup = forwardRef< HTMLDivElement, ButtonGroupProps >(
	function ButtonGroup(
		{ children, orientation = 'horizontal', className, ...rest },
		ref
	) {
		return (
			<div
				{ ...rest }
				ref={ ref }
				role="group"
				className={ clsx(
					styles.group,
					styles[ orientation ],
					className
				) }
			>
				{ children }
			</div>
		);
	}
);
