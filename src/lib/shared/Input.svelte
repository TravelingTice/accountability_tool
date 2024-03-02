<script lang="ts">
	export let error = false
	export let value: string | null = null
</script>

<input
	type="text"
	{...$$restProps}
	bind:value
	on:keyup
	class:error
	class="{$$restProps.class ??
		''} block w-full resize-none rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
/>

<style>
	.error {
		@apply border-red-400 focus:border-red-400 focus:ring-red-300;
	}
</style>
