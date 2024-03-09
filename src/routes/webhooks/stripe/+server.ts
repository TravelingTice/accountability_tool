import { SECRET_STRIPE_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private'
import { sendEmailTemplate } from '$lib/email/sendEmail'
import type { Pledge } from '$lib/createPledge/pledgeStore'
import { sendSlackNotification } from '$lib/slack/sendSlackNotification'
import { PrismaClient } from '@prisma/client'
import { error, json, type RequestHandler } from '@sveltejs/kit'
import Stripe from 'stripe'
import { dev } from '$app/environment'

const prisma = new PrismaClient()
const stripe = new Stripe(SECRET_STRIPE_KEY)

export const POST: RequestHandler = async ({ request }) => {
	const sig = request.headers.get('stripe-signature')

	if (!sig) return error(400, 'No signature provided')

	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(await request.text(), sig, STRIPE_WEBHOOK_SECRET)
	} catch (err) {
		return error(400, `Webhook Error: ${err.message}`)
	}

	if (event.type !== 'checkout.session.completed') return json({ received: false })

	const session = event.data.object as Stripe.Checkout.Session

	if (!session.metadata?.pledge) return error(400, 'No pledge metadata found')

	const pledge = JSON.parse(session.metadata.pledge) as Pledge

	const email = session.customer_details?.email ?? ''

	try {
		await prisma.pledge.create({
			data: {
				...pledge,
				email,
				deadline: new Date(pledge.deadline)
			}
		})
	} catch (err) {
		return error(500, `Error creating pledge: ${JSON.stringify(err)}`)
	}

	const { notifyPartner } = session.metadata

	// Only notify in prod
	if (dev) return json({ received: true })

	if (notifyPartner === 'true') {
		sendEmailTemplate('notifyPartner', pledge, pledge.partnerEmail)
	}

	sendEmailTemplate('confirmation', pledge, email)

	sendSlackNotification(pledge)

	return json({ received: true })
}
