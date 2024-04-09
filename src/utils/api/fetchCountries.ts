import { generateClient } from "aws-amplify/api";
import { listWallCountries } from "../graphql/queries";
import { WallCountries } from "../models";

const client = generateClient();

export const fetchCountries = async () => {
    try {
        const locationData = await client.graphql({ query: listWallCountries });
        const orderedCountries = locationData.data.listWallCountries.items.sort((first: WallCountries, second: WallCountries) => {
            // Make sure USA if first followed by Canada
            if (first.name === "Canada" && second.name === "United States") {
                return 1;
            } else if (first.name === "United States" || first.name === "Canada") {
                return -1;
            } else return 0;
        }).map((country: WallCountries) => country.name);
        return orderedCountries;
    } catch (error) {
        console.error("Error fetching countries", error);
    }
};