<script lang="ts">
	import Siema from 'siema'
	import { browser } from '$app/environment'
	import { step, steps } from '../pledgeStore'
	import { createEventDispatcher } from 'svelte'

	let siemaContainer: HTMLDivElement
	let siema: Siema | null = null

	let dispatchEvent = createEventDispatcher()

	$: if (browser && $step && siemaContainer) {
		if (siema) {
			siema.goTo(steps.indexOf($step))
		} else {
			siema = new Siema({
				draggable: false,
				multipleDrag: false,
				selector: siemaContainer,
				startIndex: steps.indexOf($step),
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
	}

	$: if (!$step && siema) {
		siema?.destroy()
		siema = null
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click|self={() => dispatchEvent('close')} class="flex flex-col" bind:this={siemaContainer}>
	<slot />
</div>
