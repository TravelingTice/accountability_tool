<script lang="ts">
	import { fade } from 'svelte/transition'
	import { modalOpen } from '$lib/pledgeStore'
</script>

{#if $modalOpen}
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
			class="flex min-h-screen items-end justify-center bg-black bg-opacity-50 px-4 pb-20 pt-4 text-center sm:block sm:p-0"
		>
			<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
				>&#8203;</span
			>
			<slot />
		</div>
	</div>
{/if}
