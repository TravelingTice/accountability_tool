import { writable } from 'svelte/store'

export const createBooleanStore = (initialBool = false) => {
	const { subscribe, set, update } = writable(initialBool)

	const on = () => set(true)

	const off = () => set(false)

	const toggle = () => update((bool) => !bool)

	return { subscribe, on, off, toggle }
}
