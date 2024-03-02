import { queryParam, ssp } from 'sveltekit-search-params'

/**
 * UI UX STATES
 */

export const steps = [
	'goal',
	'deadline',
	'consequence',
	'money',
	'partner',
	'review',
	'you'
] as const

export type Step = (typeof steps)[number]

const createStepStore = () => {
	const { set, subscribe, update } = queryParam<Step>('step')

	const next = () => {
		update((step) => {
			if (!step) return null

			const nextIndex = steps.indexOf(step) + 1
			return steps[nextIndex]
		})
	}

	const previous = () => {
		update((step) => {
			if (!step) return null

			const nextIndex = steps.indexOf(step) - 1
			return steps[nextIndex]
		})
	}

	return { set, subscribe, previous, next }
}

export const step = createStepStore()

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

export const notifyPartner = queryParam('notifyPartner', ssp.boolean(true), {
	pushHistory: false
})

export const canPublic = queryParam('canPublic', ssp.boolean(false), { pushHistory: false })

export const name = queryParam('name', ssp.string(), { pushHistory: false })

export type Pledge = {
	goal: string
	deadline: string
	consequence: Consequence
	amount: number
	name: string
	partnerName: string
	partnerEmail: string
	canPublic: boolean
}

export type WithNullableProperties<T> = {
	[P in keyof T]: T[P] | null
}
