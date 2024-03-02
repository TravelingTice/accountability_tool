<script lang="ts">
	import { CheckIcon } from 'svelte-feather-icons'
	export let id: string
	export let text: string
	export let error = false
	export let required = false
	export let checked = false

	function toggleCheck() {
		checked = !checked
	}
</script>

<div class="relative">
	<input
		type="checkbox"
		bind:checked
		{id}
		class="absolute h-1 w-1 appearance-none overflow-hidden opacity-0"
		on:click={toggleCheck}
		{required}
	/>
	<label for={id} class:error class:checked>
		<div class="check-square">
			<span class="check-icon">
				<CheckIcon size="16" strokeWidth={3} />
			</span>
		</div>
		<span>{text}</span>
	</label>
</div>

<style>
	label {
		@apply flex items-start gap-2 text-gray-300;
	}

	label .check-square {
		@apply mt-1 h-4 w-4 shrink-0 rounded-sm border-2 border-gray-600;
	}

	.relative:focus-within label .check-square {
		@apply ring ring-blue-300 ring-opacity-40;
	}

	label.error .check-square {
		@apply ring ring-red-400;
	}

	.relative:focus-within label.error .check-square {
		@apply ring-red-400;
	}

	label .check-icon {
		@apply relative -left-0.5 -top-0.5 hidden;
	}

	label.checked .check-icon {
		@apply inline;
	}
</style>
