<script lang="ts">
	import ModalContainer from '../lib/shared/ModalContainer.svelte'
	import Goal from '../lib/createPledge/Goal.svelte'
	import Deadline from '../lib/createPledge/Deadline.svelte'
	import Consequence from '../lib/createPledge/Consequence.svelte'
	import Money from '../lib/createPledge/Money.svelte'
	import Partner from '../lib/createPledge/Partner.svelte'
	import Review from '../lib/createPledge/Review.svelte'
	import You from '../lib/createPledge/You.svelte'
	import CarouselContainer from '../lib/shared/CarouselContainer.svelte'
	import { step } from '../lib/createPledge/pledgeStore'

	const handleClose = () => ($step = null)
</script>

<ModalContainer isOpen={Boolean($step)} on:close={handleClose}>
	<CarouselContainer on:close={handleClose}>
		<Goal />
		<Deadline />
		<Consequence />
		<Money />
		<Partner />
		<Review />
		<You />
	</CarouselContainer>
</ModalContainer>
