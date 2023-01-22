require.context('../assets/', true)
require('./modernizr_build.js')
const config = require('./config')
import '../css/main.less'
import '../index.html'
import '../manifest.json'

import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
  useSearchParams
} from 'react-router-dom'
import { withRouter } from './router-hoc'
import { withExtension } from './extension-hoc.webapp'
import { Home } from '../apps/Home/index'

const ExtHome = withExtension( withRouter(Home) )


const createRouter = config.target == 'webapp' ? createBrowserRouter : createHashRouter
const router = createRouter([
  {
    path: "/",
    element: (
      <ExtHome />
    ),
  }
]);

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<RouterProvider router={router} />)