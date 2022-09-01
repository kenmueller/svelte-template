<script lang="ts">
	import { blur } from 'svelte/transition'

	export let key: string
	export let hidden = false
	export let duration = 500
</script>

{#key key}
	<div
		aria-hidden={hidden || undefined}
		in:blur={{ duration, delay: duration }}
		out:blur={{ duration }}
	>
		<slot />
	</div>
{/key}

<style lang="scss">
	div {
		// Position the two pages on top of each other
		grid-row: 1;
		grid-column: 1;
	}
</style>
