

import './index.scss';

import { DataStore } from '@aws-amplify/datastore';
import { Person } from '../models';

import { states } from '../data/states';
import { data } from '../data/data-img.js';
import { useEffect, useState } from 'react';

const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
        const keyValue = x[key] === '' ? 'Other' : x[key];
        (rv[keyValue] = rv[keyValue] || []).push(x);
        return rv;
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

            // Sort People by last name
            // const sortedPeople = people.sort((a, b) => a.lastName.localeCompare(b.lastName));


            // group by Country
            const groupByCountry = groupBy(people, 'country');
            groupByCountry['United States'] = [...groupByCountry['null'], ...groupByCountry['United States']]
            delete groupByCountry['null'];

            // Sort Countries Alphabetically
            const sortedCountry = Object.keys(groupByCountry).sort().reduce(
                (obj, key) => {
                    obj[key] = groupByCountry[key];
                    return obj;
                }, {}
            );

            setWorldwide(sortedCountry);

            // Sort USA & Canada States
            const countryWithStates = ['United States', 'Canada'];
            const countryAbbreviation = {"United States": "usa", "Canada": "can"}
            countryWithStates.map(country => {

                const groupByState = groupBy(sortedCountry[country], 'state');

                states[countryAbbreviation[country]].map(({name, id}) => {
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
        <main class="byTheNumbers">
            <h1>Drup Epidemic Memorial</h1>
            <h2>By The Numbers</h2>

            <div class="accordian-container">
                <div className="accordian">

                    <h3>Worldwide</h3>
                    <p className='totals'>Total:{Object.values(worldwide).reduce((total, state) => state.length + total, 0)} </p>

                    {Object.keys(worldwide).map(country => (
                        <div className='accordian-item'>
                            <p className="country-name">{country}:</p> {worldwide[country].length}
                        </div>
                    ))}
                </div>
                <div className="accordian">
                    <h3>United States</h3>
                    <p className='totals'>Total:{Object.values(unitedStates).reduce((total, state) => state.length + total, 0)} </p>
                    {Object.keys(unitedStates).map(state => (
                        <div className='accordian-item'>
                            <p className="country-name">{state}:</p> {unitedStates[state].length}
                        </div>
                    ))}
                </div>
                <div className="accordian">
                    <h3>Canada</h3>
                    <p className='totals'>Total:{Object.values(canada).reduce((total, state) => state.length + total, 0)} </p>

                    {Object.keys(canada).map(state => (
                        <div className='accordian-item'>
                            <p className="country-name">{state}:</p> {canada[state].length}
                        </div>
                    ))}
                </div>

            </div>
        </main>
    )
}

export default ListView