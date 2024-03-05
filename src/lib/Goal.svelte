<script lang="ts">
	import { goal, step } from './pledgeStore'
	import { AlertTriangleIcon, CheckIcon } from 'svelte-feather-icons'
	import Input from './shared/Input.svelte'
	import Button from './shared/Button.svelte'
	import ModalCard from './shared/ModalCard.svelte'

	let error = false

	const handleSubmit = () => {
		if (!$goal) return (error = true)
		else step.next()
	}
</script>

<ModalCard forStep="goal" title="Create your pledge">
	<div class="space-y-2">
		<div class="flex gap-2">
			<AlertTriangleIcon size="20" class="mt-1 shrink-0 text-yellow-400" />
			<p>
				You're about to link MASSIVE PAIN to not following through on your goal. Hence make sure
				your goal adheres to the following principles:
			</p>
		</div>

		<ul class="space-y-1">
			<li class="flex gap-2">
				<CheckIcon size="20" class="mt-1 shrink-0 text-green-600" />
				<p>
					<strong>Manageable.</strong> Make sure it's realistic and attainable for you.
				</p>
			</li>
			<li class="flex gap-2">
				<CheckIcon size="20" class="mt-1 shrink-0 text-green-600" />
				<p>
					<strong>Measurable.</strong> Define clear criteria to track progress. For example "I will lose
					5 pounds by x date".
				</p>
			</li>
			<li class="flex gap-2">
				<CheckIcon size="20" class="mt-1 shrink-0 text-green-600" />
				<p>
					<strong>Motivational.</strong> The goal should be something you're passionate about.
				</p>
			</li>
			<li class="flex gap-2">
				<CheckIcon size="20" class="mt-1 shrink-0 text-green-600" />
				<p>
					<strong>Monitorable.</strong> Use numbers and dates to easily track progress on the way.
				</p>
			</li>
			<li class="flex gap-2">
				<CheckIcon size="20" class="mt-1 shrink-0 text-green-600" />
				<p>
					<strong>Meaningful.</strong> Make sure your goal holds a significant value to you.
				</p>
			</li>
		</ul>
	</div>
	<form on:submit|preventDefault={handleSubmit} class="space-y-2">
		<label for="goal-offi">Your goal:</label>
		<Input on:keyup={() => (error = false)} {error} id="goal-offi" bind:value={$goal} />
		{#if error}<p class="text-sm text-red-400">Goal cannot be blank</p>{/if}
		<div class="flex justify-end">
			<Button>Confirm</Button>
		</div>
	</form>
</ModalCard>
