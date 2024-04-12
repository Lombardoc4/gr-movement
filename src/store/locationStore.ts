import { create } from "zustand";
import { CountryProps, countries } from "../utils/data/countries";
import { StateProps, states } from "../utils/data/states";

type State = {
    country: CountryProps
    state: StateProps;
    loading: boolean
    photo: boolean
};

type Action = {
    updateCountry: (countryId: string) => void;
    updateState: (stateId: string) => void;
    updateLoading : (loading: boolean) => void;
    updatePhoto: (photo: boolean) => void;
};


const initialLocation = {
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

const findCountry = (countryId: string) => {
    return countries.find((c) => c.id === countryId.toUpperCase()) || initialLocation.country;
}

export const findState = (country: string, stateId: string) => {
    if (!states[country]) return initialLocation.state;
    return states[country].find((s) => s.id === stateId.toUpperCase()) || initialLocation.state;
}

// Create your store, which includes both state and (optionally) actions
export const useLocationStore = create<State & Action>((set) => ({
    ...initialLocation,
    loading: true,
    photo: false,
    updateCountry: (countryId) => set(() => ({ country: findCountry(countryId)})),
    updateState: (stateId) => set((state) => ({ state: findState(state.country.name, stateId) })),
    updateLoading: (loading) => set(() => ({ loading })),
    updatePhoto: (photo) => set(() => ({ photo })),
}));
