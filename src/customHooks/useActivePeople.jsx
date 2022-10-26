import { DataStore } from '@aws-amplify/datastore';
import { Person } from '../models';

import { useEffect, useState } from "react"
import { data } from '../data/data-img.js';
import { states } from '../data/states';

const getState = (countryName, stateName = 'Nationwide') => {
    return states[countryName].filter(s => s.name === stateName )[0];
}

const getQuery = (countryName, state) => {
    if (state.name && state.id) {
        return  p => p.or((p) => p.state('eq', state.name).state('eq', state.id))
    } else if (countryName === 'Worldwide') {
        return p => p
    } else {
        return p => p.country('eq', countryName)
    }
}

export const useActivePeople = (country, state) => {
    const [activePeople, setActivePeople] = useState([]);
    const stateInfo = getState(country.name, state.name);


    useEffect(() => {

        const query = getQuery(country.name, stateInfo);


        // Query/Filter Local Data
        const localData = data.filter((item) => {
            if (stateInfo.name) {
                // item.state === stateInfo.id && console.log(item, stateInfo.id)
                return item.state === stateInfo.name || item.state === stateInfo.id;
            } else if (country.name !== 'Worldwide') {
                return item.country === country.name;
            } else {
                return true;
            }
        })


        let models = ['Worldwide', 'United States'].includes(country.name) ? [...localData] : [];


        const subscription = DataStore.observeQuery(
            Person,
            query
          ).subscribe(snapshot => {

            const { items, isSynced } = snapshot;


            // Use manual data for USA and Worldwide.
            if (isSynced)
                models = [...models, ...items];



            // Sort Alphabetically
            const sortedModels = models.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))

            console.log('sorted models', models);


            setActivePeople(sortedModels);


        });



        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
        }

    }, [country, state])


    return [activePeople, setActivePeople];
}
