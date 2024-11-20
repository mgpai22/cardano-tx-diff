<script>
	export let diff = [];
</script>

{#if diff.length > 0}
	<div class="mt-8">
		<h2 class="text-xl font-semibold mb-4">Differences</h2>
		<div class="bg-gray-50 p-4 rounded-lg overflow-auto">
			{#each diff as part}
				<span
					class:text-red-600={part.removed}
					class:text-green-600={part.added}
					class:text-gray-600={!part.added && !part.removed}
				>
					{part.value}
				</span>
			{/each}
		</div>
	</div>
{/if}
