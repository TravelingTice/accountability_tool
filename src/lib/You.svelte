<script lang="ts">
	import Step from './Step.svelte'
	import Button from './shared/Button.svelte'
	import {
		name,
		step,
		goal,
		deadline,
		consequence,
		partnerName,
		partnerEmail,
		amount,
		type Pledge,
		type WithNullableProperties
	} from './pledgeStore'
	import { onMount } from 'svelte'
	import Input from './shared/Input.svelte'

	let error: string | null = null

	const handleSubmit = async () => {
		error = null

		if (!$name) {
			return (error = 'Please enter your name')
		}

		// Init stripe
		const response = await fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: $name,
				goal: $goal,
				amount: $amount,
				deadline: $deadline,
				consequence: $consequence,
				partnerName: $partnerName,
				partnerEmail: $partnerEmail
			} satisfies WithNullableProperties<Pledge>)
		})

		const { redirectTo } = await response.json()

		window.location = redirectTo
	}

	onMount(() => {
		// Weird searchparams bug where this param gets reset when navigating to it
		$step = 'you'
	})
</script>

<Step title="Fill in your details">
	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<div class="space-y-2">
			<label class="block" for="name">Your name</label>

			<Input error={Boolean(error)} bind:value={$name} id="name" />
			{#if error}<p class="text-sm text-red-400">{error}</p>{/if}
		</div>

		<Button>Continue</Button>
	</form>
</Step>
