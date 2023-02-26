declare type Maybe<T> = T | undefined | null

declare type AnyObject = { [key: string]: any }

declare type HTMLAnyInput = HTMLInputElement & HTMLTextAreaElement

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