<script lang="ts">
	import type { PageServerData } from './$types'
	import PledgeDetails from '$lib/createPledge/PledgeDetails.svelte'
	import ButtonLink from '$lib/shared/ButtonLink.svelte'

	export let data: PageServerData
</script>

<svelte:head>
	<title>You did it {data.name}!!! Review your pledge - Do It Or Else</title>

	<meta
		property="og:title"
		content="You did it {data.name}!!! Review your pledge - Do It Or Else"
	/>
</svelte:head>

<section class="mx-auto flex max-w-xl flex-col items-center space-y-8 px-4 py-8 text-center">
	<h1>You did it!</h1>
	<p>
		Congratulations! Just now you linked MASSIVE PAIN to not following up on your goals. You put
		your values on the line. Maybe even your identity. This is a HUGE motivator. Now don't sit
		around no more. Go do the thing you MUST do now! And make yourself proud.
	</p>
	<div class="space-y-4">
		<h2>Review of your pledge:</h2>
		<PledgeDetails pledge={data} />
	</div>
	<ButtonLink href="/">Back to home page</ButtonLink>
</section>
