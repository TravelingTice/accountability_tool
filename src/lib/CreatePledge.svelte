<script lang="ts">
	import ModalContainer from './shared/ModalContainer.svelte'
	import { modalOpen, step } from './pledgeStore'
	import Goal from './Goal.svelte'
	import Deadline from './Deadline.svelte'
	import Consequence from './Consequence.svelte'
	import Money from './Money.svelte'
	import Partner from './Partner.svelte'
	import Review from './Review.svelte'
	import You from './You.svelte'

	$: if ($step) modalOpen.on()

	const onClose = () => {
		$step = null
		modalOpen.off()
	}
</script>

<ModalContainer isOpen={$modalOpen && Boolean($step)} on:close={onClose}>
	{#if $step === 'goal'}
		<Goal />
	{:else if $step === 'deadline'}
		<Deadline />
	{:else if $step === 'consequence'}
		<Consequence />
	{:else if $step === 'money'}
		<Money />
	{:else if $step === 'partner'}
		<Partner />
	{:else if $step === 'review'}
		<Review />
	{:else if $step === 'you'}
		<You />
	{/if}
</ModalContainer>
