import { Person } from "../models";

export interface GroupedPeople {
    [key: string]: Person[];
}

export const parseData = (items: Person[]) => {
    // Sory by first name
    const sortedModels = items.sort((a, b) => (a.firstName > b.firstName ? 1 : b.firstName > a.firstName ? -1 : 0));

    // Use inverse of above to remove duplicates
    // const filteredModels = sortedModels.filter((item, index) => {
    //     return !items.find(
    //         (other, otherIndex) =>
    //             item.firstName === other.firstName &&
    //             item.lastName === other.lastName &&
    //             index !== otherIndex && // doesnt have same index as of item
    //             item.foreverAge === other.foreverAge &&
    //             item.state === other.state
    //     );
    // });
    return sortedModels;

    // return filteredModels;
};

export const groupData = (items: Person[], filterBy: string) => {
    const groupByKey: GroupedPeople = items.reduce((acc: GroupedPeople, cur: Person) => {
        const { country, state } = cur;

        if (!country) {
            return acc;
        }

        const key = (filterBy === "state" ? state : country) || "~Unknown";

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(cur);

        return acc;
    }, {});

    if (filterBy === "state") {
        // Sort States alphabetically
        // TODO just use states data since it's already in order
        return Object.keys(groupByKey)
            .sort()
            .reduce((obj: GroupedPeople, key: string) => {
                obj[key] = groupByKey[key];
                return obj;
            }, {});
    }

    return groupByKey;
};

export const countryWStates = (country: string) => {
    return ["United States", "Canada"].includes(country)
}