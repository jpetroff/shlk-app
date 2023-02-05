import React from 'react'
import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import config from './config'

/* PAGES */
import Home from '../pages/home'
import Login from '../pages/login'
import AppMain from '../pages/app-main'

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
    }
  ])

  return router
}