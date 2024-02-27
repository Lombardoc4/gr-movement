import { useContext, useEffect, useState } from "react";
import { states } from "../data/states";
import LocationContext from "./LocationContext";
import { countryWStates, parseData } from "../lib/helpers";

import { Person } from "../models";
import { generateClient } from "aws-amplify/api";
import { onCreatePerson } from "../graphql/subscriptions";
import { listPeople } from "../graphql/queries";
import { ListPeopleQueryVariables } from "../../API";
import { useParams } from "react-router-dom";

const client = generateClient();

// Default query all data


export const useNames = () => {
    const { params } = useParams();

    const { country, state } = useContext(LocationContext);
    const [names, setNames] = useState<Person[]>([]);
    const [nextToken, setNextToken] = useState<string>("");



    useEffect(() => {

        const variables: ListPeopleQueryVariables = {
            limit: 1000,
            filter: {}
        };

        if (params && country.id === "") {
            return;
        }

        // If state and we have state data
        if (state.id.length > 0 && countryWStates(country.name)) {
            const stateName = states[country.name].find((s) => s.id === state.id)?.name;

            // Get State name && Query by state name
            if (stateName && variables.filter) {
                variables.filter.state = {
                    eq: stateName,
                };
            }
        }
        if (country.name !== "Worldwide" && variables.filter) {
            // Query By Country
            variables.filter.country = {
                eq: country.name,
            };
        }


        client
            .graphql({
                query: listPeople,
                variables: variables,
            })
            .then(({ data }) => {
                if (data.listPeople.nextToken) {
                    setNextToken(data.listPeople.nextToken);
                }
                setNames(parseData(data.listPeople.items));
            });
    }, [country.name, state.name]);

    useEffect(() => {


        if (nextToken) {
            const variables: ListPeopleQueryVariables = {
                limit: 1000,
                filter: {}
            };

            // If state and we have state data
            if (state.id.length > 0 && countryWStates(country.name)) {
                const stateName = states[country.name].find((s) => s.id === state.id)?.name;

                // Get State name && Query by state name
                if (stateName && variables.filter) {
                    variables.filter.state = {
                        eq: stateName,
                    };
                }
            }
            if (country.name !== "Worldwide" && variables.filter) {
                // Query By Country
                variables.filter.country = {
                    eq: country.name,
                };
            }


            variables.nextToken = nextToken;

            client
                .graphql({
                    query: listPeople,
                    variables: variables,
                })
                .then(({ data }) => {
                    if (data.listPeople.nextToken) {
                        setNextToken(data.listPeople.nextToken);
                    }
                    setNames((prev) => parseData([...prev, ...data.listPeople.items]));
                });
        }
    }, [nextToken]);

    useEffect(() => {
        const subscription = client.graphql({ query: onCreatePerson }).subscribe({
            next: ({ data }) => {
                setNames((prev) => parseData([...prev, data.onCreatePerson]));
            },
            error: (error) => error,
        });

        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
            setNextToken("");
        };
    }, [country.name, state.name]);

    return names;
};
