<script lang="ts">
	import Siema from 'siema'
	import { browser } from '$app/environment'
	import { modalOpen, step, steps } from '../pledgeStore'

	let siemaContainer: HTMLDivElement
	let siema: Siema | null = null

	$: if (browser && $modalOpen && siemaContainer) {
		siema = new Siema({
			draggable: false,
			multipleDrag: false,
			selector: siemaContainer,
			duration: 200,
			easing: 'ease-in-out',
			onInit: () => {
				siemaContainer.firstChild.style.display = 'flex'
				siemaContainer.firstChild?.childNodes.forEach((node) => {
					node.style.flexGrow = 1
				})
			}
		})
	}

	$: if (!$modalOpen) {
		siema?.destroy()
		siema = null
	}

	$: if ($step) {
		siema?.goTo(steps.indexOf($step))
	}
</script>

<div class="flex flex-col" bind:this={siemaContainer}>
	<slot />
</div>
