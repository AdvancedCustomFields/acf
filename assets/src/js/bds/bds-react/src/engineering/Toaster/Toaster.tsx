import {
	Toast as ArkToast,
	Toaster as ArkToaster,
	createToaster,
	type CreateToasterProps,
	type CreateToasterReturn,
	type ToastOptions,
} from '@ark-ui/react/toast';

import { Toast, type ToastType } from '../../base/Toast';
import styles from './Toaster.module.css';

/** Toast tones accepted by {@link createBdsToaster}. */
export const TOASTER_TYPES = [
	'neutral',
	'info',
	'positive',
	'warning',
	'negative',
] as const;

export type ToasterType = ( typeof TOASTER_TYPES )[ number ];

export interface BdsToastOptions {
	title: string;
	description?: string;
	type?: ToasterType;
	duration?: number;
	closable?: boolean;
}

export type BdsToaster = CreateToasterReturn & {
	create: ( options: BdsToastOptions ) => string;
};

/** Ark UI / zag-js only understands these queue priority types. */
type ZagToastType = 'info' | 'success' | 'warning' | 'error';

const TO_ZAG_TYPE: Record< ToasterType, ZagToastType > = {
	neutral: 'info',
	info: 'info',
	positive: 'success',
	warning: 'warning',
	negative: 'error',
};

const FROM_ZAG_TYPE: Record< ZagToastType, ToastType > = {
	info: 'info',
	success: 'positive',
	warning: 'warning',
	error: 'negative',
};

interface BdsToastMeta {
	bdsType?: ToasterType;
}

export interface ToasterProps {
	toaster: BdsToaster;
}

function mapToastType( type: ToasterType ): ToastType {
	switch ( type ) {
		case 'positive':
			return 'positive';
		case 'warning':
			return 'warning';
		case 'negative':
			return 'negative';
		case 'neutral':
			return 'neutral';
		case 'info':
		default:
			return 'info';
	}
}

function resolveToastType( toast: ToastOptions ): ToastType {
	const meta = toast.meta as BdsToastMeta | undefined;
	if ( meta?.bdsType ) {
		return mapToastType( meta.bdsType );
	}

	const zagType = toast.type as ZagToastType | undefined;
	return zagType ? ( FROM_ZAG_TYPE[ zagType ] ?? 'info' ) : 'info';
}

function toastTitle( title: ToastOptions[ 'title' ] ): string {
	return typeof title === 'string' ? title : '';
}

/**
 * Renders the toast queue for an {@link createBdsToaster} instance. Mount once
 * near the app root.
 *
 * Engineering-only wrapper — Figma models the `Toast` card (`base/Toast`), not
 * placement or queueing. See `docs/engineering-components.md`.
 */
export function Toaster( { toaster }: ToasterProps ) {
	return (
		<ArkToaster toaster={ toaster } className={ styles.toaster }>
			{ ( toast ) => {
				const dismissProps =
					toast.closable === false
						? {}
						: { onDismiss: () => toaster.dismiss( toast.id ) };

				return (
					<ArkToast.Root key={ toast.id } className={ styles.toast }>
						<Toast
							type={ resolveToastType( toast ) }
							title={ toastTitle( toast.title ) }
							{ ...dismissProps }
						>
							{ toast.description }
						</Toast>
					</ArkToast.Root>
				);
			} }
		</ArkToaster>
	);
}

export type CreateBdsToasterOptions = CreateToasterProps;

/**
 * Creates a toaster instance with IWDS defaults (`bottom-end`, 5s duration).
 * Negative toasts stay until manually dismissed unless a duration is supplied.
 */
export function createBdsToaster(
	options: CreateBdsToasterOptions = {}
): BdsToaster {
	const toaster = createToaster( {
		placement: 'bottom-end',
		duration: 5000,
		overlap: true,
		gap: 16,
		...options,
	} );

	const originalCreate = toaster.create.bind( toaster );
	const create = ( toast: BdsToastOptions ) => {
		const bdsType = toast.type ?? 'info';
		const duration =
			toast.duration ??
			( bdsType === 'negative' ? 999_999_999 : undefined );

		return originalCreate( {
			title: toast.title,
			description: toast.description,
			type: TO_ZAG_TYPE[ bdsType ],
			meta: { bdsType },
			closable: toast.closable ?? true,
			...( duration === undefined ? {} : { duration } ),
		} );
	};

	return Object.assign( toaster, { create } );
}

export { createToaster } from '@ark-ui/react/toast';
