import { useParams } from "react-router-dom";
import { useMemo } from "react";

import { ErrorElement } from "./ErrorPage";
import { Header } from "../components/Header";
import { ScrollingWall } from "../components/ScrollingWall";
import { Loader } from "../components/Loader";
import { Sublinks } from "../components/SubLinks";

import { useLocationContext } from "../utils/hooks/LocationContext";
import { useNames } from "../utils/hooks/useNames";
import { Person } from "../utils/models";
import { countryWStates, groupData } from "../utils/lib/helpers";




const NameWall = () => {
    const { params } = useParams();
    const { country, state } = useLocationContext();

    const wallTitle = state.id !== '' ? state.name : country.name;

    // Subscribe to realtime data for live in-person events
    const people = useNames() as Person[];

    // Group Data by Countries or States
    const entries = useMemo(() => groupData(people, countryWStates(country.name) ? "state" : "country"), [people]);

    // If there are params and no matching country err page
    if (params && country.id === "") {
        return <ErrorElement />;
    }

    return (
        <>
            <Header title='Drug Epidemic Memorial Name Wall' />

            <main>

                <Sublinks entries={Object.keys(entries)} country={country} back={true}>
                        <h2 className='h-gradient'>{wallTitle} Name Wall</h2>
                </Sublinks>


                {people.length === 0 ? <Loader /> : <ScrollingWall entries={entries} />}
            </main>

        </>
    );
};

export default NameWall;
