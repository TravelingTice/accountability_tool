<script lang="ts">
	import Button from '$lib/shared/Button.svelte'
	import CreatePledge from '$lib/CreatePledge.svelte'
	import Input from '$lib/shared/Input.svelte'
	import { goal, step } from '$lib/pledgeStore'
	import ConsequenceList from './ConsequenceList.svelte'
	import FAQ from './FAQ.svelte'

	const handleSubmit = () => {
		$step = 'goal'
	}
</script>

<svelte:head>
	<title>Do It Or Else - Link Massive Pain To Not Achieving Your Goal</title>
	<link rel="canonical" href="https://doitorelse.net" />
	<meta
		name="description"
		content="Struggle to follow through on goals? 'Do It Or Else' links painful consequences to inaction, making it your ultimate accountability partner. Discover how!"
	/>
</svelte:head>

<div class="my-8 space-y-12">
	<section class="flex flex-col items-center space-y-8 px-4 text-center">
		<div class="space-y-6">
			<h1>Do it or else...</h1>
			<h2 class="subtitle">Link MASSIVE PAIN to not following through on your goals</h2>
		</div>
		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<label for="goal">What is your goal?</label>

				<Input class="w-auto md:w-72" placeholder="I will..." id="goal" bind:value={$goal} />
			</div>

			<Button>Hold me accountable</Button>
		</form>
	</section>

	<section class="overflow-hidden px-4">
		<h2 class="mb-4 text-center">What will happen if you don't follow through?</h2>
		<ConsequenceList />
	</section>

	<section>
		<h2 class="mb-4 text-center font-bold">FAQ</h2>

		<FAQ />
	</section>
</div>

<footer class="py-8">
	<p class="text-center">
		Do It Or Else is a project by <a class="underline" href="https://twitter.com/travelingtice"
			>Tice Kralt</a
		>
	</p>
</footer>

<CreatePledge />
