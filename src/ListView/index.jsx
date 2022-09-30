

import './index.scss';

import { DataStore } from '@aws-amplify/datastore';
import { Person } from '../models';

import { states } from '../data/states';
import { data } from '../data/data-img.js';
import { useEffect, useState } from 'react';

const groupBy = function(list, key) {
    return list.reduce(function(returnValue, item) {
        const keyValue = item[key] || 'Other';

        // Add to existing keyValue or start empty array
        (returnValue[keyValue] = returnValue[keyValue] || []).push(item);

        return returnValue;
    }, {});


  };

const ListView = () => {
    const [worldwide, setWorldwide] = useState(0);
    const [unitedStates, setUnitedStates] = useState(0);
    const [canada, setCanada] = useState(0);


    useEffect(() => {

        // Get All Data
        const subscription = DataStore.observeQuery(
        Person
        ).subscribe(snapshot => {

            const { items } = snapshot;
            const people =  [...items, ...data];


            // group by Country
            const groupByCountry = groupBy(people, 'country');

            // Sort Countries Alphabetically
            const sortedCountry = Object.keys(groupByCountry)
                .sort((first, second) => {
                    // Make sure USA if first followed by Canada
                    if (first === 'Canada'  && second === 'United States') {
                        return 1
                    }
                    else if (first === 'United States') {
                        return -1
                    }
                    else if (first === 'Canada'){
                        return -1
                    }
                }).reduce((obj, key) => {
                        obj[key] = groupByCountry[key];
                        return obj;
                    }, {}
                );

            setWorldwide(sortedCountry);


            // Sort USA & Canada States
            const countryWithStates = ['United States', 'Canada'];
            countryWithStates.map(country => {

                const groupByState = groupBy(sortedCountry[country], 'state');

                states[country].map(({name, id}) => {
                    if (groupByState[name] && groupByState[id]){
                        groupByState[name] = groupByState[name].concat(groupByState[id]);
                    }
                    delete groupByState[id]
                    return name;
                })

                if (groupByState['Other'] && groupByState['null']) {
                    groupByState['Other'] = [...groupByState['Other'], ...groupByState['null']];
                    delete groupByState['null']
                }



                // Sort states by name
                const sortedStatesPeople = Object.keys(groupByState).sort().reduce(
                    (obj, key) => {
                        obj[key] = groupByState[key];
                        return obj;
                    }, {}
                );

                if (country === 'United States'){
                    setUnitedStates(sortedStatesPeople)
                }

                if (country === 'Canada') {
                    setCanada(sortedStatesPeople)
                }
            });

        });

        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
        }

    }, []);






    return (
        <main className="byTheNumbers">
            <h1>Drug Epidemic Memorial</h1>
            <h2>By The Numbers</h2>

            <div className="accordian-container">
                <div className="accordian">

                    <h3>Worldwide</h3>
                    <p className='totals'>Total:{Object.values(worldwide).reduce((total, state) => state.length + total, 0)} </p>

                    {Object.keys(worldwide).map(country => (
                        <div key={country} className='accordian-item'>
                            <p className="country-name">{country}:</p> {worldwide[country].length}
                        </div>
                    ))}
                </div>
                <div className="accordian">
                    <h3>United States</h3>
                    <p className='totals'>Total:{Object.values(unitedStates).reduce((total, state) => state.length + total, 0)} </p>
                    {Object.keys(unitedStates).map(state => (
                        <div  key={state}  className='accordian-item'>
                            <p className="country-name">{state}:</p> {unitedStates[state].length}
                        </div>
                    ))}
                </div>
                <div className="accordian">
                    <h3>Canada</h3>
                    <p className='totals'>Total:{Object.values(canada).reduce((total, state) => state.length + total, 0)} </p>

                    {Object.keys(canada).map(province => (
                        <div key={province} className='accordian-item'>
                            <p className="country-name">{province}:</p> {canada[province].length}
                        </div>
                    ))}
                </div>

            </div>
        </main>
    )
}

export default ListView