import type { PageServerLoad } from './$types'
import { SECRET_STRIPE_KEY } from '$env/static/private'
import Stripe from 'stripe'
import { error } from '@sveltejs/kit'
import type { Pledge } from '$lib/createPledge/pledgeStore'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export const load: PageServerLoad = async ({ url }) => {
	const sessionId = url.searchParams.get('session_id')

	if (!sessionId) return error(400, 'No session_id provided')

	const session = await stripe.checkout.sessions.retrieve(sessionId)

	if (!session.metadata) return error(404, 'No metadata found in session')

	return JSON.parse(session.metadata.pledge) as unknown as Pledge
}
