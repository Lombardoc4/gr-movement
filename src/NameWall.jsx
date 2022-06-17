import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { DataStore } from '@aws-amplify/datastore';
import { Person } from './models';

import Form from './Form'
import { useInterval } from './useInterval';

import { data } from './data.js';


interface PersonProps {
    firstName: string;
    lastName: string;
    foreverAge: string;
}

const windowHeight = window.innerHeight;


function App() {
    const [people, setPeople] = useState(data);

    const [appWidth, setWidth] = useState(100)
    const [scrollPosition, setScrollPosition] = useState(1)
    const [formOpen, toggleForm] = useState(false);


    // set width
    useEffect(() => {
        const grid = document.querySelector('.grid');
        const lastNode = grid?.lastChild //as HTMLElement;

        const position = lastNode.getBoundingClientRect();

        if (windowHeight - 50 < position.bottom){
            setWidth(appWidth + 200);
        }



    }, [people, appWidth])



    // useInterval(() => {
    //     const grid = document.querySelector('.grid');
    //     const gridWidth = grid?.getBoundingClientRect().width
    //     const translateWidth = scrollPosition <= gridWidth ? -1 : 1

    //     setScrollPosition(p => p + translateWidth)

    //     window.scrollTo({left: scrollPosition, top: 0, behavior: 'smooth'});
    // }, 1)


    useEffect(() => {
        const getData = async () => {
            const models = await DataStore.query(Person);


            setPeople([...people, ...models])
        }

        getData();
    }, [])

    const addPerson = (person: PersonProps) => {
        setPeople([...people, person])
    }


    return (
        <div className="main-app" style={{width: appWidth + 'vw'}}>
            <div className="grid">
                {/* <div className="bg-img" /> */}

                {people.length > 0 && people.map((person: PersonProps, index: number) => (
                    <div key={person.firstName + index} className='person-info'>
                        <h2  className='name' style={{fontSize: '36px'}}>
                            {person.firstName}
                            {" "}
                            {person.lastName}
                            {person.foreverAge &&
                                <>
                                {", "}
                                {person.foreverAge}
                                </>
                            }
                            {" "}
                            <span>·</span>
                        </h2>
                    </div>
                ))}
            </div>

            <div className="add-btn" tabIndex={0} onClick={() => toggleForm(!formOpen)}>
                + Include your loved one
            </div>

            {formOpen &&
                <Form addPerson={addPerson} cancel={() => toggleForm(!formOpen)}/>
            }
        </div>
    );
}

export default App;
