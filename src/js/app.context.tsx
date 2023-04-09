import * as React from 'react'
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

export type AppContextT = {
  extension?: Maybe<ExtensionContext>,
  user?: Maybe<LoginContext>,
  requestUpdate: () => void
}

export type AppContextState = Omit<AppContextT, 'requestUpdate'>

const AppContext = React.createContext<AppContextT>( {
  requestUpdate: () => {}
} )

type Props = {
  initValue: Omit<AppContextT, 'requestUpdate'>
}

const AppContextProvider : React.FC<React.PropsWithChildren<Props>> = (
 {
  initValue,
  children
 } : React.PropsWithChildren<Props>
) => {
  const [ contextState, setContextState ] = React.useState(initValue)

  async function requestUpdate() {
    const contextState = await getInitAppContext()
    setContextState(contextState)
  }

  const value : AppContextT = React.useMemo( () => {
    return {
      ...contextState,
      requestUpdate
    }
  }, [contextState])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
} 

export default AppContext
export { AppContextProvider }

export async function getInitAppContext(): Promise<AppContextState> {
  let result : AppContextState = {}

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