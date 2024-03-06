import { POSTMARK_API_TOKEN } from '$env/static/private'
import postmark from 'postmark'
import type { Pledge } from '$lib/pledgeStore'
import { consequenceAsSentence, consequenceAsWord } from '$lib/consequenceAsSentence'
import { loadTemplate, type Template } from './loadTemplate'

export const sendEmailTemplate = async (template: Template, pledge: Pledge, to: string) => {
	const consequence = consequenceAsWord(pledge.consequence)
	const fullConsequence = consequenceAsSentence(pledge.consequence, pledge.amount)
	const deadline = new Date(pledge.deadline).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})

	const htmlTemplate = await loadTemplate(template, {
		...pledge,
		consequence,
		deadline,
		fullConsequence
	})

	// Regular expression to match the content of the <title> tag
	const titleRegex = /<title>(.*?)<\/title>/i
	const subject = htmlTemplate.match(titleRegex)?.[1]

	if (!subject) throw new Error(`No subject found in template ${template}.html`)

	sendEmail({
		html: htmlTemplate,
		to,
		subject
	})
}

const client = new postmark.ServerClient(POSTMARK_API_TOKEN)

type SendEmailArgs = {
	to: string
	subject: string
	html: string
}

export const sendEmail = async ({ to, subject, html }: SendEmailArgs) => {
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
	}
}
