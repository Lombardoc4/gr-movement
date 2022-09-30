import React, { useEffect } from 'react'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import ReactGA from 'react-ga';

import NameWall from './NameWall'
// import Form from './Form'

import './index.css'

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import ListView from './ListView';
import PhotoShow from './PhotoShow';
import MainApp from './MainApp';
// import Form from './Form/NewForm';
Amplify.configure(awsExports);
ReactGA.initialize('UA-236089614-1');

const App = () => {

  // Page View Tracking on Render
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  // <React.StrictMode>

  return (

  <BrowserRouter>
    <Routes>
      {/* <Route path="/form" element={<Form/>}></Route> */}
      <Route path="/numbers" element={<ListView/>}></Route>

      <Route path="/photo"  element={<Navigate to="/photos" replace />}/>
      <Route path="/photos" element={<PhotoShow folderKey={'main'}/>}></Route>
      <Route path="/teen-photo" element={<Navigate to="/teen-photos" replace />}></Route>
      <Route path="/teen-photos" element={<PhotoShow folderKey={'teen'}/>}></Route>

      <Route path="/:countryParams" element={<NameWall  />}></Route>
      <Route path="/can/:stateParams" element={<NameWall />}></Route>
      <Route path="/usa/:stateParams" element={<NameWall  />}>
        <Route path="/usa/:stateParams/:countyParams" element={<NameWall  />}></Route>
      </Route>

      <Route path="/" element={<NameWall  />}></Route>
      <Route path="/v2/*" element={<MainApp  />}></Route>
    </Routes>
  </BrowserRouter>

  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
)
