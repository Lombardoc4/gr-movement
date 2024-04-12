import { useEffect, useState } from "react";
import {  countryWStates, groupBy, setFilter, sortAlphabetically } from "../lib/helpers";

import { ListPeopleQueryVariables, ModelSubscriptionPersonFilterInput } from "../../API";
import { useLocationStore } from "../../store/locationStore";
import { fetchNames } from "../api/fetchNames";
import { subscribeNames } from "../api/subscribeNames";
import { useNameWallStore } from "../../store/nameWallStore";

export const useNames = () => {
    // Location State
    const country = useLocationStore((state) => state.country);
    const state = useLocationStore((state) => state.state);
    const loadingLocation = useLocationStore((state) => state.loading);

    //  NameWall Data State
    const [names, setNames] = useNameWallStore((state) => [state.names, state.updateNames]);
    const [groupedNames, setGroupedName] = useNameWallStore((state) => [state.groupedNames, state.updateGroupedNames]);
    const [allDataFetch, setAllDataFetch] = useNameWallStore((state) => [state.allDataFetch, state.updateAllDataFetch]);
    const setSublinks = useNameWallStore((state) => state.updateSublinks);

    const [nextToken, setNextToken] = useState<string>("");


    // Fetch data
    useEffect(() => {
        // Hold off on until location is loaded
        if (loadingLocation) return;

        // console.log('go')

        // If all data has been fetched prevent fetching it again
        // Also make sure data has been grouped
        if (allDataFetch && Object.keys(groupedNames).length === 0) {
            // Filter names by country or state
            const filteredNames = names.filter((name) => {
                // If state and entry state == state
                if (state.id && name.state !== state.name) return false;
                // If country and entry country == country
                else if (country.id && name.country !== country.name) return false;
                // If no state and no country return all
                else if (!state.id && !country.id) return true;

                return true;
            });


            const alphabetically = sortAlphabetically(filteredNames);
            const groupedData = groupBy(alphabetically, countryWStates(country.name) ? "state" : "country");
            setGroupedName(groupedData);
            setSublinks(Object.keys(groupedData));

            return;
        }

        // If group names are not empty then we have names and no next token
        // so we should not fetch new data
        if (Object.keys(groupedNames).length !== 0) return;


        // Configure filter values
        const variables = setFilter(country, state, nextToken) as ListPeopleQueryVariables;

        fetchNames(variables).then(({ data }) => {
            // Update next token

            // If no next token, all data has been fetched
            // so lets sort and group the data
            if (!data.listPeople.nextToken) {
                if (country.name === "Worldwide") {
                    // console.log('all data fetched')
                    setAllDataFetch(true);
                }

                // Format data
                const alphabetically = sortAlphabetically([...names, ...data.listPeople.items]);
                const groupedData = groupBy(alphabetically, countryWStates(country.name) ? "state" : "country");
                setGroupedName(groupedData);
                setSublinks(Object.keys(groupedData));
            }

            // Set next token
            setNextToken(data.listPeople.nextToken || "");
            // Update names
            setNames([...names, ...data.listPeople.items]);

        });
    }, [country.name, state.name, nextToken, loadingLocation, groupedNames]);

    // Subscribe to new data
    useEffect(() => {
        const variables = setFilter(country, state) as ListPeopleQueryVariables;

        // *** Remove limit as it is not used for subscriptions
        delete variables.limit;

        const subscription = subscribeNames(variables as ModelSubscriptionPersonFilterInput, (data) => {
            // Check if addition is relevant to country and state
            const addition = data.onCreatePerson;
            if (!addition) return;

            // Update all names
            const alphabetically = sortAlphabetically([...names, addition]);
            setNames(alphabetically);


            // If current state matches additions state
            // Or if current country has states and addition country matches
            if (
                (state.name && addition.state === state.name) ||
                (countryWStates(country.name) && addition.country === country.name)
            ) {
                // Group by state
                setGroupedName(groupBy(alphabetically, "state"));
                return;
            }

            // If country is worldwide or addition country matches
            if (country.name === "Worldwide" || country.name === addition.country) {
                // Group by country
                setGroupedName(groupBy(alphabetically, "country"));
                return;
            }
        });

        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
            setNextToken("");
        };
    }, [country.name, state.name]);

    return groupedNames;
};
