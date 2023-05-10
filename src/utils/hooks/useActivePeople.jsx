import { DataStore } from '@aws-amplify/datastore';
import { Person } from '../models';

import { useEffect, useState } from "react"
import { states } from '../data/states';



const getState = (countryName, stateName = 'Nationwide') => {
    return states[countryName].filter(s => s.name === stateName )[0];
}

const getQuery = (countryName, state) => {

    if (state && state.name && state.id) {
        return  (p) =>
            p.or((p) => [
                p.state.eq(state.name),
                p.state.eq(state.id)
            ])
    } else if (countryName === 'Worldwide') {
        return p => p
    } else {
        return p => p.country.eq(countryName)
    }
}

export const useActivePeople = (country, state) => {
    const [activePeople, setActivePeople] = useState([]);

    const getStateInfo = () => {
        // No country or state return
        if (!country.name && !state.name) { return false; }

        // all states or a no states
        if (!state) { return country.name === 'Worldwide' ? state : getState(country.name);}

        // A specific state or no state
        return country.name === 'Worldwide' ? state : getState(country.name, state.name);
    }


    useEffect(() => {
        const stateInfo = getStateInfo()

        // Return empty array if no state or country
        if(!country && !stateInfo) {
            setActivePeople([]);
            return;
        }



        const query = getQuery(country.name, stateInfo);

        const subscription = DataStore.observeQuery(
            Person,
            query
          ).subscribe(snapshot => {

            const { items, isSynced } = snapshot;


            if (isSynced) {
                // Sort Alphabetically
                const sortedModels = items.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))

                // Log Duplicates
                // const duplicates = items.filter((item, index) => {
                //     return !items.find((other, otherIndex) => item.firstName === other.firstName && item.lastName === other.lastName && index !== otherIndex && item.foreverAge === other.foreverAge && item.state === other.state)
                // })
                // console.log('duplciates', duplicates)

                // Use inverse of above to remove duplicates
                const filteredModels = items.filter((item, index) => {
                    return !items.find((other, otherIndex) => item.firstName === other.firstName && item.lastName === other.lastName && index !== otherIndex && item.foreverAge === other.foreverAge && item.state === other.state)
                })


                // const sc = items.filter((item, index) => {
                //     return item.state === 'South Carolina' || item.state === 'SC';
                // })
                // console.log('SC', sc)

                // Update People
                setActivePeople(filteredModels);
            }

        });

        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
        }

    }, [country, state])


    return [activePeople, setActivePeople];
}
