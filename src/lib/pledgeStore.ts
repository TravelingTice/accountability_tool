import { createBooleanStore } from './shared/createBooleanStore'
import { queryParam, ssp } from 'sveltekit-search-params'

/**
 * UI UX STATES
 */

export const modalOpen = createBooleanStore(false)

type Step = 'goal' | 'deadline' | 'consequence' | 'money' | 'partner' | 'review'

export const step = queryParam<Step>('step')

/**
 * PLEDGE STATES
 */

export const goal = queryParam('goal', ssp.string(), { pushHistory: false })

// defaultDate = 1 month from now
const defaultDate = new Date()
defaultDate.setMonth(defaultDate.getMonth() + 1)
const defaultDateStr = defaultDate.toISOString().split('T')[0]

export const deadline = queryParam<string>('deadline', ssp.string(defaultDateStr), {
	pushHistory: false
})

export type Consequence = 'trump' | 'biden' | 'nra' | 'api' | 'greenpeace'

export const consequence = queryParam<Consequence>('consequence', undefined, { pushHistory: false })

export const amount = queryParam('amount', ssp.number(), { pushHistory: false })

export const partnerName = queryParam('partnerName', ssp.string(), { pushHistory: false })

export const partnerEmail = queryParam('partnerEmail', ssp.string(), { pushHistory: false })
