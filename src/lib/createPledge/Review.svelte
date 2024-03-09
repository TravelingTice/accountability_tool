<script lang="ts">
	import ModalCard from '../shared/ModalCard.svelte'
	import Button from '../shared/Button.svelte'
	import {
		amount,
		consequence,
		deadline,
		goal,
		partnerEmail,
		partnerName,
		step,
		type Pledge,
		type WithNullableProperties,
		notifyPartner,
		canPublic
	} from './pledgeStore'
	import Checkbox from '../shared/Checkbox.svelte'
	import { consequenceAsWord } from './consequenceAsSentence'
	import PledgeDetails from './PledgeDetails.svelte'

	let agree1 = false
	let agree2 = false
	let error1 = false
	let error2 = false

	$: pledge = {
		amount: $amount,
		goal: $goal,
		deadline: $deadline,
		partnerName: $partnerName,
		partnerEmail: $partnerEmail,
		consequence: $consequence,
		canPublic: $canPublic,
		name: null
	} satisfies WithNullableProperties<Pledge>

	const handleSubmit = () => {
		if (!agree1) error1 = true
		if (!agree2) error2 = true
		if (error1 || error2) return

		step.next()
	}
</script>

<ModalCard title="Please review your pledge" on:close={() => ($step = null)}>
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
				id="notifyPartner"
				bind:checked={$notifyPartner}
				text="Send my accountability partner an email with the details of this pledge"
			/>
			<Checkbox
				id="canPublic"
				bind:checked={$canPublic}
				text="I allow my pledge to be displayed on the website (optional)"
			/>
			<div class="flex justify-between">
				<Button variant="outline" type="button" on:click={step.previous}>Back</Button>
				<Button>Confirm and Pay</Button>
			</div>
		</form>
	</div>
</ModalCard>
