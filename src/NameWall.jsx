import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { useParams, useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Person } from './models';

import Form from './Form'
import StateFilter from './StateFilter'
import { useInterval } from './useInterval';

import { data } from './data-state.js';
import Modal from './Modal';
import FindPerson from './FindPerson';
import WallPerson from './WallPerson';

import {StateAbbrMap} from './states';

interface PersonProps {
    firstName: string;
    lastName: string;
    foreverAge: string;
}

const windowHeight = window.innerHeight;


const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

function App() {
    const {stateParams} = useParams();
    const [stateData, setStateData] = useState({});
    const [people, setPeople] = useState(data);
    const [searchablePeople, setSearchablePeople] = useState(data);
    const [searchPerson, setSearch] = useState('');
    const [appWidth, setWidth] = useState(100)
    const [scrollPosition, setScrollPosition] = useState(1)
    const [formOpen, toggleForm] = useState(false);
    const [openModal, setModal] = useState(false);


    // No resizing to be larger
    // useEffect(() => {
    //     setWidth(100);
    // }, [stateParams])


    // Currently not using form data
    useEffect(() => {

        const getData = async () => {
            const models = await DataStore.query(Person);


            setPeople([...people, ...models])
            if (searchablePeople.length === 0) {
                setSearchablePeople([...people, ...models])
            }
        }

        getData();
    }, [])


    // set width
    useEffect(() => {

        const sortedPeople = people.sort((a, b) => a.lastName.localeCompare(b.lastName))
        //  Group by state
        const groupByState = groupBy(sortedPeople, 'state')



        // combine with by abbreviations
        for (const [key, value] of Object.entries(StateAbbrMap)) {
            if (groupByState[value] && groupByState[key]){
                groupByState[value] = groupByState[value].concat(groupByState[key]);
            }
            delete groupByState[key]
          }


        //   console.log(groupByState);

        // console.log('group from params', groupByState[stateParams.charAt(0).toUpperCase() + stateParams.slice(1)])
        // sort states alphabetically
        const capitalizeStateName = (state) => {
            const firstWord = stateParams.charAt(0).toUpperCase() + stateParams.slice(1);

            const spaceIndex = state.indexOf(' ');

            if (spaceIndex < 0){
                return firstWord;
            }

            const secondWord = stateParams.charAt(spaceIndex + 1).toUpperCase() + stateParams.slice(spaceIndex + 2);
            return firstWord.slice(0, spaceIndex) + ' ' + secondWord;
        }


        const stateNameCapitalized = stateParams ? capitalizeStateName(stateParams) : '';

        let finalStateData;
        if (stateParams && groupByState[stateNameCapitalized]){
            // console.log('setting spefici state info')
            finalStateData = {[stateNameCapitalized]: groupByState[stateNameCapitalized]};
        } else {

            finalStateData = Object.keys(groupByState).sort().reduce(
                (obj, key) => {
                    obj[key] = groupByState[key];
                    return obj;
                }, {});


                // console.log('sort state', sortedStates);
                // setStateData(sortedStates);
        }


        setStateData(finalStateData)


        // console.log('state parms', stateParams);

        if (stateParams) {
            // console.log('state people', [...Object.values(finalStateData)][0])
            setSearchablePeople(Object.values(finalStateData)[0])
        } else{
            // console.log('all people');
            setSearchablePeople(sortedPeople);
        }





    }, [ stateParams ])



    // Set Width
    useEffect(() => {

        const grid = document.querySelector('.grid');
        const lastNode = grid?.lastChild //as HTMLElement;

        if (lastNode) {

            console.log(lastNode);
            const position = lastNode.getBoundingClientRect();


            if (windowHeight - 50 < position.bottom){
                setWidth(appWidth + 200);
            }

        }
    }, [searchablePeople, appWidth, stateParams])


    useEffect(() => {
        if (searchPerson) {
            const previousPerson = document.querySelector(`.person-info.found`);
            if (previousPerson) {
                previousPerson.classList.remove('found')
            }

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
            personEl.scrollIntoView();
        }
    }, [searchPerson])


    // useInterval(() => {
    //     const grid = document.querySelector('.grid');
    //     const gridWidth = grid?.getBoundingClientRect().width
    //     const translateWidth = scrollPosition <= gridWidth ? -1 : 1

    //     setScrollPosition(p => p + translateWidth)

    //     window.scrollTo({left: scrollPosition, top: 0, behavior: 'smooth'});
    // }, 1)




    const addPerson = (person: PersonProps) => {
        setPeople([...people, person])
    }

    const closeModal = () => {
        if (openModal === 'stateFilter') {
            setSearch('');
        }
        setModal(false);
    }


    return (
        <div className="main-app" style={{width: appWidth + 'vw'}}>
            {Object.keys(stateData).length > 0 &&
            <div className="grid">
                {/* <div className="bg-img" /> */}
                { Object.keys(stateData).map(state => {
                        if (state) {
                            return (


                        <>
                        <div name={state} className='person-info'>
                            <h2 className='name' style={{fontSize: '42px'}}>
                                {state === "" ? 'Not Identified' : state} :
                            </h2>
                        </div>
                        {/* {console.log('people', stateData[state])} */}
                        {
                            stateData[state].map((person, index) => (
                                <WallPerson key={person.firstName + index} person={person}/>
                            ))
                        }
                        </>
                        )
                    }
                }) }
            </div>
            }

            <div className='glare'/>

            <div className="floating">
                <div className="add-btn" tabIndex={0} onClick={() => setModal('findPerson')}>
                    Find Your Loved One
                </div>
                <div className="add-btn" tabIndex={0} onClick={() => setModal('stateFilter')}>
                    Filter by State
                </div>
                {/* <StateFilter/> */}
                <div className="add-btn" tabIndex={0}>
                    <a href="https://drugepidemicmemorial.org/">+ Include your Loved One</a>
                </div>
            </div>

            {openModal &&
                <Modal closeModal={closeModal}>
                    {openModal=== "stateFilter" && <StateFilter closeModal={closeModal}/>}

                    {/* TODO Highlight Person */}
                    {openModal=== "findPerson" && <FindPerson personState={[searchPerson, setSearch]} closeModal={closeModal}/>}
                </Modal>
            }

            {/* {formOpen && <Form addPerson={addPerson} cancel={() => toggleForm(!formOpen)}/>} */}


        </div>
    );
}

export default App;
