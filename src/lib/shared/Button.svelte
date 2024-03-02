<script lang="ts">
	export let variant: 'fill' | 'outline' = 'fill'
</script>

<button {...$$restProps} class="{$$restProps.class ?? ''} {variant}" on:click><slot /></button>

<style>
	button {
		@apply transform rounded-lg px-6 py-2 font-medium capitalize tracking-wide text-white outline-none transition-colors duration-300 focus:ring focus:ring-opacity-80;
	}

	button.fill {
		@apply bg-red-600 hover:bg-red-500 focus:ring-red-300;
	}

	button.outline {
		@apply border border-gray-500 text-gray-200 outline-none hover:bg-blue-950 focus:ring-blue-300;
	}
</style>
