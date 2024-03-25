import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { countries } from "../data/countries";
import { states } from "../data/states";



const initalLocation = {
    country: {
        name: "Worldwide",
        id: "",
        alpha: "",
    },
    state: {
        name: "",
        id: "",
    },
};


const LocationContext = createContext<LocationProps>(initalLocation);

function LocationProvider({ children }: { children: JSX.Element }) {
    const [loc, setLoc] = useState(initalLocation);
    const location = useLocation();

    useEffect(() => {
        // We need to map the country and state
        const [country, state] = location.pathname.split("/").slice(1);

        const newLoc = { ...initalLocation };


        if (country) newLoc.country = countries.find((c) => c.id === country.toUpperCase()) || initalLocation.country;


        if (state && states[newLoc.country.name]) {
            newLoc.state =
            states[newLoc.country.name].find((s) => s.id === state.toUpperCase()) || initalLocation.state;
        }

        setLoc(newLoc);
    }, [location]);

    return <LocationContext.Provider value={loc}>{children}</LocationContext.Provider>;
}

export { LocationProvider };

export const useLocationContext = () => {
    return useContext(LocationContext);
};

export default LocationContext;
