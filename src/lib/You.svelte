<script lang="ts">
	import Step from './Step.svelte'
	import Button from './shared/Button.svelte'
	import {
		name,
		email,
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

	let nameError: string | null = null
	let emailError: string | null = null

	const handleSubmit = async () => {
		nameError = null
		emailError = null

		if (!$name) {
			nameError = 'Please enter your name'
		}

		if (!$email) {
			emailError = 'Please enter your email'
		}

		if (nameError || emailError) {
			return
		}

		// Init stripe
		const response = await fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: $name,
				email: $email,
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

			<Input error={Boolean(nameError)} bind:value={$name} id="name" />
			{#if nameError}<p class="text-sm text-red-400">{nameError}</p>{/if}
		</div>

		<div class="space-y-2">
			<label class="block" for="email">Your email</label>

			<Input type="email" error={Boolean(emailError)} bind:value={$email} id="email" />
			{#if emailError}<p class="text-sm text-red-400">{emailError}</p>{/if}
		</div>

		<Button>Continue</Button>
	</form>
</Step>
