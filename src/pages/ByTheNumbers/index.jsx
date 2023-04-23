

import './index.scss';

import { DataStore } from '@aws-amplify/datastore';
import { Person } from '../../utils/models';

import { states } from '../../utils/data/states';
import { useEffect, useState } from 'react';

const groupBy = function(list, key) {
    return list.reduce(function(returnValue, item) {
        const keyValue = item[key] || 'Other';

        // Add to existing keyValue or start empty array
        (returnValue[keyValue] = returnValue[keyValue] || []).push(item);

        return returnValue;
    }, {});


  };

const ByTheNumbers = () => {
    const [worldwide, setWorldwide] = useState(0);
    const [unitedStates, setUnitedStates] = useState(0);
    const [canada, setCanada] = useState(0);

    useEffect(() => {

        // Get All Data
        const subscription = DataStore.observeQuery(
        Person
        ).subscribe(snapshot => {

            const { items } = snapshot;

            // group by Country
            const groupByCountry = groupBy(items, 'country');

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
                    } else {
                        groupByState[name] = groupByState[name]  ? [...groupByState[name]] : [];
                    }
                    delete groupByState[id]
                    return name;
                })

                delete groupByState['Nationwide'];



                if (groupByState['Other'] && groupByState['null']) {
                    groupByState['Other'] = [...groupByState['Other'], ...groupByState['null']];
                    delete groupByState['null']
                }

                // console.log('gorupByState', groupByState)

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
            <Accordian title="worldwide" data={worldwide}/>
            <Accordian title="united-states" data={unitedStates}/>
            <Accordian title="canada" data={canada}/>
        </main>
    )
}

export default ByTheNumbers

const Accordian = ({title, data}) => {
    const [hideDetails, setHideDetails] = useState(false);

    return (
        <div className="accordian">
        <h3>{title.charAt(0).toUpperCase() + title.slice(1)} - Total:{Object.values(data).reduce((total, state) => state.length + total, 0)} </h3>

        <div className="accordian-toggler" tabIndex={0} onClick={() => setHideDetails(!hideDetails)}>{hideDetails ? 'Show' : 'Hide'} Details</div>

        <div className={title + (hideDetails ? ' hide' : '') + " accordian-container"}>

            {Object.keys(data).map(value => (
                <div key={value} className='accordian-item'>
                    <p className="country-name">{value}:</p>
                    <p>{data[value].length}</p>
                </div>
            ))}
            </div>
        </div>
    );
}