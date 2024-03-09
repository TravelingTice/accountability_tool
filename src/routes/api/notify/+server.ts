import { prisma } from '$lib/prisma/client'
import { slack } from '$lib/slack/client'
import { json, type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
	const { email, feature } = await request.json()

	prisma.interestedUser
		.create({
			data: {
				email,
				feature
			}
		})
		.catch((err) =>
			console.error(`Error creating InterestedUser (email: ${email}, feature: ${feature})`, err)
		)

	slack
		.send({
			channel: '#accountability-tool',
			icon_emoji: ':bell:',
			text: `Someone wants to stay in the loop on the "${feature}" feature: ${email}`,
			username: 'Accountability Bot'
		})
		.catch((err) =>
			console.error(`There was an error with slack (email: ${email}, feature: ${feature})`, err)
		)

	return json({ success: true })
}
