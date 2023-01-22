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

import Home from '../pages/Home'
import Login from '../pages/Login'


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
]);

const container = (document.getElementById('app') as HTMLElement)
const root = createRoot(container)
root.render(<RouterProvider router={router} />)