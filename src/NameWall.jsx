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

    useEffect(() => {
        const getData = async () => {
            const models = await DataStore.query(Person);


            setPeople([...people, ...models])
            setSearchablePeople([...people, ...models])
        }

        getData();
    }, [])


    // set width
    useEffect(() => {

        console.log('state', stateParams);
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


        // console.log('group from params', groupByState[stateParams.charAt(0).toUpperCase() + stateParams.slice(1)])
        // sort states alphabetically
        let finalStateData;
        if (stateParams && groupByState[stateParams.charAt(0).toUpperCase() + stateParams.slice(1)]){
            // console.log('setting spefici state info')
            finalStateData = {[stateParams.charAt(0).toUpperCase() + stateParams.slice(1)]: groupByState[stateParams.charAt(0).toUpperCase() + stateParams.slice(1)]};
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


        // console.log('final state', finalStateData);

        if (stateParams) {
            // console.log('state people', [...Object.values(finalStateData)][0])
            setSearchablePeople(Object.values(finalStateData)[0])
        } else{
            // console.log('all people');
            setSearchablePeople(sortedPeople);
        }





    }, [ stateParams ])

    useEffect(() => {
        const grid = document.querySelector('.grid');
        const lastNode = grid?.lastChild //as HTMLElement;

        if (lastNode) {

            const position = lastNode.getBoundingClientRect();


            if (windowHeight - 50 < position.bottom){
                setWidth(appWidth + 200);
            }

        }
    }, [people, appWidth, stateParams])


    useEffect(() => {
        if (searchPerson) {
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
            // personEl.style.backgroundColor="#e9e9e9"
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


    return (
        <div className="main-app" style={{width: appWidth + 'vw'}}>
            {Object.keys(stateData).length > 0 &&
            <div className="grid">
                {/* <div className="bg-img" /> */}
                { Object.keys(stateData).map(state => (
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
                ))}
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
                <Modal closeModal={() => {setModal(false)}}>
                    {openModal=== "stateFilter" && <StateFilter closeModal={() => setModal(false)}/>}

                    {/* TODO Highlight Person */}
                    {openModal=== "findPerson" && <FindPerson personState={[searchPerson, setSearch]} closeModal={() => setModal(false)}/>}
                </Modal>
            }

            {/* {formOpen && <Form addPerson={addPerson} cancel={() => toggleForm(!formOpen)}/>} */}


        </div>
    );
}

export default App;
