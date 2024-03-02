<script lang="ts">
	import Step from './Step.svelte'
	import Button from './shared/Button.svelte'
	import { partnerName, partnerEmail, step } from './pledgeStore'
	import { onMount } from 'svelte'
	import Input from './shared/Input.svelte'

	let nameError: string | null = null
	let emailError: string | null = null

	const handleSubmit = () => {
		nameError = null
		emailError = null

		if (!$partnerName) {
			nameError = "Please enter your accountability partner's name"
		}

		if (!$partnerEmail) {
			emailError = "Please enter your accountability partner's email"
		}

		if (nameError || emailError) {
			return
		}

		$step = 'review'
	}

	onMount(() => {
		// Weird searchparams bug where this param gets reset when navigating to it
		$step = 'partner'
	})
</script>

<Step title="Who will keep you accountable?">
	<p>
		At the end of your challenge on the day of your deadline, we will send your accountability
		partner an email, asking them if you really achieved your goal.
	</p>
	<p>
		<strong>
			If they claim you haven't achieved your goal, your money will be donated to the cause you
			selected.
		</strong>
	</p>
	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<div class="space-y-2">
			<label class="block" for="partnerName">Accountability partner name</label>

			<Input error={Boolean(nameError)} bind:value={$partnerName} id="partnerName" />
			{#if nameError}<p class="text-sm text-red-400">{nameError}</p>{/if}
		</div>

		<div class="space-y-2">
			<label class="block" for="partnerEmail">Accountability partner email</label>

			<Input
				type="email"
				error={Boolean(emailError)}
				bind:value={$partnerEmail}
				id="partnerEmail"
			/>
			{#if emailError}<p class="text-sm text-red-400">{emailError}</p>{/if}
		</div>

		<Button>Continue</Button>
	</form>
</Step>
