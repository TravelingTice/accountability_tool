<script>
	import Button from '$lib/shared/Button.svelte'
	import CreatePledge from '$lib/CreatePledge.svelte'
	import Input from '$lib/shared/Input.svelte'
	import { goal, step } from '$lib/pledgeStore'

	const handleSubmit = () => {
		$step = 'goal'
	}
</script>

<section class="mb-6 flex flex-col items-center space-y-8 px-4 pt-8 text-center">
	<h1>Do it or else...</h1>
	<h2>Link MASSIVE PAIN to not following through on your goals</h2>
	<form on:submit|preventDefault={handleSubmit} class="space-y-2">
		<label for="goal">What is your goal?</label>

		<Input placeholder="I will..." id="goal" bind:value={$goal} />

		<Button>Hold me accountable</Button>
	</form>
</section>

<section class="px-4 py-6">
	<h2 class="mb-4 text-center text-3xl font-bold">What will happen if you don't follow through?</h2>
	<ul class="grid gap-4">
		<li class="space-y-4 rounded-lg border border-gray-800 p-4">
			<h2>Donate to Trump's presidential campaign</h2>
			<div class="space-y-2">
				<p>
					Donald Trump, the 45th U.S. President, is known for his unique, and sometimes
					controversial political style. This year he's running again, focusing on strict
					immigration rules, less regulation, and putting America first.
				</p>
				<p>
					<strong>
						Choose this as your consequence of not following through if you don't support Trump and
						don't want him to become president again.
					</strong>
				</p>
			</div>
			<div class="flex w-full justify-center">
				<div class="relative mb-2 mt-6">
					<div class="absolute -right-14 -top-8 rotate-6 rounded-full bg-white p-4">
						<img class="h-16 w-16" src="/images/gop.png" alt="Republican Party logo" />
					</div>
					<img
						class="h-48 w-48 rounded-full object-cover"
						src="/images/trumpie.jpg"
						alt="Trump on stage"
					/>
				</div>
			</div>

			<Button>Donate to Trump if I don't follow through</Button>
		</li>

		<li class="space-y-4 rounded-lg border border-gray-800 p-4">
			<h2>Donate to Biden's presidential campaign</h2>
			<div class="space-y-2">
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
			<div class="flex w-full justify-center">
				<div class="relative mb-2 mt-6">
					<div class="absolute -right-14 -top-8 rotate-6 rounded-full bg-white p-4">
						<img class="h-16 w-16" src="/images/dplogo.svg" alt="Republican Party logo" />
					</div>
					<img
						class="h-48 w-48 rounded-full object-cover"
						src="/images/joetje.webp"
						alt="Joe Biden on stage"
					/>
				</div>
			</div>

			<Button>Donate to Biden if I don't follow through</Button>
		</li>

		<li class="space-y-4 rounded-lg border border-gray-800 p-4">
			<h2>Donate to the NRA (National Rifle Association)</h2>
			<div class="space-y-2">
				<p>
					The National Rifle Association (NRA) is a powerful organization in the United States that
					advocates for gun rights. It focuses on defending the Second Amendment, which allows
					Americans to own guns. The NRA is known for its influence on politics, lobbying against
					gun control laws.
				</p>
				<p>
					<strong>
						Choose this as your consequence of not following through if you don't support the NRA
						and don't stand for their values.
					</strong>
				</p>
			</div>
			<div class="flex w-full justify-center">
				<div class="relative my-2">
					<img class="h-36 rounded-lg object-cover" src="/images/nra.png" alt="Logo of the NRA" />
				</div>
			</div>

			<Button>Donate to the NRA if I don't follow through</Button>
		</li>

		<li class="space-y-4 rounded-lg border border-gray-800 p-4">
			<h2>Donate to the American Petroleum Institute</h2>
			<div class="space-y-2">
				<p>
					The American Petroleum Institute (API) is a leading organization in the U.S. that
					represents the oil and natural gas industry. It focuses on promoting the interests of its
					members by lobbying for favorable policies and regulations. It plays a key role in shaping
					energy policies and advocating for the use of fossil fuels.
				</p>
				<p>
					<strong>
						Choose this as your consequence of not following through if you don't support the
						American Petroleum Institute and don't stand for their values.
					</strong>
				</p>
			</div>
			<div class="flex w-full justify-center">
				<div class="relative my-2">
					<img
						class="h-32 rounded-lg object-cover"
						src="/images/api.jpeg"
						alt="Logo of the American Petroleum Institute"
					/>
				</div>
			</div>

			<Button>Donate to the API if I don't follow through</Button>
		</li>

		<li class="space-y-4 rounded-lg border border-gray-800 p-4">
			<h2>Donate to Greenpeace</h2>
			<div class="my-2 space-y-2">
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
			<div class="flex w-full justify-center">
				<div class="relative">
					<img
						class="h-36 rounded-lg object-cover"
						src="/images/greenpeace.jpeg"
						alt="Logo of Greenpeace"
					/>
				</div>
			</div>

			<Button>Donate to Greenpeace if I don't follow through</Button>
		</li>
	</ul>
</section>

<CreatePledge />
