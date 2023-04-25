import { useEffect, useState } from 'react'
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ReactGA from 'react-ga';

import { DataStore } from 'aws-amplify';
import ByTheNumbers from '../pages/ByTheNumbers';
import PhotoShow from '../pages/PhotoWall';
import NameWall from '../pages/NameWall';
import Heroes from '../pages/Heroes';
import Page404 from '../pages/404';

export const HeroRouter = () => (
    <Routes>
        <Route path="/" element={<Heroes/>}></Route>
        <Route path="/*" element={<Page404/>}></Route>
    </Routes>
);


export const WallRouter = () => (
    <Routes>

        {/* By the Numbers */}
        <Route path="/numbers" element={<ByTheNumbers/>}></Route>

        {/* USA Photos Wall */}
        <Route path="/photo"  element={<Navigate to="/photos" replace />}/>
        <Route path="/photos" element={<PhotoShow folderKey={'photoWall'}/>}></Route>

        {/* Canada Photo Wall */}
        <Route path="/photo/can" element={<Navigate to="/photos/can" replace />}></Route>
        <Route path="/photos/can" element={<PhotoShow folderKey={'canadaWall'} country='Canada'/>}></Route>
        <Route path="/photos/can/:id" element={<PhotoShow folderKey={'canadaWall'} country='Canada'/>}></Route>

        {/* Teen Photo Wall */}
        <Route path="/teen-photo" element={<Navigate to="/photoss/teens" replace />}></Route>
        <Route path="/teen-photos" element={<Navigate to="/photos/teens" replace />}></Route>
        <Route path="/photos/teens" element={<PhotoShow folderKey={'teenWall'}/>}></Route>

        {/* USA State Photo Wall */}
        <Route path="/photos" element={<PhotoShow folderKey={'photoWall'}/>}></Route>
        <Route path="/photos/:id" element={<PhotoShow folderKey={'photoWall'}/>}></Route>
        {/* <Route path="/photos/*" element={<Page404/>}></Route> */}


        {/* Name wall */}
        <Route path="/" element={<NameWall/>}></Route>
        <Route path="/*" element={<NameWall/>}></Route>

    </Routes>
);
