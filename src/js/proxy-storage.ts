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

  async getAllItems(parse: boolean = true) : Promise<any[] | string[] | void> {
    const result = await chrome.storage.sync.get()
    
    if(!parse) return _.values(result)

    let objResult : AnyObject[] = []

    _.each(result, (retrievedItem) => {
      try {
        objResult.push(JSON.parse(retrievedItem as string))
      } catch { }
    })

    return objResult
  },

  canUse() {
    if(chrome.storage.sync) return true
    return false
  }

}
export default proxyStorage