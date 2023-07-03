import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'

import ReactGA from "react-ga4";
import { Amplify} from 'aws-amplify'
import awsExports  from './aws-exports';
import { GlobalStyles } from './GlobalStyles.ts'
import { HubSyncProvider } from './utils/hooks/HubContext.tsx'

Amplify.configure(awsExports);


ReactGA.initialize("G-H2JTF53YES");


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles/>
    <HubSyncProvider>
      <RouterProvider router={router()}/>
    </HubSyncProvider>
  </React.StrictMode>,
)
