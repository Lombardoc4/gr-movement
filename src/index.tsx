import React, { useEffect } from 'react'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import ReactGA from 'react-ga';

// import Form from './Form'

import './index.css'

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import ListView from './ListView';
import PhotoShow from './PhotoShow';
import NameWall from './NameWall';
import Heroes from './Heroes';
// import Form from './Form/NewForm';
Amplify.configure(awsExports);
ReactGA.initialize('UA-236089614-1');


const App = () => {
  const subdomain = window.location.hostname.split('.')[0];

  console.log('subdomain', subdomain);

  // Page View Tracking on Render
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);


  return (

    <BrowserRouter>
      <Routes>
        {/* Heroes */}
        {subdomain === 'heroes' && <Route path="/*" element={<Heroes/>}></Route>}

        {subdomain !== 'heroes' && <>

          {/* Total Numbers */}
          <Route path="/numbers" element={<ListView/>}></Route>

          {/* USA Photos Wall */}
          <Route path="/photo"  element={<Navigate to="/photos" replace />}/>
          <Route path="/photos" element={<PhotoShow folderKey={'photoWall'}/>}></Route>

          {/* Canada Photo Wall */}
          <Route path="/photo/can" element={<Navigate to="/photos/can" replace />}></Route>
          <Route path="/photos/can" element={<PhotoShow folderKey={'canadaWall'} country='Canada'/>}></Route>
          <Route path="/photos/can/:id" element={<PhotoShow folderKey={'canadaWall'} country='Canada'/>}></Route>

          {/* USA State Photo Wall */}
          <Route path="/photos/:id" element={<PhotoShow folderKey={'photoWall'}/>}></Route>

          {/* Teen Photo Wall */}
          <Route path="/teen-photo" element={<Navigate to="/teen-photos" replace />}></Route>
          <Route path="/teen-photos" element={<PhotoShow folderKey={'teenWall'}/>}></Route>

          {/* Name wall */}
          <Route path="/" element={<NameWall  />}></Route>
          <Route path="/*" element={<NameWall  />}></Route>
          </>}

      </Routes>
    </BrowserRouter>

  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
)
