<script lang="ts">
	import { CalendarIcon, FlagIcon, UserCheckIcon, XIcon } from 'svelte-feather-icons'
	import { type Pledge, type WithNullableProperties } from './pledgeStore'
	import { consequenceAsSentence } from './consequenceAsSentence'

	export let pledge: WithNullableProperties<Pledge>

	$: deadlineStr = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(pledge.deadline ?? ''))
</script>

<ul class="detail-list">
	<li>
		<FlagIcon class="shrink-0" />
		<p>Goal: <strong>{pledge.goal}</strong></p>
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
				{pledge.consequence &&
					pledge.amount &&
					consequenceAsSentence(pledge.consequence, pledge.amount)}
			</strong>
		</p>
	</li>
	<li>
		<UserCheckIcon class="shrink-0" />
		<p>
			Accountability partner: <strong>{pledge.partnerName} ({pledge.partnerEmail})</strong>
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
