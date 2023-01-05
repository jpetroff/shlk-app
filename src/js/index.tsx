
require.context('../assets/', true)
import '../css/main.less'
import '../index.html'
import '../manifest.json'
require('./modernizr_build.js')

import React from 'react'
import ReactDOM from 'react-dom'
import {
  createMemoryRouter,
  RouterProvider
} from 'react-router-dom'
import { Home } from '../apps/Home/index'

const router = createMemoryRouter([
  {
    path: "/",
    element: (
      <Home />
    ),
  }
]);

ReactDOM.render(
	<RouterProvider router={router} />,
	document.getElementById('app')
);