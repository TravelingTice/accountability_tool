<script lang="ts">
	import { onMount } from 'svelte'
	import Step from './Step.svelte'
	import { amount, consequence, step } from './pledgeStore'
	import Button from './shared/Button.svelte'

	let selectedValue = $amount ? $amount.toString() : ''

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
		$step = 'partner'
	}

	onMount(() => {
		// Weird searchparams bug where this param gets reset when navigating to it
		$step = 'money'
	})
</script>

<Step title="How much will you donate?">
	<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
		<label for="dropdown">Donation amount:</label>
		<select
			id="dropdown"
			class="rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
			bind:value={selectedValue}
		>
			{#each options as { value, text }}
				<option {value}>{text}</option>
			{/each}
		</select>

		{#if $amount}
			<Button>Continue</Button>
		{/if}
	</form>
</Step>
