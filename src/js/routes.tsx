import React from 'react'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import config from './config'

/* PAGES */
import Home from '../pages/home'
import Login from '../pages/login'
import AppMain from '../pages/app-main'
import Profile from '../pages/profile'
import Legal from '../pages/legal'

export default function createRouter() {
  const createRouter = config.target == 'webapp' ? createBrowserRouter : createHashRouter

  const router = createRouter([
    {
      path: '/',
      element: (<Home />),
    },
    {
      path: '/login',
      element: (<Login />)
    },
    {
      path: '/app',
      element: (<AppMain />)
    },
    {
      path: '/app/snoozed',
      element: (<AppMain />)
    },
    {
      path: '/app/profile',
      element: (<Profile />)
    },
    {
      path: '/privacy-policy',
      element: (<Legal />)
    }
  ])

  return router
}