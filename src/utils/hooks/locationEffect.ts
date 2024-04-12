import { useLocation } from "react-router-dom";
import { findState, useLocationStore } from "../../store/locationStore";
import { useEffect } from "react";
import { useNameWallStore } from "../../store/nameWallStore";

export const LocationEffect = () =>  {
    const location = useLocation();

    // Location State
    const updateCountry = useLocationStore((state) => state.updateCountry);
    const updateState = useLocationStore((state) => state.updateState);
    const [locationLoading, updateLoading] = useLocationStore((state) => [state.loading, state.updateLoading]);
    const updatePhoto = useLocationStore((state) => state.updatePhoto);

    // GroupedNames State
    const setNames = useNameWallStore((state) => state.updateNames);
    const setGroupedName = useNameWallStore((state) => state.updateGroupedNames);
    const setSublinks = useNameWallStore((state) => state.updateSublinks);
    const allDataFetch = useNameWallStore((state) => state.allDataFetch);


    useEffect(() => {
        // Remove remnant of photo wall
        updatePhoto(true);

        const [country, state] = location.pathname.split("/").slice(1);
        updateCountry(country ? country.toUpperCase() : '');
        updateState(state ? state.toUpperCase(): '');

        // Reset group names && sublinks
        setGroupedName({});
        setSublinks([]);


        // Reset names if all data has NOT been fetched
        // This prevents duplicate names from being displayed
        if (!allDataFetch) {
            setNames([]);
        }

        // Remove initial loading
        if (locationLoading) updateLoading(false);
    }, [location]);

}

export const PhotoLocationEffect = () =>  {
    const location = useLocation();

    // Location State
    const updateCountry = useLocationStore((state) => state.updateCountry);
    const updateState = useLocationStore((state) => state.updateState);
    const updateLoading = useLocationStore((state) => state.updateLoading);
    const updatePhoto = useLocationStore((state) => state.updatePhoto);


    useEffect(() => {
        updateLoading(true);
        updatePhoto(true);
        const [country, state] = location.pathname.split("/").slice(2);

        // teen wall and canada wall have state
        if (state) {
            // USA teen wall
            if (findState("United States", state).id === state.toUpperCase()) {
                updateCountry("USA");
                updateState(state);
                // Canada wall
            } else if (findState("Canada", state).id === state.toUpperCase()) {
                updateCountry("CAN");
                updateState(state);
            }
        }
        // Base case is USA photo wall or teens is only USA
        else if (!country || country === "teens") {
            updateCountry("USA");
            updateState("");
        }
        // Base case is Canada photo wall
        else if (country === "can") {
            updateCountry("CAN");
            updateState("");
        } else {
            // Case for USA photo wall - there is no USA prefix
            if (findState("United States", country).id === country.toUpperCase()) {
                updateCountry("USA");
                updateState(country);
            }
            // Rest of the world no sublinks
            else {
                updateCountry("");
                updateState("");
            }
        }

        updateLoading(false);

        return;
    }, [location]);

}
