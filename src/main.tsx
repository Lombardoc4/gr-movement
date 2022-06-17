import React from 'react'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import NameWall from './NameWall'
import Form from './Form'

import './index.css'

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<NameWall />} />
      {/* <Route path="/image-wall" element={<App />} /> */}
      <Route path="/form" element={<Form />} />
    </Routes>
  </BrowserRouter>
)
