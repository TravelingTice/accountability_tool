<script lang="ts">
	import { onMount } from 'svelte'
	import ModalCard from './shared/ModalCard.svelte'
	import { consequence, step } from './pledgeStore'
	import Button from './shared/Button.svelte'

	const handleSubmit = () => {
		step.next()
	}

	onMount(() => {
		// Weird searchparams bug where this param gets reset when navigating to it
		$step = 'consequence'
	})
</script>

<ModalCard title="What will your consequence be if you don't follow through?">
	<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
		<div role="radiogroup" aria-labelledby="groupLabel">
			<p class="sr-only" id="groupLabel">Choose a consequence:</p>

			<label class:selected={$consequence === 'trump'} for="trump">
				<input type="radio" id="trump" name="options" bind:group={$consequence} value="trump" />
				<p>Donate to Trump's presidential campaign</p>
				<img src="/images/trumpie.jpg" alt="Trump on stage" />
			</label>

			<label class:selected={$consequence === 'biden'} for="biden">
				<input type="radio" id="biden" name="options" bind:group={$consequence} value="biden" />
				<p>Donate to Biden's presidential campaign</p>
				<img src="/images/joetje.webp" alt="Biden on stage" />
			</label>

			<label class:selected={$consequence === 'nra'} for="nra">
				<input type="radio" id="nra" name="options" bind:group={$consequence} value="nra" />
				<p>Donate to the NRA (National Rifle Association)</p>
				<img src="/images/nra-round.jpeg" alt="NRA Logo" />
			</label>

			<label class:selected={$consequence === 'api'} for="api">
				<input type="radio" id="api" name="options" bind:group={$consequence} value="api" />
				<p>Donate to the API (American Petroleum Institute)</p>
				<img src="/images/api-round.png" alt="API Logo" />
			</label>

			<label class:selected={$consequence === 'greenpeace'} for="greenpeace">
				<input
					type="radio"
					id="greenpeace"
					name="options"
					bind:group={$consequence}
					value="greenpeace"
				/>
				<p>Donate to Greenpeace</p>
				<img src="/images/greenpeace.jpeg" alt="Greenpeace Logo" />
			</label>
		</div>

		<div class="flex justify-between">
			<Button variant="outline" type="button" on:click={step.previous}>Back</Button>
			<Button>Continue</Button>
		</div>
	</form>
</ModalCard>

<style>
	[role='radiogroup'] {
		@apply flex flex-col gap-2;
	}

	[role='radiogroup'] label {
		@apply flex cursor-pointer items-center rounded-lg bg-slate-100 px-4 py-2 text-lg font-bold text-gray-700;
	}

	[role='radiogroup'] label p {
		@apply grow;
	}

	[role='radiogroup'] input {
		@apply appearance-none;
	}

	[role='radiogroup'] img {
		@apply h-16 w-16 rounded-full object-cover;
	}

	[role='radiogroup'] label.selected {
		@apply ring-2 ring-sky-400 ring-offset-2 ring-offset-sky-400;
	}
</style>
