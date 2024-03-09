import { SECRET_STRIPE_KEY } from '$env/static/private'
import type { Pledge } from '$lib/createPledge/pledgeStore'
import { json, type RequestHandler } from '@sveltejs/kit'
import Stripe from 'stripe'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export const POST: RequestHandler = async ({ request }) => {
	const {
		amount,
		goal,
		consequence,
		partnerName,
		partnerEmail,
		deadline,
		name,
		canPublic,
		notifyPartner
	} = await request.json()

	const cancelSearchParams = new URLSearchParams()
	cancelSearchParams.set('cancel', 'true')

	// Reinstate search params to previous state
	cancelSearchParams.set('step', 'you')
	cancelSearchParams.set('amount', amount)
	cancelSearchParams.set('goal', goal)
	cancelSearchParams.set('consequence', consequence)
	cancelSearchParams.set('partnerName', partnerName)
	cancelSearchParams.set('partnerEmail', partnerEmail)
	cancelSearchParams.set('deadline', deadline)
	cancelSearchParams.set('name', name)
	cancelSearchParams.set('notifyPartner', notifyPartner)
	cancelSearchParams.set('canPublic', canPublic)

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		metadata: {
			pledge: JSON.stringify({
				amount,
				goal,
				consequence,
				partnerName,
				partnerEmail,
				deadline,
				canPublic,
				name
			} satisfies Pledge),
			notifyPartner
		},
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: 'Pledge money amount'
					},
					unit_amount: amount * 100 // Convert dollars to cents
				},
				quantity: 1
			}
		],
		mode: 'payment',
		success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${request.headers.get('origin')}/?${cancelSearchParams.toString()}`
	})

	return json({ redirectTo: session.url }, { status: 201 })
}
