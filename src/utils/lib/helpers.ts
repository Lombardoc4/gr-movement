import { ModelPersonFilterInput } from "../../API";
import { findState } from "../../store/locationStore";
import { CountryProps } from "../data/countries";
import { StateProps } from "../data/states";
import { Ambassador, Person } from "../models";

export interface GroupedPeople {
    [key: string]: Person[];
}
export interface GroupedAmbassadors {
    [key: string]: Ambassador[];
}

export const sortAlphabetically = (items: Person[]): Person[] => {
    return items.sort((a, b) => {
        // Sort by first name
        if (a.firstName > b.firstName) {
            return 1;
        }
        else if (b.firstName > a.firstName) {
            return -1;
        }

        // If first names are the same, sort by last name
        else if (a.lastName > b.lastName) {
            return 1
        }
        else if (b.lastName > a.lastName) {
            return -1
        }

        return 0;
    });
};

export const ambassadorGroupBy = (items: Ambassador[]) => {
    const groupedItems = items.reduce((acc: GroupedAmbassadors, cur: Ambassador) => {
        const value = cur.state;

        // Exclude those without the specified key
        if (!value) {
            return acc;
        }

        if (!acc[value]) {
            acc[value] = [];
        }

        acc[value].push(cur);

        return acc;
    }, {});

    // Sort the groups alphabetically
    return Object.fromEntries(Object.entries(groupedItems).sort());
}
export const groupBy = (items: Person[], key: 'country' | 'state') => {
    // Group items by the specified key

    const groupedItems = items.reduce((acc: GroupedPeople, cur: Person) => {
        const value = cur[key];

        // Exclude those without the specified key
        if (!value) {
            return acc;
        }

        if (!acc[value]) {
            acc[value] = [];
        }

        acc[value].push(cur);

        return acc;
    }, {});

    // Sort the groups alphabetically
    return Object.fromEntries(Object.entries(groupedItems).sort());
}


export const countryWStates = (country: string) => {
    return ["United States", "Canada"].includes(country)
}

export
const setFilter = (country: CountryProps, state: StateProps, nextToken?: string) => {
    const variables = {
        limit: 1000,
        filter: {} as ModelPersonFilterInput,
        nextToken: nextToken || null,
    };
    if (country.name === "Worldwide") {
        // TODO: This is where we get one country at a time
        // const index = 0;
        // variables.filter.country = {
        //     eq: countries[index],
        // };
    } else if (state.name && countryWStates(country.name)) {
        // If country has states
        const stateName = findState(country.name, state.id).name;
        if (stateName) {
            // Set country and state filter
            variables.filter = {
                country: {
                    eq: country.name,
                },
                state: {
                    eq: stateName,
                },
            };
        }
    } else if (country.name !== "Worldwide") {
        variables.filter.country = {
            eq: country.name,
        };
    }

    variables.filter._deleted = {
        attributeExists: false
    }

    console.log('variables', variables)

    return variables
}