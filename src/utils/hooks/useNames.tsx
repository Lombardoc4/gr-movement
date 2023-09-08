import { DataStore } from "@aws-amplify/datastore";
import { Person } from "../models";
import { useContext, useEffect, useState } from "react";
import { states } from "../data/states";
import LocationContext from "./LocationContext";
import { countryWStates, parseData } from "../lib/helpers";

export const useNames = () => {
    const { country, state } = useContext(LocationContext);
    const [names, setNames] = useState<Person[]>([]);
    const [synced, setSynced] = useState(false);

    useEffect(() => {
        // Default query all data
        let query = (p: any) => p;

        // If state and we have state data
        if (state.id.length > 0 && countryWStates(country.name)) {

            const stateName = states[country.name].find((s) => s.id === state.id)?.name;

            // Get State name && Query by state name
            if (stateName) {
                query = (p: any) => p.state.eq(stateName);
            }

        } else if (country.name !== "Worldwide") {
            // Query By Country
            query = (p: any) => p.country.eq(country.name);
        }


        const subscription = DataStore.observeQuery(Person, query).subscribe((snapshot) => {
            const { items, isSynced } = snapshot;

            if (isSynced) {
                setSynced(true)
                // Update People
                setNames(parseData(items));
            }
        });

        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
        };

    }, [country, state]);

    // console.log('names', names)

    return [synced, names];
};
