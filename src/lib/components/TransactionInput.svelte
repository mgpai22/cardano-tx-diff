<script>
	export let value = '';
	export let label = '';
	export let jsonOutput = '';

	// Generate a unique ID for the textarea
	const id = `textarea-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div>
	<label for={id} class="block text-sm font-medium mb-2">{label}</label>
	<textarea
		{id}
		bind:value
		class="w-full h-32 p-2 border rounded-md"
		placeholder="Paste transaction hex..."
	/>
	{#if jsonOutput}
		<div class="mt-4">
			<h3 class="text-sm font-medium mb-2">Parsed Transaction</h3>
			<pre class="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">{jsonOutput}</pre>
		</div>
	{/if}
</div>
