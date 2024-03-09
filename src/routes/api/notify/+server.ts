import { SLACK_WEBHOOK_URL } from '$env/static/private'
import { prisma } from '$lib/prisma/client'
import { json, type RequestHandler } from '@sveltejs/kit'
import SlackNotify from 'slack-notify'

const slack = SlackNotify(SLACK_WEBHOOK_URL)

export const POST: RequestHandler = async ({ request }) => {
	const { email, feature } = await request.json()

	prisma.interestedUser
		.create({
			data: {
				email,
				feature
			}
		})
		.catch((err) => console.error('Error creating InterestedUser', err))

	slack
		.send({
			channel: '#accountability-tool',
			icon_emoji: ':bell:',
			text: `Someone wants to stay in the loop on the "${feature}" feature: ${email}`,
			username: 'Accountability Bot'
		})
		.catch((err) => console.error('There was an error with slack', err))

	return json({ success: true })
}
