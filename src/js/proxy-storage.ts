import _ from 'underscore'
import { AnyObject } from './constants'

export const proxyStorage = {

	async getItem(key : string) : Promise<string> {
		const result = await chrome.storage.sync.get([key])
		console.log(key, result)
		return result[key]
	},

	async setItem(key: string, value: string) : Promise<void> {
		let newItem : AnyObject = {}
		newItem[key] = value
		await chrome.storage.sync.set(newItem)
	},

	canUse() {
		if(chrome.storage.sync) return true
		return false
	}

}
export default proxyStorage