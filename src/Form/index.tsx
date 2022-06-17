import React, { useState } from 'react';
import './App.css';

import { DataStore } from '@aws-amplify/datastore';
import { Person } from '../models';


const ageRange = [0, 99];

interface FormInputs {
    value: string | number,
    error: string
}

interface formValues {
    firstName: string,
    lastName: string,
    dod: Date,
}

const handleValidation = (value, type) => {
    let error = ''

    // Number range check
    if (type === 'number' && value <= ageRange[0] || value >= ageRange[1] ){
        error = "Provide a number between 1 and 99"
    }

    // Required check
    if (!value || value.length <= 0) {
        error = 'This field is required'
    }

    return error;
};



function App( { cancel, addPerson }) {
    const [firstName, setFirstName] = useState<FormInputs>({value: '', error: ''});
    const [lastName, setLastName] = useState<FormInputs>({value: '', error: ''});
    const [foreverAge, setAge] = useState<FormInputs>({value: 0, error: ''});


    // Form Handling
    const handleSubmit = (e : React.SyntheticEvent) => {
        e.preventDefault();

        let errors: boolean = false;

        // Handle validation
        if (firstName.value.length === 0) {
            setFirstName({...firstName, error: 'This field is required'});
            errors = true;
        }
        if (lastName.value.length === 0) {
            setLastName({...firstName, error: 'This field is required'});
            errors = true;
        }

        if (foreverAge.value < 1 || foreverAge.value > 99) {
            setAge({...foreverAge, error: 'Provide a number between 1 and 99'});
            errors = true;
        }

        if (foreverAge.value === 0) {
            setAge({...foreverAge, error: 'This field is required'});
            errors = true;
        }

        if (errors) { return; }




        const newSubmission = {
            firstName: firstName.value,
            lastName: lastName.value,
            foreverAge: foreverAge.value
        };

        const savePerson = async () => {
            const newPerson = await DataStore.save(
                new Person(newSubmission)
            );

            addPerson(newPerson);
            cancel();
            // Success Message of some sort
        }

        savePerson();
    };





    return (
        <div className="form-main">


            <form onSubmit={handleSubmit} id="addPersonForm">

                {/* First Name */}
                <label htmlFor="firstName">Loved One's First Name:</label>
                <input type="text" name="firstName"  required  onChange={(e) => setFirstName({...firstName, value: e.target.value})} />
                {firstName.error ? <span className='error-msg'>{firstName.error}</span> : ' '}

                {/* Last Name */}
                <label htmlFor="lastName">Loved One's Last Name: </label>
                <input type="text" name="lastName" required onChange={(e) => setLastName({...firstName, value: e.target.value})} />
                {/* <span className='error-msg'>{lastName.error}</span> */}
                {lastName.error ? <span className='error-msg'>{lastName.error}</span> : ' '}


                {/* Date */}
                <label htmlFor="age">Forever Age:
                    <span style={{fontSize: '0.75rem', fontStyle: 'italic'}}> (e.g. 36)</span>
                </label>
                <input onChange={(e) => setAge({...foreverAge, value: e.target.value})} required type="number" min={ageRange[0]} max={ageRange[1]} name="age" />
                {/* <span className='error-msg'>{age.error}</span> */}
                {foreverAge.error ? <span className='error-msg'>{foreverAge.error}</span> : ' '}

                {/* Submit */}
                <div className="btn-group">

                    <div onClick={cancel} className='btn remove-btn' role="button" aria-controls="filename" tabIndex="0">Cancel</div>

                    <input className="btn" type="submit" value="Submit" />
                </div>

                <hr/>

                <p className="gr-movement">Brought to you by The Global Recovery Movement</p>

            </form>
        </div>
    );
}

export default App;
