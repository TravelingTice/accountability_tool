<script lang="ts">
	import { browser } from '$app/environment'
	import { modalOpen } from '$lib/pledgeStore'
	import { fly } from 'svelte/transition'
	import { createFocusTrap, type FocusTrap } from 'focus-trap'
	import { XIcon } from 'svelte-feather-icons'
	export let title: string

	let modalElement: HTMLDivElement
	let closeButton: HTMLButtonElement
	let focusTrap: FocusTrap | null = null

	function toggleBodyScroll(disable: boolean) {
		if (!browser) return

		if (disable) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}

	function activateFocusTrap() {
		if (!browser) return

		focusTrap = createFocusTrap(modalElement, {
			fallbackFocus: closeButton
		})
		focusTrap.activate()
	}

	function deactivateFocusTrap() {
		console.log('deactivate')
		if (!browser) return
		if (!focusTrap) return

		focusTrap.deactivate()
	}

	$: if (modalElement) {
		if ($modalOpen) {
			toggleBodyScroll(true)
			activateFocusTrap()
		} else {
			toggleBodyScroll(false)
			deactivateFocusTrap()
		}
	}
</script>

<div
	bind:this={modalElement}
	class="relative inline-block w-full transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-6 pt-6 text-left align-bottom shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
	in:fly={{ x: 300, duration: 300 }}
	out:fly={{ x: -300, duration: 300 }}
>
	<button
		bind:this={closeButton}
		class="absolute right-1 top-1 rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
		on:click={modalOpen.off}
	>
		<XIcon />
		<span class="sr-only">Close this popup window</span></button
	>
	<div class="space-y-4">
		<h2 id="modal-title">{title}</h2>
		<slot />
	</div>
</div>
