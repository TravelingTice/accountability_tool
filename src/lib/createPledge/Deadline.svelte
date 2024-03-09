<script lang="ts">
	import ModalCard from '../shared/ModalCard.svelte'
	import Button from '../shared/Button.svelte'
	import { deadline, step } from './pledgeStore'
	import DateInput from '../shared/DateInput.svelte'

	let error: string | null = null

	const handleSubmit = () => {
		if (!$deadline) {
			error = 'Please enter a valid date.'
			return
		}

		const today = new Date()
		today.setHours(0, 0, 0, 0) // Set time to 00:00:00 to ignore time part in comparison

		const inputDate = new Date($deadline)
		inputDate.setHours(0, 0, 0, 0) // Set time to 00:00:00 to ignore time part in comparison

		const oneYearFromToday = new Date()
		oneYearFromToday.setFullYear(oneYearFromToday.getFullYear() + 1)

		if (inputDate <= today) {
			error = 'The date must be in the future and not today.'
		} else if (inputDate > oneYearFromToday) {
			error = 'The date must not be more than one year into the future.'
		} else {
			error = null
			step.next()
		}
	}
</script>

<ModalCard title="When will you complete your goal by?" on:close={() => ($step = null)}>
	<form on:submit|preventDefault={handleSubmit} class="space-y-2">
		<label class="block" for="deadline">Deadline</label>

		<DateInput error={Boolean(error)} bind:value={$deadline} />
		{#if error}<p class="text-sm text-red-400">{error}</p>{/if}
		<div class="flex justify-between">
			<Button variant="outline" type="button" on:click={step.previous}>Back</Button>
			<Button>Continue</Button>
		</div>
	</form>
</ModalCard>
