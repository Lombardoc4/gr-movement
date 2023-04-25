import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Amplify, DataStore, Hub } from 'aws-amplify';
import ReactGA from 'react-ga';

import awsExports from './aws-exports';
import { getApp } from "./utils/getApp";
import './index.css'
import { Ambassador } from "./utils/models";

Amplify.configure(awsExports);

ReactGA.initialize('UA-236089614-1');

const saveItem = async (item: any) => {
  console.log('item', item);
  const saved = await DataStore.save(new Ambassador(item))
  console.log('saveed', saved)
}



// const initDataStore = async () => {
//   await DataStore.start();
// }

const App = () => {
  // useEffect(() => {
  //     const newItem = []
  //   newItem.map(item => {<Data Manipulation>; saveItem(item)})
  //   }, [])

  // Page View Tracking on Render
  useEffect(() => {
    // initDataStore();

    const sd = window.location.hostname.split('.')[0] || '';
    ReactGA.pageview(sd + window.location.pathname + window.location.search);
  }, []);


  const MainRouter = getApp();

  return (
    <BrowserRouter>
        <MainRouter />
    </BrowserRouter>

  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
)
