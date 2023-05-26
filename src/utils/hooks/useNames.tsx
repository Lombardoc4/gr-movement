import { DataStore } from '@aws-amplify/datastore';
import {  Person } from '../models';
import { useEffect, useState } from "react"
import { states } from '../data/states';


export const useNames = (country: string, state?: string) => {
    const [names, setNames] = useState<Person[]>([]);

    let query = ((p:any) => p);
    if (state && (country === 'United States' || country === 'Canada')) {
        const stateName = states[country].find(s => s.id.toLowerCase() === state)?.name;
        if (stateName) {
            query = ((p:any) => p.state.eq(stateName));
        }

    } else if (country !== 'Worldwide') {
        query = ((p:any) => p.country.eq(country));
    }

    // console.log('country', country)

    useEffect(() => {
        const subscription = DataStore.observeQuery(
            Person,
            query
          ).subscribe(snapshot => {

            const { items, isSynced } = snapshot;

            if (isSynced) {

                // Update People
                setNames(items);
            }

        });

        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
        }

    }, [])


    return names;
}
