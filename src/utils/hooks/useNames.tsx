import { useContext, useEffect, useState } from "react";
import { states } from "../data/states";
import LocationContext from "./LocationContext";
import { countryWStates, parseData } from "../lib/helpers";


import { Person } from "../models";
import { generateClient } from "aws-amplify/api";
import { onCreatePerson } from "../graphql/subscriptions";
import { listPeople } from "../graphql/queries";
import { ListPeopleQueryVariables } from "../../API";

const client = generateClient();


export const useNames = () => {
    const { country, state } = useContext(LocationContext);
    const [names, setNames] = useState<Person[]>([]);
    const [nextToken, setNextToken] = useState<string>('');


    useEffect(() => {
        // Default query all data
        const variables: ListPeopleQueryVariables | undefined = {
            limit: 1000
        }
        // If state and we have state data
        if (state.id.length > 0 && countryWStates(country.name)) {
            const stateName = states[country.name].find((s) => s.id === state.id)?.name;

            // Get State name && Query by state name
            if (stateName && variables.filter) {

                variables.filter.state ={
                    eq: stateName
                }
            }

        } else if (country.name !== "Worldwide" && variables.filter) {
            // Query By Country
            variables.filter.country = {
                eq: country.name
            }
        }

        if (nextToken) {
            variables.nextToken = nextToken
        }



        client.graphql({
            query: listPeople,
            variables: variables
        }).then(({data}) => {
            if (data.listPeople.nextToken) {
                setNextToken(data.listPeople.nextToken)
            }
            setNames(prev => parseData([...prev, ...data.listPeople.items]));
        })

    }, [country, state, nextToken]);


        useEffect(() => {

        const subscription = client
            .graphql({ query: onCreatePerson })
            .subscribe({
                next: ({ data }) => {
                    setNames(prev => parseData([...prev, data.onCreatePerson]));
                },
                error: (error) => error,
            });


        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
            setNextToken('')
        };

    }, [country, state]);


    return names;
};
