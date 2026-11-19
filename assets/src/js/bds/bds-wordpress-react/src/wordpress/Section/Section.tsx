import { Collapsible } from '@ark-ui/react/collapsible';
import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import { SectionHeader, type SectionHeaderProps } from '../SectionHeader';
import styles from './Section.module.css';

/** Content padding, matching the Figma `Padding` variant. */
export const SECTION_PADDINGS = [ 'none', 'lg', 'md' ] as const;

export type SectionPadding = ( typeof SECTION_PADDINGS )[ number ];

const PADDING_CLASS: Record< SectionPadding, string | undefined > = {
	none: styles.contentNone,
	lg: styles.contentLg,
	md: styles.contentMd,
};

export interface SectionProps extends Omit<
	HTMLAttributes< HTMLElement >,
	'title'
> {
	children: ReactNode;
	/**
	 * Content padding. Maps to the Figma `Padding` variant: `lg` is
	 * `space-3xl`, `md` is `space-2xl`, and `none` removes both the padding
	 * and the gap between children, for edge-to-edge content such as
	 * `SectionRow`.
	 *
	 * @default 'none' — Figma's default variant.
	 */
	padding?: SectionPadding;
	/**
	 * Custom header node. When omitted, a {@link SectionHeader} is built from
	 * the header props below. Set to `false` to omit the header entirely.
	 */
	header?: ReactNode | false;
	/** Props forwarded to the built-in {@link SectionHeader}. */
	title?: SectionHeaderProps[ 'title' ];
	iconLeading?: SectionHeaderProps[ 'iconLeading' ];
	infoTip?: SectionHeaderProps[ 'infoTip' ];
	action?: SectionHeaderProps[ 'action' ];
	collapsible?: SectionHeaderProps[ 'collapsible' ];
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: ( open: boolean ) => void;
}

/**
 * Groups related content under a titled header. The content area is a slot
 * that takes any composition, with no padding by default and Md or Lg insets
 * for content placed directly in it.
 *
 * Figma: WordPress Component Library — `Section` (`96:398`).
 *
 * @example
 * <Section title="General" padding="lg">
 *   <p>Section body…</p>
 * </Section>
 */
export function Section( {
	children,
	padding = 'none',
	header,
	title,
	iconLeading,
	infoTip,
	action,
	collapsible = false,
	defaultOpen = true,
	open,
	onOpenChange,
	className,
	...rest
}: SectionProps ) {
	const showHeader =
		header !== false &&
		( header != null ||
			title != null ||
			iconLeading != null ||
			infoTip != null ||
			action != null ||
			collapsible );

	const headerNode =
		header === false
			? null
			: ( header ?? (
					<SectionHeader
						title={ title }
						iconLeading={ iconLeading }
						infoTip={ infoTip }
						action={ action }
						collapsible={ collapsible }
					/>
				) );

	const content = (
		<div className={ clsx( styles.content, PADDING_CLASS[ padding ] ) }>
			{ children }
		</div>
	);

	const body = collapsible ? (
		<Collapsible.Content>{ content }</Collapsible.Content>
	) : (
		content
	);

	const section = (
		<section { ...rest } className={ clsx( styles.section, className ) }>
			{ showHeader ? headerNode : null }
			{ body }
		</section>
	);

	if ( ! collapsible ) {
		return section;
	}

	return (
		<Collapsible.Root
			defaultOpen={ open === undefined ? defaultOpen : undefined }
			open={ open }
			onOpenChange={ ( details ) => onOpenChange?.( details.open ) }
		>
			{ section }
		</Collapsible.Root>
	);
}
