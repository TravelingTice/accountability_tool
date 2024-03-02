<script lang="ts">
	import { fade } from 'svelte/transition'
	import { step } from '$lib/pledgeStore'
	import { browser } from '$app/environment'
	import { createEventDispatcher, onMount } from 'svelte'

	const dispatchEvent = createEventDispatcher()

	let hydrated = false

	function toggleBodyScroll(disable: boolean) {
		if (!browser) return

		if (disable) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	}

	$: if ($step) {
		toggleBodyScroll(true)
	} else {
		toggleBodyScroll(false)
	}

	onMount(() => {
		hydrated = true
	})
</script>

{#if $step && hydrated}
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
			class="flex min-h-screen flex-col justify-end bg-black bg-opacity-50 pb-20 pt-4 sm:block sm:p-0"
		>
			<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
				>&#8203;</span
			>
			<slot />
		</div>
	</div>
{/if}
