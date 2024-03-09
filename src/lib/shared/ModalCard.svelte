<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { XIcon } from 'svelte-feather-icons'

	export let title: string

	let modalElement: HTMLDivElement
	let closeButton: HTMLButtonElement

	const dispatchEvent = createEventDispatcher()
</script>

<div class="flex h-full flex-col justify-end px-4 sm:justify-center" bind:this={modalElement}>
	<div
		class="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-gray-900 px-4 pb-6 pt-6 text-left align-bottom shadow-xl"
	>
		<button
			bind:this={closeButton}
			class="absolute right-1 top-1 rounded-full p-2 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
			on:click={() => dispatchEvent('close')}
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
