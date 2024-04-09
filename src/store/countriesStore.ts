import { create } from "zustand";

type State = {
    countries: string[];
};

type Action = {
    updateCountries: (countryList: State["countries"]) => void;
};


export const useCountriesStore = create<State & Action>((set) => ({
    countries: [],
    updateCountries: (countryList) => set(() => ({ countries: countryList })),
}));
