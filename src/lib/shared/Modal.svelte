<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { XIcon } from 'svelte-feather-icons'
	import { fade } from 'svelte/transition'
	import { createFocusTrap, type FocusTrap } from 'focus-trap'
	import { browser } from '$app/environment'

	const dispatchEvent = createEventDispatcher()

	export let isOpen = false
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
		if (isOpen) {
			toggleBodyScroll(true)
			activateFocusTrap()
		} else {
			toggleBodyScroll(false)
			deactivateFocusTrap()
		}
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-10 overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 300 }}
	>
		<!-- Cross icon is focusable to close modal -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:click|self={() => dispatchEvent('close')}
			class="flex min-h-screen items-end justify-center bg-black bg-opacity-50 px-4 pb-20 pt-4 text-center sm:block sm:p-0"
		>
			<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
				>&#8203;</span
			>

			<div
				bind:this={modalElement}
				class="relative inline-block w-full transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-6 pt-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
				transition:fade={{ duration: 300 }}
			>
				<button
					bind:this={closeButton}
					class="absolute right-1 top-1 rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
					on:click={() => dispatchEvent('close')}
				>
					<XIcon />
					<span class="sr-only">Close this popup window</span></button
				>
				<slot />
			</div>
		</div>
	</div>
{/if}
