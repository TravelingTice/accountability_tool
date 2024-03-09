import { SLACK_WEBHOOK_URL } from '$env/static/private'
import { consequenceAsSentence } from '$lib/createPledge/consequenceAsSentence'
import type { Pledge } from '$lib/createPledge/pledgeStore'
import SlackNotify from 'slack-notify'
const slack = SlackNotify(SLACK_WEBHOOK_URL)

export const sendSlackNotification = (pledge: Pledge) => {
	const pledgeSentence = `*${pledge.name}* pledged to "*${pledge.goal}*" by *${pledge.deadline}* or else *${consequenceAsSentence(pledge.consequence, pledge.amount)}*`

	slack
		.send({
			channel: '#accountability-tool',
			icon_emoji: ':tada:',
			text: `WOOHOO!! ${pledgeSentence}`,
			username: 'Accountability Bot'
		})
		.catch((err) => console.error('There was an error with slack', err))
}
