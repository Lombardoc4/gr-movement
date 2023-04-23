import React, { useEffect } from 'react'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ReactGA from 'react-ga';

// import Form from './Form'

import './index.css'
import './index.css'

import { Amplify, DataStore } from 'aws-amplify';
import awsExports from './aws-exports';
import ListView from './ListView';
import PhotoShow from './PhotoShow';
import NameWall from './NameWall';
import Heroes from './Heroes';
import Page404 from './components/404';
import { Person } from './models';
// import Form from './Form/NewForm';
Amplify.configure(awsExports);
ReactGA.initialize('UA-236089614-1');


const savePerson = async (person: any) => {
  const saved = await DataStore.save(new Person(person))
  console.log('saveed', saved)
}

const App = () => {
  const subdomain = window.location.hostname.split('.')[0];

  // Page View Tracking on Render
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  // useEffect(() => {
  //   const newPeople = [
  //     {
  //       "firstName": "Michael",
  //       "lastName": "Cofery",
  //       "foreverAge": 28,
  //       "country": "United States",
  //       "state": "North Carolina",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound2790712905261810205.jpg"
  //     },
  //     {
  //       "firstName": "Tony",
  //       "lastName": "Pisacano",
  //       "foreverAge": 25,
  //       "country": "United States",
  //       "state": "Kentucky",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//Screenshot_20230402_133845_Photos.jpg"
  //     },
  //     {
  //       "firstName": "Nick",
  //       "lastName": "Wright",
  //       "foreverAge": 35,
  //       "country": "United States",
  //       "state": "Georgia",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//C546F95E-F60B-423D-B583-B62201250D89.jpeg"
  //     },
  //     {
  //       "firstName": "Joseph David",
  //       "lastName": "Callahan - Ferratti",
  //       "foreverAge": 27,
  //       "country": "United States",
  //       "state": "Florida",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound7031649271538998900.jpg"
  //     },
  //     {
  //       "firstName": "James Scott",
  //       "lastName": "Beegle Jr",
  //       "foreverAge": 33,
  //       "country": "United States",
  //       "state": "California",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound3822130832514085902.jpg"
  //     },
  //     {
  //       "firstName": "Taylor",
  //       "lastName": "Watford",
  //       "foreverAge": 28,
  //       "country": "United States",
  //       "state": "South Carolina",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//IMG_2252.jpeg"
  //     },
  //     {
  //       "firstName": "Mohammad",
  //       "lastName": "Mashayekhi",
  //       "foreverAge": 23,
  //       "country": "Iran",
  //       "state": "",
  //       "imgUrl": ""
  //     },
  //     {
  //       "firstName": "Shelby Lee",
  //       "lastName": "Hobbs",
  //       "foreverAge": 26,
  //       "country": "United States",
  //       "state": "Idaho",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound1138416195910962354.jpg"
  //     },
  //     {
  //       "firstName": "Cole",
  //       "lastName": "Shaw",
  //       "foreverAge": 32,
  //       "country": "Canada",
  //       "state": "British Columbia",
  //       "imgUrl": ""
  //     },
  //     {
  //       "firstName": "Jakob",
  //       "lastName": "Ford",
  //       "foreverAge": 17,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//IMG_5681.jpeg"
  //     },
  //     {
  //       "firstName": "Giselle",
  //       "lastName": "Wood",
  //       "foreverAge": 35,
  //       "country": "Canada",
  //       "state": "",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//B50EDFD5-580F-4F83-9B5C-C99EEA945C8C.jpeg"
  //     },
  //     {
  //       "firstName": "Kevin",
  //       "lastName": "McConville",
  //       "foreverAge": 17,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound5561889816379345581.jpg"
  //     },
  //     {
  //       "firstName": "Lucas",
  //       "lastName": "Stevens",
  //       "foreverAge": 30,
  //       "country": "United States",
  //       "state": "Ohio",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound5201822607713978016.jpg"
  //     },
  //     {
  //       "firstName": "Savannah",
  //       "lastName": "Crownover",
  //       "foreverAge": 18,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//59A765E8-E733-4B17-BF7C-2951C7F2B116.jpeg"
  //     },
  //     {
  //       "firstName": "Nicholas F",
  //       "lastName": "Whelan",
  //       "foreverAge": 33,
  //       "country": "United States",
  //       "state": "Pennsylvania",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//45F77F76-EF52-4FC5-9634-8BCF16A0751A.jpeg"
  //     },
  //     {
  //       "firstName": "Colin “Grady”",
  //       "lastName": "Finn",
  //       "foreverAge": 19,
  //       "country": "United States",
  //       "state": "Pennsylvania",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//406AFC18-03E6-4A34-B0CE-2D611B45DE1D.jpeg"
  //     },
  //     {
  //       "firstName": "Nathan",
  //       "lastName": "Money",
  //       "foreverAge": 25,
  //       "country": "United States",
  //       "state": "Alabama",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//04F71017-1BA3-460B-8F6C-D100E5D846F2.jpeg"
  //     },
  //     {
  //       "firstName": "Erykah",
  //       "lastName": "Zaccaro",
  //       "foreverAge": 24,
  //       "country": "United States",
  //       "state": "Georgia",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//840DE664-B389-4D1B-9BC6-7889A4B6A32B.jpeg"
  //     },
  //     {
  //       "firstName": "Keenan",
  //       "lastName": "Schott",
  //       "foreverAge": 30,
  //       "country": "United States",
  //       "state": "Missouri",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound268194822681350597.jpg"
  //     },
  //     {
  //       "firstName": "Colton",
  //       "lastName": "Fugitt",
  //       "foreverAge": 21,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound3472353761665138226.jpg"
  //     },
  //     {
  //       "firstName": "Jessie",
  //       "lastName": "Williams",
  //       "foreverAge": 23,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//3978F20C-937C-4B3A-9F1B-C28AFD237CF9.jpeg"
  //     },
  //     {
  //       "firstName": "Ian",
  //       "lastName": "McDonald",
  //       "foreverAge": 25,
  //       "country": "United States",
  //       "state": "Virginia",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound8279977451545135199.jpg"
  //     },
  //     {
  //       "firstName": "Sarah",
  //       "lastName": "Ribera",
  //       "foreverAge": 32,
  //       "country": "United States",
  //       "state": "California",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//FB_IMG_1632532566475.jpg"
  //     },
  //     {
  //       "firstName": "Marc (Maury)",
  //       "lastName": "Zavallo",
  //       "foreverAge": 32,
  //       "country": "United States",
  //       "state": "Florida",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//6D8E87F0-9DAA-457F-8B46-72F3805BC53E.jpeg"
  //     },
  //     {
  //       "firstName": "Brandon",
  //       "lastName": "Rudd",
  //       "foreverAge": 36,
  //       "country": "United States",
  //       "state": "South Carolina",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//0B900CF6-95BD-4A10-B566-8DED05DA7AE9.jpeg"
  //     },
  //     {
  //       "firstName": "Alex",
  //       "lastName": "Rojas",
  //       "foreverAge": 25,
  //       "country": "United States",
  //       "state": "California",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//BD41B759-0491-4BB7-843F-6F8E447F4A5D.jpeg"
  //     },
  //     {
  //       "firstName": "Joshua",
  //       "lastName": "Gillihan",
  //       "foreverAge": 14,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//0E7FAD75-68D2-4BC2-8592-F4EAC1004865.jpeg"
  //     },
  //     {
  //       "firstName": "Christian",
  //       "lastName": "Knight",
  //       "foreverAge": 28,
  //       "country": "United States",
  //       "state": "California",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//02E331E0-542C-4F15-97CD-F3B071681E3D.jpeg"
  //     },
  //     {
  //       "firstName": "Ariel",
  //       "lastName": "Covarrubias",
  //       "foreverAge": 23,
  //       "country": "United States",
  //       "state": "California",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound3423850775737304097.jpg"
  //     },
  //     {
  //       "firstName": "Layton",
  //       "lastName": "Ivins",
  //       "foreverAge": 16,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//3FA43FF4-693C-4CDA-8775-D554D62F1E1C.jpeg"
  //     },
  //     {
  //       "firstName": "Eion",
  //       "lastName": "Jankowski",
  //       "foreverAge": 19,
  //       "country": "United States",
  //       "state": "Ohio",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//F222FC1C-07B6-4DE0-87A6-3A3080EF8EA8.jpeg"
  //     },
  //     {
  //       "firstName": "Louis",
  //       "lastName": "Algeo",
  //       "foreverAge": 46,
  //       "country": "United States",
  //       "state": "Oklahoma",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound8793279381601939718.png"
  //     },
  //     {
  //       "firstName": "Vincent",
  //       "lastName": "Moore",
  //       "foreverAge": 28,
  //       "country": "United States",
  //       "state": "Michigan",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//0DA20A2C-125E-4B45-82AF-DB4400D9AE34.jpeg"
  //     },
  //     {
  //       "firstName": "John",
  //       "lastName": "Salem",
  //       "foreverAge": 38,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//A68D9446-2458-40DA-A861-BED43FB664B6.jpeg"
  //     },
  //     {
  //       "firstName": "Chasidy",
  //       "lastName": "Criswell",
  //       "foreverAge": 29,
  //       "country": "United States",
  //       "state": "Arkansas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound7220606852221024264.jpg"
  //     },
  //     {
  //       "firstName": "Joshua",
  //       "lastName": "Randazzo",
  //       "foreverAge": 19,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//754A42D7-5413-4785-A77C-5B6676242BC3.jpeg"
  //     },
  //     {
  //       "firstName": "Malachi",
  //       "lastName": "Mitchell",
  //       "foreverAge": 20,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//E4812FE3-4A0B-4113-8A9B-0931369CED45.jpeg"
  //     },
  //     {
  //       "firstName": "Alex",
  //       "lastName": "Nava",
  //       "foreverAge": 24,
  //       "country": "United States",
  //       "state": "California",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//A135BBAF-8E9F-4085-AAC8-35C0E1EF8EA0.jpeg"
  //     },
  //     {
  //       "firstName": "Justin",
  //       "lastName": "Silvia",
  //       "foreverAge": 28,
  //       "country": "United States",
  //       "state": "Rhode Island",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//72E190FC-1A44-41E3-9CA5-E35F1A86532F.jpeg"
  //     },
  //     {
  //       "firstName": "Christopher",
  //       "lastName": "McCabe",
  //       "foreverAge": 29,
  //       "country": "United States",
  //       "state": "Ohio",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound1118061074811963121.jpg"
  //     },
  //     {
  //       "firstName": "Robert",
  //       "lastName": "Crowther Jr",
  //       "foreverAge": 34,
  //       "country": "United States",
  //       "state": "Connecticut",
  //       "imgUrl": ""
  //     },
  //     {
  //       "firstName": "Zachary",
  //       "lastName": "Len",
  //       "foreverAge": 24,
  //       "country": "United States",
  //       "state": "New Jersey",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//ZachHappy.jpg"
  //     },
  //     {
  //       "firstName": "Layton",
  //       "lastName": "Ivins",
  //       "foreverAge": 16,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//3631AD66-6477-4E8A-A416-C82460792AA6.jpeg"
  //     },
  //     {
  //       "firstName": "William",
  //       "lastName": "Dalton",
  //       "foreverAge": 37,
  //       "country": "United States",
  //       "state": "Pennsylvania",
  //       "imgUrl": ""
  //     },
  //     {
  //       "firstName": "Anthony",
  //       "lastName": "McGhee",
  //       "foreverAge": 27,
  //       "country": "United States",
  //       "state": "Ohio",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//7FC473B5-238C-4087-840A-AF312D84C8AA.jpeg"
  //     },
  //     {
  //       "firstName": "Michael",
  //       "lastName": "Rockaway",
  //       "foreverAge": 22,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//Dublin%20and%20Michael.jpeg"
  //     },
  //     {
  //       "firstName": "Samuel",
  //       "lastName": "Rush",
  //       "foreverAge": 32,
  //       "country": "United States",
  //       "state": "North Carolina",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound2780185849169021085.jpg"
  //     },
  //     {
  //       "firstName": "Robert",
  //       "lastName": "Banta",
  //       "foreverAge": 30,
  //       "country": "United States",
  //       "state": "South Carolina",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//AD49CC74-E199-44E9-8197-178B56892012.jpeg"
  //     },
  //     {
  //       "firstName": "Jason",
  //       "lastName": "Musillo",
  //       "foreverAge": 39,
  //       "country": "United States",
  //       "state": "New York",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//9D24F29E-42E4-47A6-8B91-C17B15A77BD1.jpeg"
  //     },
  //     {
  //       "firstName": "Patrick",
  //       "lastName": "Gilligan",
  //       "foreverAge": 32,
  //       "country": "United States",
  //       "state": "Vermont",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//D3FB11CB-E6B9-4AA3-B740-D96B0ED3F463.jpeg"
  //     },
  //     {
  //       "firstName": "Gage",
  //       "lastName": "Taylor",
  //       "foreverAge": 29,
  //       "country": "United States",
  //       "state": "Florida",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound3997915400197158501.jpg"
  //     },
  //     {
  //       "firstName": "Brent",
  //       "lastName": "Rogin",
  //       "foreverAge": 33,
  //       "country": "United States",
  //       "state": "Michigan",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//0FB85CCE-B7DB-48D8-A458-4EB095037651.png"
  //     },
  //     {
  //       "firstName": "Ricky",
  //       "lastName": "Kidwell",
  //       "foreverAge": 22,
  //       "country": "United States",
  //       "state": "North Carolina",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound7465197092852063842.jpg"
  //     },
  //     {
  //       "firstName": "Matt",
  //       "lastName": "Franchitto",
  //       "foreverAge": 24,
  //       "country": "United States",
  //       "state": "Massachusetts",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound8856349067246401864.jpg"
  //     },
  //     {
  //       "firstName": "Chace",
  //       "lastName": "BENTLEY",
  //       "foreverAge": 24,
  //       "country": "United States",
  //       "state": "New York",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound8454231076864254820.jpg"
  //     },
  //     {
  //       "firstName": "Andy",
  //       "lastName": "Herrmann",
  //       "foreverAge": 25,
  //       "country": "United States",
  //       "state": "Indiana",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//80DAA9E2-F642-4911-9B4A-0D06BF5EBEA3.png"
  //     },
  //     {
  //       "firstName": "Michael",
  //       "lastName": "Rotthoff",
  //       "foreverAge": 37,
  //       "country": "United States",
  //       "state": "New York",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//DB22754D-5C8F-4983-82A7-B78E062F802D.jpeg"
  //     },
  //     {
  //       "firstName": "Cesar “Nuno”",
  //       "lastName": "Alvarez",
  //       "foreverAge": 27,
  //       "country": "United States",
  //       "state": "Texas",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//9BFA3427-0FD5-4524-ABFF-24506C060242.jpeg"
  //     },
  //     {
  //       "firstName": "LaTasha",
  //       "lastName": "Lee",
  //       "foreverAge": 24,
  //       "country": "United States",
  //       "state": "Indiana",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//92629525-DC19-41AA-BA1A-475FAD218A4F.png"
  //     },
  //     {
  //       "firstName": "Dana",
  //       "lastName": "True",
  //       "foreverAge": 42,
  //       "country": "United States",
  //       "state": "New York",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//AD5457A0-C4C9-4036-ABC5-EDDEE2FB9D60.jpeg"
  //     },
  //     {
  //       "firstName": "Nikolas",
  //       "lastName": "Lopez",
  //       "foreverAge": 30,
  //       "country": "United States",
  //       "state": "Idaho",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//IMG_3522.jpeg"
  //     },
  //     {
  //       "firstName": "Haley",
  //       "lastName": "Langway",
  //       "foreverAge": 28,
  //       "country": "United States",
  //       "state": "Maine",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound1526374808469093826.png"
  //     },
  //     {
  //       "firstName": "Matthew",
  //       "lastName": "Terry",
  //       "foreverAge": 24,
  //       "country": "United States",
  //       "state": "Indiana",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//FB_IMG_1656229761577.jpg"
  //     },
  //     {
  //       "firstName": "Dakota",
  //       "lastName": "Groves",
  //       "foreverAge": 23,
  //       "country": "United States",
  //       "state": "Tennessee",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//IMG_2659.jpeg"
  //     },
  //     {
  //       "firstName": "Nikko",
  //       "lastName": "Robinson",
  //       "foreverAge": 21,
  //       "country": "United States",
  //       "state": "North Carolina",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound2353907767594943993.jpg"
  //     },
  //     {
  //       "firstName": "Michelle",
  //       "lastName": "Rice",
  //       "foreverAge": 36,
  //       "country": "United States",
  //       "state": "New York",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound2388797873192027614.jpg"
  //     },
  //     {
  //       "firstName": "Jay",
  //       "lastName": "Stevens",
  //       "foreverAge": 29,
  //       "country": "United States",
  //       "state": "New York",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound7827204361058037836.jpg"
  //     },
  //     {
  //       "firstName": "Thomas",
  //       "lastName": "Signorile",
  //       "foreverAge": 18,
  //       "country": "United States",
  //       "state": "Illinois",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//Thomas%20for%20ETSY.jpeg"
  //     },
  //     {
  //       "firstName": "Gerald",
  //       "lastName": "Thompson",
  //       "foreverAge": 40,
  //       "country": "United States",
  //       "state": "New York",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//inbound4034710556744888189.jpg"
  //     },
  //     {
  //       "firstName": "Brittani",
  //       "lastName": "Albauer",
  //       "foreverAge": 27,
  //       "country": "United States",
  //       "state": "Mississippi",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//6E8576EB-90C8-4C31-98F5-034191859403.jpeg"
  //     },
  //     {
  //       "firstName": "Jeremy",
  //       "lastName": "Boyd",
  //       "foreverAge": 33,
  //       "country": "United States",
  //       "state": "New Hampshire",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//IMG_6828.jpeg"
  //     },
  //     {
  //       "firstName": "Brad",
  //       "lastName": "Miller",
  //       "foreverAge": 30,
  //       "country": "United States",
  //       "state": "New York",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//69478026_2105487489746474_791701058362540032_n.jpg"
  //     },
  //     {
  //       "firstName": "Raven",
  //       "lastName": "Hooper",
  //       "foreverAge": 19,
  //       "country": "United States",
  //       "state": "Colorado",
  //       "imgUrl": "https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com//B0BD98FD-A834-4BA9-B6C6-3E92440ACBE7.jpeg"
  //     }
  //   ]
  // newPeople.map(person => {person.foreverAge = "" + person.foreverAge; savePerson(person)})
  // }, [])

  const HeroRoutes = () => (<Routes>
    <Route path="/" element={<Heroes/>}></Route>
    <Route path="/*" element={<Page404/>}></Route>
  </Routes>);

  const WallRoutes = () => (<Routes>

    {/* Total Numbers */}
    <Route path="/numbers" element={<ListView/>}></Route>

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

  </Routes>);


  return (

    <BrowserRouter>
        {subdomain !== 'heroes' ? <WallRoutes/> : <HeroRoutes/>}
    </BrowserRouter>

  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
)
