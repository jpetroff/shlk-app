require.context('../assets/', true);
import '../css/main.less';
import '../index.html';
import '../manifest.json';
require('./modernizr_build.js');
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { withRouter } from './router-hoc';
import { withExtension } from './extension-hoc';
import { Home } from '../apps/Home/index';
import './extension-hoc';
var Home_RE = withExtension(withRouter(Home));
var router = createHashRouter([
    {
        path: "/",
        element: (React.createElement(Home_RE, null)),
    }
]);
var container = document.getElementById('app');
var root = createRoot(container);
root.render(React.createElement(RouterProvider, { router: router }));
