declare type Maybe<T> = T | undefined | null

declare type AnyObject = { [key: string]: any }

declare type HTMLAnyInput = HTMLInputElement & HTMLTextAreaElement

declare interface ShortlinkDocument {
  _id?: string
  createdAt?: string
  updatedAt?: string
  hash: string
  location: string
  descriptor?: {
    userTag?: string
    descriptionTag: string 
  }
  owner?: string
  urlMetadata?: AnyObject
  siteTitle?: string
  siteDescription?: string
  snooze?: {
    awake: number
    description?: string
  },
  tags?: string[]
}

declare interface QICommon {
  limit?: number
  skip?: number
  sort?: string
  order?: string | number 
  search?: string
  isSnooze?: boolean
}

declare interface QISnoozeArgs {
  location?: string
  hash?: string
  id?: string
  standardTimer?: string
  customDay?: AnyObject
  customTime?: AnyObject
  baseDateISOString?: string
}

declare interface QIUser {
  name?: string
  avatar?: string
  userTag?: string
}

declare interface User {
  _id: string | import('mongoose').ObjectId
  name: string
  email: string

  avatar?: string
  userTag?: string
  predefinedTimers?: AnyObject
}