import React, { useEffect } from 'react'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactGA from 'react-ga';

import NameWall from './NameWall'
// import Form from './Form'

import './index.css'

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import ListView from './ListView';
// import Form from './Form/NewForm';
Amplify.configure(awsExports);
ReactGA.initialize('UA-236089614-1');

const App = () => {

  // Page View Tracking on Render
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
  <BrowserRouter>
    <Routes>
      {/* <Route path="/form" element={<Form/>}></Route> */}
      <Route path="/scroll" element={<NameWall scroll={true}/>}></Route>
      <Route path="/numbers" element={<ListView/>}></Route>
      <Route path="/:countryParams" element={<NameWall scroll={false}  />}></Route>
      <Route path="/can/:stateParams" element={<NameWall scroll={false} />}></Route>
      <Route path="/usa/:stateParams" element={<NameWall scroll={false} />}>
        <Route path="/usa/:stateParams/:countyParams" element={<NameWall scroll={false} />}></Route>

      </Route>

      <Route path="/" element={<NameWall scroll={false} />}></Route>
    </Routes>
  </BrowserRouter>

  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
)
