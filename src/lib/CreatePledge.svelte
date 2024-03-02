<script lang="ts">
	import ModalContainer from './shared/ModalContainer.svelte'
	import Goal from './Goal.svelte'
	import Deadline from './Deadline.svelte'
	import Consequence from './Consequence.svelte'
	import Money from './Money.svelte'
	import Partner from './Partner.svelte'
	import Review from './Review.svelte'
	import You from './You.svelte'
	import CarouselContainer from './shared/CarouselContainer.svelte'

	// $: if ($step) modalOpen.on()
</script>

<ModalContainer>
	<CarouselContainer>
		<Goal />
		<Deadline />
		<Consequence />
		<Money />
		<Partner />
		<Review />
		<You />
	</CarouselContainer>
</ModalContainer>
