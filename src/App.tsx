import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import './App.css';

const fakeData = [
    {
        name:        'John Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '2020-01-01',
        image:       'https://placekitten.com/200/300',
    },
    {
        name:        'Jane Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '2020-01-01',
        image:       'https://placekitten.com/300/300',
    },
    {
        name:        'John Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '2020-01-01',
        image:       'https://placekitten.com/200/300',
    },
    {
        name:        'Jane Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '1981-01-01',
        image:       'https://placekitten.com/400/400',
    },
    {
        name:        'John Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '1967-01-01',
        image:       'https://placekitten.com/200/300',
    },
    {
        name:        'Jane Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '1955-01-01',
        image:       'https://placekitten.com/600/300',
    },
    {
        name:        'John Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '1986-01-01',
        image:       'https://placekitten.com/200/300',
    },
    {
        name:        'Jane Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '1994-01-01',
        image:       'https://placekitten.com/600/300',
    },
    {
        name:        'John Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '1997-01-01',
        image:       'https://placekitten.com/200/300',
    },
    {
        name:        'Jane Doe',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date:        '2002-01-01',
        image:       'https://placekitten.com/600/300',
    },
];

function CalcAge(date: string) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function Person({person}) {
    // const [horizontal, setHorizontal] = useState(false);
    const [horizontal, setHorizontal] = useState(true);
    const imgRef = useRef(null);

    useEffect(() => {
        const img = imgRef.current;

        img.addEventListener('load', () => {
            const imgWidth = img.clientWidth;
            const imgHeight = img.clientHeight;
            const imgRatio = imgWidth / imgHeight;

            if (imgRatio >= 1) {
                setHorizontal(true);
            } else {
                setHorizontal(false);
            }
        })
    }, []);



    return (
        <div className="person">
            <div className="row">
                <div className="person-image">
                    <img ref={imgRef} src={person.image} alt={person.name} />
                </div>
                <div className="person-info">
                    <h2 className='name'>{person.name}</h2>
                    {/* Get age from this number: */}
                    <p>Forever Age {CalcAge(person.date)}</p>
                    { !horizontal && <p>{person.description}</p>}
                </div>
            </div>
            { horizontal && <p style={{paddingTop: '10px'}}>{person.description}</p>}
            <br/>
            <hr/>
        </div>
    )
}

const windowWidth = window.innerWidth;

function App() {
    const [personPoints] = useState(fakeData);


    console.log(personPoints);

    return (
        <div className="app">

            <div className="grid">
                <div className="bg-img" />
                {personPoints.map((person, index) => <Person key={person.name + index} person={person} />)}
            </div>

            <div className="add-btn">

                <Link to="/form">+ Include your loved one</Link>
            </div>

        </div>
    );
}

export default App;
