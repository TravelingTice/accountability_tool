<script lang="ts">
	import Button from '$lib/shared/Button.svelte'
	import { step, consequence, type Consequence } from '$lib/pledgeStore'

	const handleChooseConsequence = (consequence: Consequence) => () => {
		$step = 'goal'
		$consequence = consequence
	}
</script>

<ul class="consequence-list">
	<li class="consequence-list-item">
		<h2 class="title">Donate to Trump's presidential campaign</h2>

		<div class="text">
			<p>
				Donald Trump, the 45th U.S. President, is known for his unique, and sometimes controversial
				political style. This year he's running again, focusing on strict immigration rules, less
				regulation, and putting America first.
			</p>
			<p>
				<strong>
					Choose this as your consequence of not following through if you don't support Trump and
					don't want him to become president again.
				</strong>
			</p>
		</div>

		<div class="image politician">
			<div class="image-container">
				<div class="logo-container">
					<img src="/images/gop.png" alt="Republican Party logo" />
				</div>
				<img class="face-image" src="/images/trumpie.jpg" alt="Trump on stage" />
			</div>
		</div>

		<div class="button-container">
			<Button on:click={handleChooseConsequence('trump')}
				>Donate to Trump if I don't follow through</Button
			>
		</div>
	</li>

	<li class="consequence-list-item">
		<h2 class="title">Donate to Biden's presidential campaign</h2>
		<div class="text">
			<p>
				Joe Biden, the 46th President of the United States, focuses on unity, healthcare
				improvement, and climate action. He supports stronger alliances abroad and policies for
				middle-class growth. Biden uses a more traditional approach to communicate and govern.
			</p>
			<p>
				<strong>
					Choose this as your consequence of not following through if you don't support Biden and
					don't want him to become president again.
				</strong>
			</p>
		</div>
		<div class="image politician">
			<div class="image-container">
				<div class="logo-container">
					<img src="/images/dplogo.svg" alt="Republican Party logo" />
				</div>
				<img class="face-image" src="/images/joetje.webp" alt="Joe Biden on stage" />
			</div>
		</div>

		<div class="button-container">
			<Button on:click={handleChooseConsequence('biden')}
				>Donate to Biden if I don't follow through</Button
			>
		</div>
	</li>

	<li class="consequence-list-item">
		<h2 class="title">Donate to the NRA (National Rifle Association)</h2>
		<div class="text">
			<p>
				The National Rifle Association (NRA) is a powerful organization in the United States that
				advocates for gun rights. It focuses on defending the Second Amendment, which allows
				Americans to own guns. The NRA is known for its influence on politics, lobbying against gun
				control laws.
			</p>
			<p>
				<strong>
					Choose this as your consequence of not following through if you don't support the NRA and
					don't stand for their values.
				</strong>
			</p>
		</div>
		<div class="image logo">
			<div class="relative my-2">
				<img class="h-36 rounded-lg object-cover" src="/images/nra.png" alt="Logo of the NRA" />
			</div>
		</div>

		<div class="button-container">
			<Button on:click={handleChooseConsequence('nra')}
				>Donate to the NRA if I don't follow through</Button
			>
		</div>
	</li>

	<li class="consequence-list-item">
		<h2 class="title">Donate to the American Petroleum Institute</h2>
		<div class="text">
			<p>
				The American Petroleum Institute (API) is a leading organization in the U.S. that represents
				the oil and natural gas industry. It focuses on promoting the interests of its members by
				lobbying for favorable policies and regulations. It plays a key role in shaping energy
				policies and advocating for the use of fossil fuels.
			</p>
			<p>
				<strong>
					Choose this as your consequence of not following through if you don't support the American
					Petroleum Institute and don't stand for their values.
				</strong>
			</p>
		</div>
		<div class="image logo">
			<div class="relative my-2">
				<img
					class="h-32 rounded-lg object-cover"
					src="/images/api.jpeg"
					alt="Logo of the American Petroleum Institute"
				/>
			</div>
		</div>

		<div class="button-container">
			<Button on:click={handleChooseConsequence('api')}
				>Donate to the API if I don't follow through</Button
			>
		</div>
	</li>

	<li class="consequence-list-item">
		<h2 class="title">Donate to Greenpeace</h2>
		<div class="text">
			<p>
				Greenpeace is an international environmental organization known for its activism against
				pollution, deforestation, and climate change. It campaigns for renewable energy and the
				protection of natural habitats. Greenpeace uses direct action, research, and advocacy to
				raise awareness and drive environmental change.
			</p>
			<p>
				<strong>
					Choose this as your consequence of not following through if you don't support Greenpeace
					and don't stand for their values.
				</strong>
			</p>
		</div>
		<div class="image logo">
			<div class="relative">
				<img
					class="h-36 rounded-lg object-cover"
					src="/images/greenpeace.jpeg"
					alt="Logo of Greenpeace"
				/>
			</div>
		</div>

		<div class="button-container">
			<Button on:click={handleChooseConsequence('greenpeace')}
				>Donate to Greenpeace if I don't follow through</Button
			>
		</div>
	</li>
</ul>

<style>
	.consequence-list {
		@apply flex flex-col gap-4 md:gap-6;
	}

	.consequence-list-item {
		@apply mx-auto w-full max-w-md space-y-4 rounded-lg border border-gray-800 p-4 md:max-w-3xl;
		@apply md:space-y-2;
		@media (min-width: 768px) {
			display: grid;
			grid-template-areas:
				'title image'
				'text image'
				'button image';
			grid-template-columns: 1fr auto;
			grid-gap: 1rem;
		}
	}

	.consequence-list-item:nth-child(even) {
		@media (min-width: 768px) {
			grid-template-areas:
				'image title'
				'image text'
				'image button';
			grid-template-columns: auto 1fr;
		}
	}

	.consequence-list-item .title {
		grid-area: title;
	}

	.consequence-list-item:nth-child(even) .title {
		@apply md:text-right;
	}

	.consequence-list-item .text {
		grid-area: text;
		@apply space-y-2 md:max-w-sm;
	}

	.consequence-list-item:nth-child(even) .text {
		@apply md:place-self-end;
	}

	.consequence-list-item .image {
		grid-area: image;
		place-self: center;
		@apply flex w-full justify-center;
	}

	.consequence-list-item .image.politician .image-container {
		@apply relative mb-2 mt-6 md:mr-8;
	}

	.consequence-list-item .image.politician .logo-container {
		@apply absolute -right-14 -top-8 rotate-6 rounded-full bg-white p-4 md:-right-8;
	}

	.consequence-list-item .image.politician .face-image {
		@apply h-48 w-48 rounded-full object-cover md:h-40 md:w-40;
	}

	.consequence-list-item .image.politician .logo-container img {
		@apply h-16 w-16 md:h-12 md:w-12;
	}

	.consequence-list-item .image.logo img {
		@apply md:h-auto md:w-48;
	}

	.consequence-list-item .button-container {
		grid-area: button;
		@apply flex justify-center md:justify-start;
	}

	.consequence-list-item:nth-child(even) .button-container {
		@media (min-width: 768px) {
			justify-content: flex-end;
		}
	}
</style>
