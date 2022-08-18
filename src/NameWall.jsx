import React, { useEffect, useState } from 'react';

import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Person } from './models';

import { countries } from './data/countries';
import { states } from './data/states';
import { data } from './data/data-img.js';
import WallPerson from './WallPerson';

import Menu from './Menu';
import './App.css';
import MusicPlayer from './MusicPlayer';

// import { importData } from './data/importData';

// TODO:  Make a preloader
// This will make sure names load and user isn't watching screen freak out

// TODO: Either update search to show person in a dropdown
// Todo: Or make sure appear on the button and show the names above


const windowHeight = window.innerHeight;

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        const keyValue = x[key] === '' ? 'Other' : x[key];
        (rv[keyValue] = rv[keyValue] || []).push(x);
        return rv;
    }, {});
  };

const getCountryInfo = (countryParams) => {
    return countries.find(c => c.id === countryParams)
}

let scrollID;

function App() {
    // Preloader
    const [preloader, togglePreloader] = useState(true);

    //Scroll Status
    const [scrolling, toggleScrolling] = useState(false);

    // URL Params
    // const {countyParams , stateParams, countryParams} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/').slice(1).filter(c => c !== 'scroll' || c !== '');
    const [countryParams, stateParams, countyParams] = path;



    // All People Data
    const [people, setPeople] = useState([]);

    // People on Wall
    const [activeData, setActiveData] = useState({});

    // Wall width
    const [appWidth, setWidth] = useState(0)

    // Menu Status
    const [menuOpen, toggleMenu] = useState(false);

    // Values for Dropdown
    const [country, setCountry] = useState(countryParams || '');
    const [state, setState] = useState(stateParams || 'Nationwide');
    const [county, setCounty] = useState(countyParams || 'Statewide');



    useEffect(() => {

        const countryInfo  = getCountryInfo(country);

        if (!countryInfo) {
            navigate('/')
            return;
        }

        const {name} = countryInfo;

        const query = {
            "usa": p => p.or( p => p.country('eq', name).country('eq', null)),
            "other":  p => p.country('eq', name),
            "": p => p

        }

        let models = [];
        const subscription = DataStore.observeQuery(
            Person,
            query[country] || query['other']
          ).subscribe(snapshot => {

            const { items, isSynced } = snapshot;

            // Use manual data for USA and Worldwide.
            models = ['', 'usa'].includes(country) ? [...items, ...data] : [...items];



            // Sort People Data by last name
            const sortedPeople = models.sort((a, b) => a.lastName.localeCompare(b.lastName))


            // Set data
            if (name === 'Worldwide') {
                const groupByCountry = groupBy(sortedPeople, 'country');

                groupByCountry['United States'] = [...groupByCountry['null'], ...groupByCountry['United States']]
                delete groupByCountry['null'];


                const sortedCountryPeople = Object.keys(groupByCountry).sort().reduce(
                    (obj, key) => {
                        obj[key] = groupByCountry[key];
                        return obj;
                    }, {}
                );

                setActiveData(sortedCountryPeople);
                setPeople(sortedCountryPeople);


            } else if (['usa', 'can'].includes(country)) {
                // Group By State Listed
                const groupByState = groupBy(sortedPeople, 'state');


                // Group by states that populate the ui
                states[country].map(({name, id}) => {
                    if (groupByState[name] && groupByState[id]){
                        groupByState[name] = groupByState[name].concat(groupByState[id]);
                    }
                    delete groupByState[id]
                    return name;
                })

                // Sort states by name
                const sortedStatesPeople = Object.keys(groupByState).sort().reduce(
                    (obj, key) => {
                        obj[key] = groupByState[key];
                        return obj;
                    }, {}
                );


                // Print People From A Certain State
                // const printPeopleState = 'New Jersey';
                // console.log(
                //     sortedStatesPeople[printPeopleState].map( p =>
                //         `${p.firstName} ${p.lastName}, ${p.foreverAge}`
                //     )
                // )


                setActiveData(sortedStatesPeople);
                setPeople(sortedStatesPeople)

            } else {
                // Available data
                setPeople(models);
                setActiveData({[name] : sortedPeople});
            }


        });

        // appWidth !== 100 ? setWidth(100) : togglePreloader(false);

        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
        }


    }, [country])



    useEffect(() => {

        if (!['usa', 'can'].includes(country)) return;


        // states[0] should be nationwide
        const activeState = states[country].find(s => s.id === state.toUpperCase()) || states[country][0];
        if (!activeState.id) {
            setActiveData(people);
            return;
        }

        const name = activeState.name;
        const peopleFromActiveState = people[name] || [];
        setActiveData({[name]: peopleFromActiveState});



    }, [state, people, country])



    // Use Preloader
    useEffect(() => {

        // Set loading true
        setWidth(100);
        togglePreloader(true);
    }, [country, state])


    // Manage width of window
    useEffect(() => {
        const grid = document.querySelector('.grid');
        const lastNode = grid?.lastChild //as HTMLElement;
        // console.log(lastNode);

        if (lastNode) {

            const addedDistance = window.innerWidth <= 440 ? 500 : 200
            const position = lastNode.getBoundingClientRect();
            if (windowHeight - 100 < position.bottom){
                setWidth(appWidth + addedDistance);
            } else {
                togglePreloader(false);
            }

        } else {
            setWidth(appWidth === 0 ? 100 : 0);
        }
    }, [appWidth, stateParams])



    useEffect(() => {
        if (!scrolling) {
            clearInterval(scrollID);
            return;
        }

        const startScroll = () => {
            let id = setInterval(() => {

                // if at end of screen, scroll to 0;
                if (window.innerWidth + window.scrollX >= document.getElementById('main-app').offsetWidth) {
                    window.scrollTo(0, 0);
                } else {
                    window.scrollBy(1, 0);
                }


            }, 30)



            return id;
        }

        scrollID = startScroll();
    }, [scrolling])

    return (
        <div id="main-app" className="main-app" style={{width: appWidth + 'vw'}}>
            <div className={'preloader ' + (preloader ? 'show' : '')}>
                <div className='loader'></div>
                <h1>Loading Names...</h1>
            </div>

            <div className={"grid " +(menuOpen ? 'grid-slideRight' : '' )}>
                {Object.keys(activeData).length > 0 &&  Object.keys(activeData).map(state => {
                            return (
                                <React.Fragment key={state}>
                                    {/* State Title */}

                                    <div name={state} className='person-info state'>
                                        <h2 className='name'>
                                            {(state === "" || state === 'null') ? 'Other' : state} <span>:</span>
                                        </h2>
                                    </div>

                                    {/* People */}
                                    {activeData[state].map((person, index) => (
                                        <WallPerson key={person.firstName + index} person={person}/>
                                    ))}
                                </React.Fragment>
                            )
                    })}
            </div>

            {!preloader &&
            <>
                <Menu
                menuState={[menuOpen, toggleMenu]}
                countryState={[country, setCountry]}
                stateState={[state, setState]}
                // countyState={[county, setCounty]}
                allPeople={Object.values(activeData).reduce((arr1, arr2) => [...arr1, ...arr2], [])}/>



                <div className="floating">

                    <div className="add-btn" tabIndex={0} onClick={() => toggleMenu(!menuOpen)}>
                        Menu
                    </div>


                    <div className="add-btn" tabIndex={0} onClick={() => toggleScrolling(!scrolling)}>
                        Scroll
                    </div>


                    {scrolling && <MusicPlayer/>}

                </div>
            </>
            }

        </div>
    );
}

export default App;
