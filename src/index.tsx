import React from 'react'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import NameWall from './NameWall'
// import Form from './Form'

import './index.css'

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import ListView from './ListView';
// import Form from './Form/NewForm';
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/form" element={<Form/>}></Route> */}
      <Route path="/numbers" element={<ListView/>}></Route>
      <Route path="/:countryParams" element={<NameWall  />}></Route>
      <Route path="/can/:stateParams" element={<NameWall  />}></Route>
      <Route path="/usa/:stateParams" element={<NameWall  />}></Route>
      <Route path="/" element={<NameWall  />}></Route>
    </Routes>
  </BrowserRouter>
)
