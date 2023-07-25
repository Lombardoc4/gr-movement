// import { useEffect } from 'react'
// import ReactDOM from "react-dom/client";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// // import Form from './Form'

// import './index.css'
// import './index.css'

// import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
// import ListView from './ListView';
// import PhotoShow from './PhotoShow';
// import NameWall from './NameWall';
// import Heroes from './Heroes';
// import Page404 from './components/404';
// // import Form from './Form/NewForm';
// Amplify.configure(awsExports);
// ReactGA.initialize('UA-236089614-1');


// const App = () => {
//   const subdomain = window.location.hostname.split('.')[0];

//   // Page View Tracking on Render
//   useEffect(() => {
//     ReactGA.pageview(window.location.pathname + window.location.search);
//   }, []);

//   const HeroRoutes = () => (<Routes>
//     <Route path="/" element={<Heroes/>}></Route>
//     <Route path="/*" element={<Page404/>}></Route>
//   </Routes>);

//   const WallRoutes = () => (<Routes>

//     {/* Total Numbers */}
//     <Route path="/numbers" element={<ListView/>}></Route>

//     {/* USA Photos Wall */}
//     <Route path="/photo"  element={<Navigate to="/photos" replace />}/>
//     <Route path="/photos" element={<PhotoShow folderKey={'photoWall'}/>}></Route>

//     {/* Canada Photo Wall */}
//     <Route path="/photo/can" element={<Navigate to="/photos/can" replace />}></Route>
//     <Route path="/photos/can" element={<PhotoShow folderKey={'canadaWall'} country='Canada'/>}></Route>
//     <Route path="/photos/can/:id" element={<PhotoShow folderKey={'canadaWall'} country='Canada'/>}></Route>

//     {/* Teen Photo Wall */}
//     <Route path="/teen-photo" element={<Navigate to="/photoss/teens" replace />}></Route>
//     <Route path="/teen-photos" element={<Navigate to="/photos/teens" replace />}></Route>
//     <Route path="/photos/teens" element={<PhotoShow folderKey={'teenWall'}/>}></Route>

//     {/* USA State Photo Wall */}
//     <Route path="/photos" element={<PhotoShow folderKey={'photoWall'}/>}></Route>
//     <Route path="/photos/*" element={<Page404/>}></Route>


//     {/* Name wall */}
//     <Route path="/" element={<NameWall/>}></Route>
//     <Route path="/*" element={<NameWall/>}></Route>

//   </Routes>);


//   return (

//     <BrowserRouter>
//         {subdomain !== 'heroes' ? <WallRoutes/> : <HeroRoutes/>}
//     </BrowserRouter>

//   )
// }

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <App/>
// )
