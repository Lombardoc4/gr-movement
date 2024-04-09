import { Header } from "../components/Header";
import { ScrollingWall } from "../components/ScrollingWall";
import { Loader } from "../components/Loader";
import { Sublinks } from "../components/SubLinks";

import { LocationEffect } from "../utils/hooks/locationEffect";
import { useNames } from "../utils/hooks/useNames";
import { GroupedPeople } from "../utils/lib/helpers";
import { useLocationStore } from "../store/locationStore";
// import { countriesEffect } from "../utils/hooks/countriesEffect";

const NameWall = () => {
    // const { country, state } = useLocationContext();
    const country = useLocationStore((state) => state.country);
    const state = useLocationStore((state) => state.state);

    const wallTitle = state.id !== "" ? state.name : country.name;

    // Set country and state based on URL
    LocationEffect();

    // Fetch names and
    // Subscribe to realtime data for live in-person events
    const people = useNames() as GroupedPeople;

    return (
        <>
            <Header title='Drug Epidemic Memorial Name Wall' />

            <main>
                <Sublinks>
                    <h2 className='h-gradient'>{wallTitle} Name Wall</h2>
                </Sublinks>

                {Object.keys(people).length === 0 ? <Loader /> : <ScrollingWall entries={people} />}
            </main>
        </>
    );
};

export default NameWall;
