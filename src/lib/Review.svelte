<script lang="ts">
	import Step from './Step.svelte'
	import Button from './shared/Button.svelte'
	import {
		amount,
		consequence,
		deadline,
		goal,
		partnerEmail,
		partnerName,
		step,
		type Pledge,
		type WithNullableProperties
	} from './pledgeStore'
	import { onMount } from 'svelte'
	import Checkbox from './shared/Checkbox.svelte'
	import { consequenceAsWord } from './consequenceAsSentence'
	import PledgeDetails from './PledgeDetails.svelte'

	let agree1 = false
	let agree2 = false
	let error1 = false
	let error2 = false

	let sendPartnerEmail = true

	$: pledge = {
		amount: $amount,
		goal: $goal,
		deadline: $deadline,
		partnerName: $partnerName,
		partnerEmail: $partnerEmail,
		consequence: $consequence,
		name: null,
		email: null
	} satisfies WithNullableProperties<Pledge>

	const handleSubmit = () => {
		if (!agree1) error1 = true
		if (!agree2) error2 = true
		if (error1 || error2) return

		$step = 'you'
	}

	onMount(() => {
		// Weird searchparams bug where this param gets reset when navigating to it
		$step = 'review'
	})
</script>

<Step title="Please review your pledge">
	<div class="space-y-8">
		<div class="space-y-4">
			<p>Please carefully review the details of your pledge:</p>

			<PledgeDetails {pledge} />
		</div>

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<Checkbox
				id="agree1"
				required
				error={error1}
				bind:checked={agree1}
				text="I agree that 5% of the donation amount goes to the website maintainer"
			/>
			{#if $consequence}
				<Checkbox
					id="agree2"
					required
					error={error2}
					bind:checked={agree2}
					text="I agree that 95% of the donation amount goes to {consequenceAsWord(
						$consequence
					)} if I don't follow through on my goal."
				/>
			{/if}
			<Checkbox
				id="sendPartnerEmail"
				bind:checked={sendPartnerEmail}
				text="Send my accountability partner an email with the details of this pledge"
			/>
			<Button>Confirm and Pay</Button>
		</form>
	</div>
</Step>
