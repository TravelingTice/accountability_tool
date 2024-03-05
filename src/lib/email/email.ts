import { POSTMARK_API_TOKEN } from '$env/static/private'
import postmark from 'postmark'

const client = new postmark.ServerClient(POSTMARK_API_TOKEN)

type Props = {
	to: string
	subject: string
	html: string
}

export async function sendEmail({ to, subject, html }: Props) {
	const mailOptions = {
		From: '"Do It Or Else" <do-not-reply@doitorelse.net>',
		To: to,
		Subject: subject,
		HtmlBody: html,
		MessageStream: 'outbound'
	}

	try {
		const info = await client.sendEmail(mailOptions)
		console.log('Message sent: %s', info.MessageID)
		return info
	} catch (error) {
		console.error('Error sending email:', error)
		throw error
	}
}
