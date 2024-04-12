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
        // updateLoading(true);
        const photoPath = location.pathname.includes('photos');
        if (photoPath) updatePhoto(true);

        // We need to map the country and state
        if (photoPath) {
            const [country, state] = location.pathname.split("/").slice(2);
            if (state) {
                if (findState("United States", state).id === state.toUpperCase()) {
                    updateCountry("USA");
                    updateState(state);
                } else if (findState("Canada", state).id === state.toUpperCase()) {
                    updateCountry("CAN");
                    updateState(state);
                }
            }
            else if (!country || country === "teens") {
                updateCountry("USA");
                updateState('');
            } else if (country === "can") {
                updateCountry("CAN");
                updateState('');

            } else {
                // Rest of the world no sublinks
                updateCountry("");
                updateState('');
            }

            if (locationLoading) updateLoading(false);

            return;
        }

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
