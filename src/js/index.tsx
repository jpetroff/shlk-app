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
import AppContext, { getInitAppContext } from './app.context'
import createRouter from './routes'

async function main() {
  const appContext = await getInitAppContext()
  console.log(appContext)

  const router = createRouter()
  const container = (document.getElementById('app') as HTMLElement)
  const root = createRoot(container)
  root.render(
    <AppContext.Provider value={appContext}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}

main().catch( (err) => {console.error(err) })
