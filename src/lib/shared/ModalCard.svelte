<script lang="ts">
	import { browser } from '$app/environment'
	import { step, type Step } from '$lib/pledgeStore'
	import { createFocusTrap, type FocusTrap } from 'focus-trap'
	import { createEventDispatcher } from 'svelte'
	import { XIcon } from 'svelte-feather-icons'

	export let title: string
	export let forStep: Step

	let modalElement: HTMLDivElement
	let closeButton: HTMLButtonElement
	let focusTrap: FocusTrap | null = null

	let dispatchEvent = createEventDispatcher()

	// function activateFocusTrap() {
	// 	if (!browser) return

	// 	focusTrap = createFocusTrap(modalElement, {
	// 		fallbackFocus: closeButton
	// 	})
	// 	focusTrap.activate()
	// }

	// function deactivateFocusTrap() {
	// 	if (!browser) return
	// 	if (!focusTrap) return

	// 	focusTrap.deactivate()
	// 	focusTrap = null
	// }

	// // Activate focus trap when we are selected, and deactivate when not
	// $: if (modalElement) {
	// 	if ($step === forStep) {
	// 		activateFocusTrap()
	// 	} else {
	// 		deactivateFocusTrap()
	// 	}
	// }
</script>

<div class="flex h-full flex-col justify-end px-4" bind:this={modalElement}>
	<div
		class="relative w-full overflow-hidden rounded-lg bg-gray-900 px-4 pb-6 pt-6 text-left align-bottom shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
	>
		<button
			bind:this={closeButton}
			class="absolute right-1 top-1 rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
			on:click={() => ($step = null)}
		>
			<XIcon />
			<span class="sr-only">Close this popup window</span></button
		>
		<div class="space-y-4">
			<h2 id="modal-title">{title}</h2>
			<slot />
		</div>
	</div>
</div>
