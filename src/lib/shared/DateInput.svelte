<script lang="ts">
	let dateInput: HTMLInputElement

	export let error: boolean
	export let value: string | null = null

	const openDatePicker = () => {
		dateInput.showPicker ? dateInput.showPicker() : dateInput.click()
	}
</script>

<div class="relative mt-2 block w-full">
	<input
		bind:this={dateInput}
		bind:value
		class:error
		type="date"
		class="w-full appearance-none rounded-lg border border-gray-600 bg-gray-900 px-5 py-2.5 text-gray-300 placeholder-gray-400/70 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
	/>
	<button
		type="button"
		class="absolute inset-y-0 right-0 flex items-center pr-5"
		on:click={openDatePicker}
	>
		<!-- Custom calendar icon SVG or an <img> tag here -->
		<svg
			class="h-5 w-5 text-gray-300"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line
				x1="16"
				y1="2"
				x2="16"
				y2="6"
			></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
		</svg>
	</button>
</div>

<style>
	.error {
		@apply border-red-400 focus:border-red-400 focus:ring-red-300;
	}
</style>
