import { PROTOCOL_PARAMETERS_DEFAULT } from '@lucid-evolution/lucid';

export function isValidHex(str) {
	const cleanStr = str.replace(/\s/g, '');
	return /^[0-9A-Fa-f]*$/.test(cleanStr);
}

export async function processTransaction(txHex) {
	const cleanHex = txHex.replace(/\s/g, '');

	if (!isValidHex(cleanHex)) {
		throw new Error('Invalid hex string');
	}

	if (cleanHex === '') {
		throw new Error('Empty hex string');
	}

	// Dynamically import Lucid components
	const { Emulator, Lucid } = await import('@lucid-evolution/lucid');
	const provider = new Emulator([], PROTOCOL_PARAMETERS_DEFAULT);
	const lucid = await Lucid(provider, 'Custom');
	const tx = lucid.fromTx(cleanHex);
	return JSON.stringify(tx.toJSON(), null, 2);
}
