require.context('../assets/', true)
require('./modernizr_build.js')

import config from './config'
import '../css/main.less'
import '../index.html'

if(config.target == 'extension') {
  require('../manifest.json')
}

import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  useSearchParams
} from 'react-router-dom'
import AppContext from './app.context'

import Home from '../pages/home'
import Login from '../pages/login'

async function main() {
  let appContext : AppContext = {}

  const createRouter = config.target == 'webapp' ? createBrowserRouter : createHashRouter

  const router = createRouter([
    {
      path: '/',
      element: (<Home />),
    },
    {
      path: '/app/login',
      element: (<Login />)
    }
  ])
  
  const container = (document.getElementById('app') as HTMLElement)
  const root = createRoot(container)
  root.render(
    <AppContext.Provider value={appContext}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}

main().catch( (err) => {console.error(err) })
