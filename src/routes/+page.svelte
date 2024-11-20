<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import * as diff from 'diff';
	import TransactionInput from '$lib/components/TransactionInput.svelte';
	import DiffViewer from '$lib/components/DiffViewer.svelte';
	import { processTransaction } from '$lib/utils/transaction';
	import '../app.css';

	let tx1 = '';
	let tx2 = '';
	let json1 = '';
	let json2 = '';
	let jsonDiff = [];

	async function updateTransaction(txHex, setJson) {
		if (!txHex) {
			setJson('');
			return;
		}
		try {
			const result = await processTransaction(txHex);
			setJson(result);
			return result;
		} catch (error) {
			toast.error(error.message);
			setJson('');
			return '';
		}
	}

	async function updateDiff() {
		try {
			if (json1 && json2) {
				jsonDiff = diff.diffJson(JSON.parse(json1), JSON.parse(json2));
			}
		} catch (error) {
			toast.error(error.message);
			jsonDiff = [];
		}
	}

	$: {
		if (tx1) updateTransaction(tx1, (val) => (json1 = val));
	}

	$: {
		if (tx2) updateTransaction(tx2, (val) => (json2 = val));
	}

	$: {
		if (json1 && json2) {
			updateDiff();
		}
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Transaction Diff Checker</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<TransactionInput bind:value={tx1} label="Original Transaction" jsonOutput={json1} />
		<TransactionInput bind:value={tx2} label="New Transaction" jsonOutput={json2} />
	</div>

	<DiffViewer diff={jsonDiff} />
</div>

<Toaster />

<svelte:head>
	<title>Transaction Diff Checker</title>
</svelte:head>
