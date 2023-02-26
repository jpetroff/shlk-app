import { createContext, useContext } from 'react'
import * as _ from 'underscore'
import config from './config'

import browserApi from './browser.api'
import UserQuery from './user.gql'

declare type LoginContext = {
  name: string,
  email: string,
  avatar?: Maybe<string>,
  userTag?: Maybe<string>,
  predefinedTimers?: AnyObject[]
}

declare type ExtensionContext = {
  activeTabUrl: string
}

declare type AppContextT = {
  extension?: Maybe<ExtensionContext>,
  user?: Maybe<LoginContext>
}

let AppContext = createContext<AppContextT>( {} )

export default AppContext

export async function getInitAppContext(): Promise<AppContextT> {
  let result : AppContextT = {}

  // getting active tab
  if(config.target == 'extension' && browserApi.isInit) {
    const activeTab = await browserApi.getTab(true)
    if(activeTab?.url) 
      result.extension = { activeTabUrl: activeTab.url }
  }

  // getting login data
  const currentUser = await UserQuery.getLoggedInUser()
  result.user = currentUser as LoginContext

  return result
}