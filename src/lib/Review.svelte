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
		step
	} from './pledgeStore'
	import { onMount } from 'svelte'
	import Checkbox from './shared/Checkbox.svelte'
	import { CalendarIcon, FlagIcon, UserCheckIcon, XIcon } from 'svelte-feather-icons'
	import { consequenceAsSentence, consequenceAsWord } from './consequenceAsSentence'

	let agree1 = false
	let agree2 = false
	let error1 = false
	let error2 = false

	let sendPartnerEmail = true

	const handleSubmit = () => {
		if (!agree1) error1 = true
		if (!agree2) error2 = true
		if (error1 || error2) return

		console.log('Pledge confirmed, lets go')
	}

	onMount(() => {
		// Weird searchparams bug where this param gets reset when navigating to it
		$step = 'review'
	})

	$: deadlineStr = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date($deadline ?? ''))
</script>

<Step title="Please review your pledge">
	<div class="space-y-8">
		<div class="space-y-4">
			<p>Please carefully review the details of your pledge:</p>

			<ul class="review-list">
				<li>
					<FlagIcon class="shrink-0" />
					<p>Goal: <strong>{$goal}</strong></p>
				</li>
				<li>
					<CalendarIcon />
					<p>Deadline: <strong>{deadlineStr}</strong></p>
				</li>
				<li>
					<XIcon class="shrink-0" />
					<p>
						Consequence of not reaching goal:
						<strong
							>{$consequence && $amount && consequenceAsSentence($consequence, $amount)}</strong
						>
					</p>
				</li>
				<li>
					<UserCheckIcon class="shrink-0" />
					<p>
						Accountability partner: <strong>{$partnerName} ({$partnerEmail})</strong>
					</p>
				</li>
			</ul>
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

<style>
	.review-list {
		@apply space-y-4;
	}

	.review-list li {
		@apply flex gap-2;
	}
</style>
