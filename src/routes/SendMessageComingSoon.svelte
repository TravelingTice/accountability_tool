<script lang="ts">
	import { messageComingSoonModal } from '$lib/comingSoon/modalsStore'
	import { deadline, goal, step } from '$lib/createPledge/pledgeStore'
	import Button from '$lib/shared/Button.svelte'
	import Input from '$lib/shared/Input.svelte'
	import ModalCard from '$lib/shared/ModalCard.svelte'
	import ModalContainer from '$lib/shared/ModalContainer.svelte'
	import { CheckIcon } from 'svelte-feather-icons'
	import type { FormEventHandler } from 'svelte/elements'

	let email = ''
	let loading = false
	let success = false

	const handleSubmit: FormEventHandler<HTMLFormElement> = () => {
		loading = true

		fetch('/api/notify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, feature: 'private message' })
		}).then(() => {
			loading = false
			success = true
		})
	}

	const onTryAnother = () => {
		messageComingSoonModal.off()
		if ($goal && $deadline) {
			$step = 'consequence'
		} else {
			$step = 'goal'
		}
	}
</script>

<ModalContainer isOpen={$messageComingSoonModal} on:close={messageComingSoonModal.off}>
	<ModalCard on:close={messageComingSoonModal.off} title="This feature is coming soon!">
		<p>We're working hard to bring you this feature! And we hope to be able to launch it soon.</p>
		<img class="mx-auto h-56" src="/images/message.png" alt="Demo private message" />
		<p>
			<strong>
				If you want to get notified as soon as the feature arrives, please leave your email below:
			</strong>
		</p>
		{#if success}
			<div class="flex gap-2">
				<CheckIcon class="text-green-600" />
				<p>Thanks! We'll let you know as soon as it's ready 😁</p>
			</div>
			<Button on:click={onTryAnother}>Try another consequence instead</Button>
		{:else}
			<form on:submit|preventDefault={handleSubmit} class="space-y-2">
				<label for="email-post-soon">Your email:</label>
				<Input required type="email" bind:value={email} />
				<Button aria-disabled={loading}>{loading ? 'Hold on a sec... ' : 'Notify me'}</Button>
			</form>
		{/if}
	</ModalCard>
</ModalContainer>
