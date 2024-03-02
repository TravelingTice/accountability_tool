<script lang="ts">
	import ModalCard from './shared/ModalCard.svelte'
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
		canPublic,
		notifyPartner
	} from './pledgeStore'
	import Input from './shared/Input.svelte'
	import { AlertTriangleIcon } from 'svelte-feather-icons'

	let error: string | null = null

	const searchParams = new URLSearchParams(window.location.search)
	const fromCancel = searchParams.get('cancel') === 'true'

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
				partnerEmail: $partnerEmail,
				canPublic: $canPublic,
				notifyPartner: $notifyPartner
			})
		})

		const { redirectTo } = await response.json()

		window.location = redirectTo
	}
</script>

<ModalCard forStep="you" title="Fill in your details">
	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<div class="space-y-2">
			<label class="block" for="name">Your name</label>

			<Input error={Boolean(error)} bind:value={$name} id="name" />
			{#if error}<p class="text-sm text-red-400">{error}</p>{/if}
		</div>

		<div class="flex flex-col items-center gap-8">
			<div class="flex flex-col items-center space-y-4">
				{#if fromCancel}
					<div class="flex gap-2">
						<AlertTriangleIcon class="text-yellow-400" />
						<p>Payment canceled, please try again.</p>
					</div>
				{/if}
				<Button>Continue to payment</Button>
			</div>
			<Button variant="outline" type="button" on:click={step.previous}>Back</Button>
		</div>
	</form>
</ModalCard>
