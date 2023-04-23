import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Amplify, DataStore, Hub } from 'aws-amplify';
import ReactGA from 'react-ga';

import awsExports from './aws-exports';
import { getApp } from "./utils/getApp";
import './index.css'

Amplify.configure(awsExports);

ReactGA.initialize('UA-236089614-1');

// const savePerson = async (person: any) => {
//   const saved = await DataStore.save(new Person(person))
//   console.log('saveed', saved)
// }

// useEffect(() => {
//   const newPeople = []
// newPeople.map(person => {person.foreverAge = "" + person.foreverAge; savePerson(person)})
// }, [])

const initDataStore = async () => {
  await DataStore.start();

}
const App = () => {
  // Page View Tracking on Render
  useEffect(() => {
    initDataStore();

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
