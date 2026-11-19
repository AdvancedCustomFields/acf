/**
 * Collection helpers shared by the select inputs that embed `Dropdown menu`.
 *
 * Not exported from the package.
 */

/** Case-insensitive label match; an empty query keeps every item. */
export function filterByLabel< T extends { label: string } >(
	items: T[],
	query: string
): T[] {
	const needle = query.trim().toLowerCase();
	if ( ! needle ) {
		return items;
	}
	return items.filter( ( item ) =>
		item.label.toLowerCase().includes( needle )
	);
}

/**
 * Zag's `scrollToIndexFn`, scrolling the highlighted row within its own list.
 *
 * Without it Zag scrolls rows with `scrollIntoView( row, { rootEl: content } )`,
 * which does nothing unless the panel itself scrolls — and in the select inputs
 * it is the capped list inside the panel that scrolls, not the panel. So a row
 * reached with the arrow keys, or the selected row on reopen, stayed below the
 * fold. `block: 'nearest'` scrolls the list (the nearest scrollable ancestor)
 * by the least amount and leaves an already-visible row where it is.
 */
export function scrollRowIntoList( {
	getElement,
}: {
	getElement: () => HTMLElement | null;
} ): void {
	const row = getElement();
	// jsdom has no layout and leaves `scrollIntoView` unimplemented, so a
	// consumer's component tests would throw from inside Zag's scroll effect.
	if ( typeof row?.scrollIntoView === 'function' ) {
		row.scrollIntoView( { block: 'nearest' } );
	}
}
