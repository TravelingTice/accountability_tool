<script lang="ts">
	import { CalendarIcon, FlagIcon, UserCheckIcon, XIcon } from 'svelte-feather-icons'
	import { type Pledge, type WithNullableProperties } from './pledgeStore'
	import { consequenceAsSentence } from './consequenceAsSentence'

	export let pledge: WithNullableProperties<Pledge>

	const { amount, consequence, goal, partnerEmail, deadline, partnerName } = pledge

	$: deadlineStr = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(deadline ?? ''))
</script>

<ul class="detail-list">
	<li>
		<FlagIcon class="shrink-0" />
		<p>Goal: <strong>{goal}</strong></p>
	</li>
	<li>
		<CalendarIcon />
		<p>Deadline: <strong>{deadlineStr}</strong></p>
	</li>
	<li>
		<XIcon class="shrink-0" />
		<p>
			Consequence of not reaching goal:
			<strong>
				{consequence && amount && consequenceAsSentence(consequence, amount)}
			</strong>
		</p>
	</li>
	<li>
		<UserCheckIcon class="shrink-0" />
		<p>
			Accountability partner: <strong>{partnerName} ({partnerEmail})</strong>
		</p>
	</li>
</ul>

<style>
	.detail-list {
		@apply space-y-4 text-left;
	}

	.detail-list li {
		@apply flex gap-2;
	}
</style>
