<script lang="ts">
	import { fade } from 'svelte/transition'
	export let title: string
</script>

<div class="space-y-4" out:fade={{ duration: 200 }}>
	<h2 id="modal-title">{title}</h2>
	<slot />
</div>
