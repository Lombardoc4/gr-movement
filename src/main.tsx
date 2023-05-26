import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'

import { Amplify } from 'aws-amplify'
const awsExports = require('./aws-exports').default;
import { GlobalStyles } from './GlobalStyles.ts'


Amplify.configure(awsExports);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles/>
    <RouterProvider router={router()}/>
  </React.StrictMode>,
)
