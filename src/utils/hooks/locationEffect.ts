import { useLocation } from "react-router-dom";
import { useLocationStore } from "../../store/locationStore";
import { useEffect } from "react";
import { useNameWallStore } from "../../store/nameWallStore";

export const LocationEffect = () =>  {
    const location = useLocation();

    // Location State
    const updateCountry = useLocationStore((state) => state.updateCountry);
    const updateState = useLocationStore((state) => state.updateState);
    const locationLoading = useLocationStore((state) => state.loading);
    const updateLoading = useLocationStore((state) => state.updateLoading);

    // GroupedNames State
    const setNames = useNameWallStore((state) => state.updateNames);
    const setGroupedName = useNameWallStore((state) => state.updateGroupedNames);
    const setSublinks = useNameWallStore((state) => state.updateSublinks);
    const allDataFetch = useNameWallStore((state) => state.allDataFetch);

    useEffect(() => {
        // updateLoading(true);

        // We need to map the country and state
        const [country, state] = location.pathname.split("/").slice(1);
        if (country === 'photos') {
            console.log('photos')
            // do photo wall stuff
            const [country, state] = location.pathname.split("/").slice(2);
            updateCountry(country ? country.toUpperCase() : 'USA');
            updateState(state ? state.toUpperCase(): '');
            return
        }

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
