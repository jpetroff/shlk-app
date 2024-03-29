require.context('../assets/', true)
require('./modernizr_build.js')
import '../css/main.less'
import '../index.html'

if(config.target == 'extension') {
  require('../manifest.json')
}

import config from './config'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AppContext, { getInitAppContext, AppContextProvider } from './app.context'
import createRouter from './routes'
import cache, { CacheMode } from './cache'

async function main() {
  const appContext = await getInitAppContext()
  if(appContext.user) { cache.mode = CacheMode.remote }
  else { cache.mode = CacheMode.local }
  cache.setStorage()

  const router = createRouter()
  const container = (document.getElementById('app') as HTMLElement)
  const root = createRoot(container)
  root.render(
    <AppContextProvider initValue={appContext}>
      <RouterProvider router={router} />
    </AppContextProvider>
  )
}

main().catch( (err) => {console.error(err) })
