
require.context('../assets/', true)
import '../css/main.less'
import '../index.html'
import '../manifest.json'
require('./modernizr_build.js')

import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
  useSearchParams
} from 'react-router-dom'
import { withRouter } from './router-hoc'
import { withExtension } from './extension-hoc'
import { Home } from '../apps/Home/index'
import './extension-hoc'

const Home_RE = withExtension( withRouter(Home) )

const router = createHashRouter([
  {
    path: "/",
    element: (
      <Home_RE />
    ),
  }
]);

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<RouterProvider router={router} />)