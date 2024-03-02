import type { Consequence } from './pledgeStore'

const consequenceSentences = {
	trump: "Donate ${{amount}} to Trump's presidential campaign",
	biden: "Donate ${{amount}} to Biden's presidential campaign",
	nra: 'Donate ${{amount}} to the NRA',
	api: 'Donate ${{amount}} to the American Petroleum Institute',
	greenpeace: 'Donate ${{amount}} to Greenpeace'
} satisfies Record<Consequence, string>

export const consequenceAsSentence = (consequence: Consequence, amount: number) => {
	const sentence = consequenceSentences[consequence]

	return sentence.replace('{{amount}}', amount.toString())
}

const consequenceWords = {
	trump: "Trump's presidential campaign",
	biden: "Biden's presidential campaign",
	nra: 'the NRA',
	api: 'the American Petroleum Institute',
	greenpeace: 'Greenpeace'
} satisfies Record<Consequence, string>

export const consequenceAsWord = (consequence: Consequence) => {
	return consequenceWords[consequence]
}
