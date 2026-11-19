import { useSyncExternalStore } from 'react';

/** How the user is currently driving the page. */
export type InputModality = 'keyboard' | 'pointer';

/**
 * Attribute the menu surfaces carry so their rows can tell the two apart in
 * CSS. Global on purpose: the row's stylesheet is a different CSS module from
 * the panel's, so an attribute is the only selector they can share.
 */
export const INPUT_MODALITY_ATTR = 'data-bds-nav';

let modality: InputModality = 'pointer';
const subscribers = new Set< () => void >();

function setModality( next: InputModality ) {
	if ( next === modality ) {
		return;
	}
	modality = next;
	for ( const notify of subscribers ) {
		notify();
	}
}

/**
 * The keys that move focus or the highlighted row. Inside a text field these
 * are the only ones that count as navigating; everything else is typing.
 */
const NAVIGATION_KEYS = new Set( [
	'Tab',
	'ArrowUp',
	'ArrowDown',
	'PageUp',
	'PageDown',
] );

function isTextEntry( target: EventTarget | null ): boolean {
	if ( ! ( target instanceof HTMLElement ) ) {
		return false;
	}
	if ( target.isContentEditable || target instanceof HTMLTextAreaElement ) {
		return true;
	}
	if ( ! ( target instanceof HTMLInputElement ) ) {
		return false;
	}
	return ! [ 'checkbox', 'radio', 'button', 'submit', 'reset' ].includes(
		target.type
	);
}

function handleKeyDown( event: KeyboardEvent ) {
	// A modifier held down is a shortcut, not navigation — Cmd-Tab away and back
	// should not turn a mouse session into a keyboard one.
	if ( event.metaKey || event.altKey || event.ctrlKey ) {
		return;
	}
	// Typing a query into a menu's search field is not navigating the rows. If
	// it counted, the first key would ring the top match until the mouse next
	// moved — a ring that appears and vanishes for no reason the user can see.
	// Left/Right/Home/End move the caret there, so they are typing too.
	if ( isTextEntry( event.target ) && ! NAVIGATION_KEYS.has( event.key ) ) {
		return;
	}
	setModality( 'keyboard' );
}

/**
 * Movement counts, not just clicks: inside a menu it is the pointer moving that
 * drags the highlight from row to row, so someone who arrow-keys down and then
 * reaches for the mouse is back to hovering before they press anything.
 */
function handlePointer() {
	setModality( 'pointer' );
}

/**
 * Reports whether the last thing the user did was press a key or use a pointer.
 *
 * Ark's roving cursor lands as `data-highlighted` for both, and design draws
 * them differently: a hover fill for the mouse, a focus ring for the keyboard.
 * The browser's own answer to this question is `:focus-visible`, but it cannot
 * be used here — Ark holds DOM focus on the panel and moves the cursor with
 * `aria-activedescendant`, and Chrome reports that programmatically focused
 * panel as `:focus-visible` even when the menu was opened by a click.
 *
 * Tracked on `document` rather than the panel so a menu opened with Enter shows
 * the ring on its first highlighted row straight away, rather than waiting for
 * a key pressed inside the panel.
 */
export function useInputModality(): InputModality {
	return useSyncExternalStore( subscribe, getSnapshot, getServerSnapshot );
}

function subscribe( notify: () => void ) {
	// Capture phase, so a handler that stops propagation cannot leave the two
	// modalities out of step with what the user is actually doing.
	if ( subscribers.size === 0 ) {
		document.addEventListener( 'keydown', handleKeyDown, true );
		document.addEventListener( 'pointerdown', handlePointer, true );
		document.addEventListener( 'pointermove', handlePointer, true );
	}
	subscribers.add( notify );

	return () => {
		subscribers.delete( notify );
		if ( subscribers.size === 0 ) {
			document.removeEventListener( 'keydown', handleKeyDown, true );
			document.removeEventListener( 'pointerdown', handlePointer, true );
			document.removeEventListener( 'pointermove', handlePointer, true );
		}
	};
}

function getSnapshot(): InputModality {
	return modality;
}

function getServerSnapshot(): InputModality {
	return 'pointer';
}

/**
 * The modality right now, for event handlers that need it outside render.
 *
 * Only current while something is subscribed through {@link useInputModality}
 * — the listeners are attached for as long as a menu panel is mounted — so read
 * it from a handler that runs while the panel is still open, such as the
 * menu's own close callback.
 */
export function currentInputModality(): InputModality {
	return modality;
}
