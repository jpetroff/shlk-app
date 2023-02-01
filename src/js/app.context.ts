import { createContext } from 'react'

declare type LoginContext = {
  name: string,
  email: string,
  avatar?: Maybe<string>,
  userTag?: Maybe<string>
}

declare type ExtensionContext = {
  activeTabUrl: string
}

declare type AppContext = {
  extension?: Maybe<ExtensionContext>,
  user?: Maybe<LoginContext>
}

const AppContext = createContext( {} )

export default AppContext