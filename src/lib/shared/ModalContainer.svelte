<script lang="ts">
	import { fade } from 'svelte/transition'
	import { modalOpen, step } from '$lib/pledgeStore'
	import { browser } from '$app/environment'

	let modalElement: HTMLDivElement

	function toggleBodyScroll(disable: boolean) {
		if (!browser) return

		if (disable) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}

	// function activateFocusTrap() {
	// 	if (!browser) return

	// 	focusTrap = createFocusTrap(modalElement, {
	// 		fallbackFocus: closeButton
	// 	})
	// 	focusTrap.activate()
	// }

	// function deactivateFocusTrap() {
	// 	console.log('deactivate')
	// 	if (!browser) return
	// 	if (!focusTrap) return

	// 	focusTrap.deactivate()
	// }

	$: if ($modalOpen) {
		toggleBodyScroll(true)
		// activateFocusTrap()
	} else {
		toggleBodyScroll(false)
		// deactivateFocusTrap()
	}

	$: if ($step) modalOpen.on()
</script>

{#if $modalOpen && $step}
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
			on:click|self={modalOpen.off}
			class="flex min-h-screen flex-col justify-end bg-black bg-opacity-50 pb-20 pt-4 sm:block sm:p-0"
		>
			<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
				>&#8203;</span
			>
			<slot />
		</div>
	</div>
{/if}
