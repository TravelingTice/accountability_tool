import { SLACK_WEBHOOK_URL } from '$env/static/private'
import SlackNotify from 'slack-notify'

export const slack = SlackNotify(SLACK_WEBHOOK_URL)
