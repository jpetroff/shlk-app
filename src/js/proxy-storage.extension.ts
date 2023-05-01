import * as _ from 'underscore'

export enum StorageType {
  local = 'local',
  sync = 'sync',
  session = 'session',
  default = ''
}

export const proxyStorage = {

  async getItem(key : string, storage: StorageType = StorageType.sync) : Promise<any> {
    const result = await chrome.storage[storage].get(key)
    return result[key]
  },

  async setItem(key: string, value: any, storage: StorageType = StorageType.sync) : Promise<void> {
    let newItem : AnyObject = {}
    newItem[key] = value
    await chrome.storage[storage].set(newItem)
  },

  async getAllItems(keys: string[] = [], storage: StorageType = StorageType.sync) : Promise<any> {
    const result = await chrome.storage[storage].get(keys)
    return result
  },

  async setAllItems(items: AnyObject, storage: StorageType = StorageType.sync) : Promise<void> {
    const result = await chrome.storage[storage].set(items)
  },

  canUse() {
    if(chrome.storage.sync) return true
    return false
  },

  async removeItem(key: string, storage: StorageType = StorageType.sync) : Promise<void> {
    await chrome.storage[storage].remove(key)
  },

  async removeAllItems(keys: string[], storage: StorageType = StorageType.sync) : Promise<void> {
    await chrome.storage[storage].remove(keys)
  }

}
export default proxyStorage