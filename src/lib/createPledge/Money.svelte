<script lang="ts">
	import ModalCard from '../shared/ModalCard.svelte'
	import { amount, step } from './pledgeStore'
	import Button from '../shared/Button.svelte'

	let selectedValue = $amount ? $amount.toString() : ''

	let error = false

	$: if (selectedValue) {
		$amount = parseInt(selectedValue)
	}

	const options = [
		{ value: '', text: 'Please select an amount' }, // Placeholder option
		{ value: '10', text: '$10' },
		{ value: '50', text: '$50' },
		{ value: '100', text: '$100' },
		{ value: '250', text: '$250' }
	]

	const handleSubmit = () => {
		if (selectedValue === '') return (error = true)

		step.next()
	}
</script>

<ModalCard title="How much will you donate?" on:close={() => ($step = null)}>
	<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
		<div class="space-y-2">
			<label for="dropdown" class="block">Donation amount:</label>
			<select
				id="dropdown"
				class:error
				class="rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
				bind:value={selectedValue}
			>
				{#each options as { value, text }}
					<option {value}>{text}</option>
				{/each}
			</select>
		</div>

		<div class="flex justify-between">
			<Button variant="outline" type="button" on:click={step.previous}>Back</Button>
			<Button>Continue</Button>
		</div>
	</form>
</ModalCard>

<style>
	select.error {
		@apply border-red-500 focus:ring-red-300;
	}
</style>
