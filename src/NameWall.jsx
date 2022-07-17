import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Person } from './models';

import { countries } from './data/countries';
import { states } from './data/states';
import { data } from './data/data-img.js';
import WallPerson from './WallPerson';

import Menu from './Menu';
import './App.css';

import { importData } from './data/importData';


const windowHeight = window.innerHeight;

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

const getCountryInfo = (countryParams) => {
    return countries.find(c => c.id === countryParams)
}

function App() {
    // URL Params
    const {stateParams, countryParams} = useParams();

    // All People Data
    const [people, setPeople] = useState([]);

    // People on Wall
    const [activeData, setActiveData] = useState({});

    // Search values
    const [searchPerson, setSearch] = useState('');

    // Wall width
    const [appWidth, setWidth] = useState(100)

    // Menu Status
    const [menuOpen, toggleMenu] = useState(false);

    // Values for Dropdown
    const [country, setCountry] = useState(countryParams || 'usa');
    const [state, setState] = useState(stateParams || 'Nationwide');


    // Manual Data upload
    // !use cautiously
    // // useEffect(() => {
    // //     console.log('only happen once - data:', importData);

    // //     const savePerson = async (person) => {

    // //         const newPerson = await DataStore.save(
    // //             new Person({...person, country: 'United States', foreverAge: person.foreverAge + ''})
    // //         );

    // //         console.log('new person', newPerson)
    // //     }

    // //     importData.map(person => savePerson(person))
    // // }, [])

    useEffect(() => {
        const {name} = getCountryInfo(country);

        console.log(name)
        const getData = async () => {
            let models = [];
            if (country === 'usa'){
                models = await DataStore.query(Person, p => p.or( p => p.country('eq', name).country('eq', null)));

                // Include data from manual upload
                models = [...models, ...data];
            } else {
                models = await DataStore.query(Person, p => p.or( p => p.country('eq', name)));
                setActiveData({[name]:  models});
            }

            // Sort People Data by last name
            const sortedPeople = models.sort((a, b) => a.lastName.localeCompare(b.lastName))

            // Set data
            if (country === 'usa') {
                // Group By State Listed
                const groupByState = groupBy(sortedPeople, 'state');

                // Group by states that populate the ui
                states.map(({name, id}) => {
                    if (groupByState[name] && groupByState[id]){
                        groupByState[name] = groupByState[name].concat(groupByState[id]);
                    }
                    delete groupByState[id]
                })

                // Sort states by name
                const sortedStatesPeople = Object.keys(groupByState).sort().reduce(
                    (obj, key) => {
                        obj[key] = groupByState[key];
                        return obj;
                    }, {}
                );


                setActiveData(sortedStatesPeople);
                setPeople(sortedStatesPeople)
            } else {
                // Available data
                setPeople(models);
                setActiveData({[name] : sortedPeople});
            }
        };

        getData();

    }, [country])


    useEffect(() => {
        if (country !== 'usa') return;

        // states[0] should be nationwide
        const activeState = states.find(s => s.id === state.toUpperCase()) || states[0];
        if (!activeState.id) {
            setActiveData(people);
            return;
        }

        const name = activeState.name;
        const peopleFromActiveState = people[name] || [];
        setActiveData({[name]: peopleFromActiveState});


    }, [state, people])




    // Resize window
    useEffect(() => {
        setWidth(100);
    }, [activeData])

    // Manage width of window
    useEffect(() => {
        const grid = document.querySelector('.grid');
        const lastNode = grid?.lastChild //as HTMLElement;

        if (lastNode) {

            const position = lastNode.getBoundingClientRect();

            if (windowHeight - 100 < position.bottom){
                setWidth(appWidth + 200);
            }

        }
    }, [people, appWidth, stateParams])


    // Search Effect
    useEffect(() => {
        if (searchPerson) {
            const previousPerson = document.querySelector(`.person-info.found`);
            if (previousPerson) {
                previousPerson.classList.remove('found')
            }

            let searchablePeople = []
            Object.values(activeData).map(peopleByState => searchablePeople = [...searchablePeople, ...peopleByState]);

            const foundPerson = searchablePeople.find(person => {
                if (!person || !person.firstName || !person.lastName) {
                    return false;
                }

                const name = person.firstName + ' ' + person.lastName;
                return name.substring(0, searchPerson.length).toLowerCase() === searchPerson.toLowerCase();
            });


            if (!foundPerson) {
                return;
            }

            const name = foundPerson.firstName + ' ' + foundPerson.lastName;
            const personEl = document.querySelector(`[name='${name}']`);
            personEl.classList.add('found');
            personEl.scrollIntoView({inline: "center"});
        }
    }, [searchPerson])




    return (
        <div className="main-app" style={{width: appWidth + 'vw'}}>
            <div className={"grid " +(menuOpen ? 'grid-slideRight' : '' )}>
                {Object.keys(activeData).length > 0 &&  Object.keys(activeData).map(state => {
                        if (state && state !== 'null') {
                            return (
                                <React.Fragment key={state}>
                                    {/* State Title */}
                                    <div name={state} className='person-info state'>
                                        <h2 className='name'>
                                            {state === "" ? 'Not Identified' : state} <span>:</span>
                                        </h2>
                                    </div>

                                    {/* People */}
                                    {activeData[state].map((person, index) => (
                                        <WallPerson key={person.firstName + index} person={person}/>
                                    ))}
                                </React.Fragment>
                            )
                        }
                    })}
            </div>


            <Menu
                menuState={[menuOpen, toggleMenu]}
                countryState={[country, setCountry]}
                stateState={[state, setState]}
                personState={[searchPerson, setSearch]}
                searchablePeople={activeData}/>



            <div className="floating">

                <div className="add-btn" tabIndex={0} onClick={() => toggleMenu(!menuOpen)}>
                    Menu
                </div>
            </div>

        </div>
    );
}

export default App;
