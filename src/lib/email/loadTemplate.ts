import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const templates = ['notifyPartner', 'confirmation']

export type Template = (typeof templates)[number]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadTemplate = (template: Template, values: Record<string, any>): Promise<string> => {
	return new Promise((resolve, reject) => {
		fs.readFile(
			path.join(dirname(fileURLToPath(import.meta.url)), `./templates/${template}.html`),
			{ encoding: 'utf-8' },
			(err, data) => {
				if (err) {
					reject(err)
					return
				}
				// Replace placeholders with actual values
				let result = data
				for (const key in values) {
					// Create a RegExp to match the placeholder, globally
					const placeholder = new RegExp(`{{${key}}}`, 'g')
					result = result.replace(placeholder, values[key])
				}
				resolve(result)
			}
		)
	})
}
