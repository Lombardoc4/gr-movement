import { create } from "zustand";
import { GroupedPeople } from "../utils/lib/helpers";
import { LazyPerson } from "../utils/models";

type State = {
    names: LazyPerson[];
    groupedNames: GroupedPeople;
    sublinks: string[];
    allDataFetch: boolean;
};

type Action = {
    updateNames: (names: State["names"]) => void;
    updateGroupedNames: (groupedNames: State["groupedNames"]) => void;
    updateSublinks: (sublinks: string[]) => void;
    updateAllDataFetch: (allDataFetch: boolean) => void;
};


export const useNameWallStore = create<State & Action>((set) => ({
    names: [],
    groupedNames: {},
    sublinks: [],
    allDataFetch: false,
    updateNames: (names) => set(() => ({ names })),
    updateGroupedNames: (groupedNames) => set(() => ({ groupedNames })),
    updateSublinks: (sublinks) => set(() => ({ sublinks })),
    updateAllDataFetch: (allDataFetch) => set(() => ({ allDataFetch })),
}));
