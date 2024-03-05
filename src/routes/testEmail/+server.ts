import { sendEmail } from '$lib/email/email'
import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	console.log('Sending email...')

	await sendEmail({
		to: 'matthijs29@live.com',
		subject: 'A test',
		html: 'Hi there! this is a nice test'
	})

	console.log('Email sent')

	return json({ success: true })
}
