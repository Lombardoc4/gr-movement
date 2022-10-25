import { DataStore } from '@aws-amplify/datastore';
import { Person } from '../models';

import { useEffect, useState } from "react"
import { data } from '../data/data-img.js';

const getQuery = (countryName, stateName) => {
    if (stateName) {
        return  p => p.state('eq', stateName)
    } else if (countryName === 'Worldwide') {
        return p => p
    } else {
        return p => p.country('eq', countryName)
    }
}

export const useActivePeople = (country, state) => {
    const [activePeople, setActivePeople] = useState([]);

    useEffect(() => {
        console.log('effect')

        const query = getQuery(country.name, state.name);


        // Query/Filter Local Data
        const localData = data.filter((item) => {
            if (state.name) {
                return item.state === state.name
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
            console.log('query', models)

            const { items, isSynced } = snapshot;

            // console.log('isSynced', isSynced)

            // Use manual data for USA and Worldwide.
            if (isSynced)
                models = [...models, ...items];

            console.log('models', models)

            // Sort Alphabetically
            models.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))

            setActivePeople(models);


        });



        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
        }

    }, [country, state])

    console.log('call me')

    return [activePeople, setActivePeople];
}
