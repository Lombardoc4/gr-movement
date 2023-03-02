import { DataStore } from '@aws-amplify/datastore';
import { Person } from '../models';

import { useEffect, useState } from "react"
import { data } from '../data/data-img.js';
import { states } from '../data/states';


console.log(data.filter(entry => ['kansas', 'missouri'].includes(entry.state.toLowerCase())))

const getState = (countryName, stateName = 'Nationwide') => {
    return states[countryName].filter(s => s.name === stateName )[0];
}

const getQuery = (countryName, state) => {
    if (state && state.name && state.id) {
        return  p => p.or((p) => p.state('eq', state.name).state('eq', state.id))
    } else if (countryName === 'Worldwide') {
        return p => p
    } else {
        return p => p.country('eq', countryName)
    }
}

export const useActivePeople = (country, state) => {
    const [activePeople, setActivePeople] = useState([]);

    const getStateInfo = () => {
        if (!country && !state) {
            return false;
        }
        if (!state) {
            return country.name === 'Worldwide' ? state : getState(country.name);
        }

        return country.name === 'Worldwide' ? state : getState(country.name, state.name);
    }


    useEffect(() => {

        const stateInfo = getStateInfo()
        if(!country && !stateInfo) {
            setActivePeople([]);
            return;
        }
        const query = getQuery(country.name, stateInfo);


        // Query/Filter Local Data
        const localData = data.filter((item) => {
            if (stateInfo && stateInfo.name) {
                // Return all for country
                if (stateInfo.name === 'Nationwide') return true;

                // Return
                return item.state === stateInfo.name || item.state === stateInfo.id;
            } else if (country.name !== 'Worldwide') {
                // Get specific country
                return item.country === country.name;
            } else {
                // Return all
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
