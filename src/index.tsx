import React from 'react'
import ReactDOM from "react-dom/client";


import NameWall from './NameWall'
// import Form from './Form'

import './index.css'

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NameWall/>
)
