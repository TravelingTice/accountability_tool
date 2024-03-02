import { SECRET_STRIPE_KEY } from '$env/static/private'
import { json, type RequestHandler } from '@sveltejs/kit'
import Stripe from 'stripe'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export const POST: RequestHandler = async ({ request }) => {
	const { amount, goal, consequence, partnerName, partnerEmail, deadline } = await request.json()

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		metadata: {
			amount,
			goal,
			consequence,
			partnerName,
			partnerEmail,
			deadline
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
		// TODO: When cancel, go back to the previous page, re-instate search params + step, and add cancel=true to show cancellation message.
		cancel_url: `${request.headers.get('origin')}/cancel`
	})

	return json({ redirectTo: session.url }, { status: 201 })
}
