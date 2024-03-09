import { SLACK_WEBHOOK_URL } from '$env/static/private'
import { json, type RequestHandler } from '@sveltejs/kit'
import SlackNotify from 'slack-notify'

const slack = SlackNotify(SLACK_WEBHOOK_URL)

export const POST: RequestHandler = async ({ request }) => {
	const { email, feature } = await request.json()

	slack.send({
		channel: '#accountability-tool',
		icon_emoji: ':bell:',
		text: `Someone wants to stay in the loop on the "${feature}" feature: ${email}`,
		username: 'Accountability Bot'
	})

	return json({ success: true })
}
