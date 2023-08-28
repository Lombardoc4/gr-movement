import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNames } from "../utils/hooks/useNames";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import { Person } from "../utils/models";
import { CountryProps, countries } from "../utils/data/countries";
import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { ScrollingWall } from "../components/ScrollingWall";
import { parseData, groupData } from "../utils/lib/nameParsers";
import { ScrollToTop } from "../components/ScrollToTop";
import { useWindowScroll } from "../utils/hooks/useWindowScroll";
import HubSyncContext from "../utils/hooks/HubContext";
import { StateProps, states } from "../utils/data/states";

interface NameWallProps {
    country?: string;
}

export interface GroupedPeople {
    [key: string]: Person[];
}

const NameWall = ({ country = "Worldwide" }: NameWallProps) => {
    // Router Loader Data
    // const loadData = useLoaderData() as Person[];

    // urlParams
    const { countryId, stateId } = useParams();

    // Scrolling
    const toggleScroll = useWindowScroll();

    // Master Modals Open State
    const [modalsClosed, setModalsClosed] = useState(false);

    // Data Loading
    const dataSynced = useContext(HubSyncContext);

    // is mobile media query
    const isMobile = useMediaQuery("(max-width: 768px)");

    // If there's a countryId params if no country default to Worldwide
    if (countryId) {
        const fullCountry = countries.find((c) => c.id.toLowerCase() === countryId);
        // Set to matching country or  worldwide if no matching
        country = fullCountry?.name || "Worldwide";
    }

    // Subscribe to realtime data for events
    const people = useNames(country, stateId) as Person[];
    const [models, setModels] = useState(parseData(people));

    const entries = useMemo(
        () => groupData(models, ["United States", "Canada"].includes(country) ? "state" : "country"),
        [country, models]
    );

	console.log('entries', Object.keys(entries))

	const pageLinks : (StateProps | CountryProps)[] = Object.keys(entries).map((e: string) => {
		if ((country === 'United States' || country === 'Canada') && states[country].find(s => s.name === e)) {
			// Get State ids
			return states[country].find(s => s.name === e);
		} else if (countries.find((c) => c.name === e)) {
			// Get Country id
			return countries.find((c) => c.name === e);
		}
	}).filter((val): val is (StateProps | CountryProps) => val !== undefined);

	console.log('pageLinks', pageLinks)

    const FilterMemo = useMemo(
        () => (
            <Filters
                country={country}
                stateId={stateId}
                models={models.map((m) => ({
                    id: m.id,
                    value: m.firstName + " " + m.lastName,
                }))}
                searchAction={() => setModalsClosed(!modalsClosed)}
            />
        ),
        [country, stateId, models, modalsClosed]
    );

    useEffect(() => {
        const newModels = parseData(people);
        if (newModels.length !== models.length) {
            setModels(newModels);
        }
    }, [models.length, people]);

    return (
        <>
            <Header title='Drug Epidemic Memorial' />

            <main>

				{pageLinks.length > 1 &&
					<div className="list-container">
						<div className="list">
							{pageLinks.map(pLink => (pLink.id ? <Link key={pLink.id} className="h2" to={pLink.id}>{pLink.name}</Link> : <></>))}
						</div>
					</div>
				}

                {!isMobile && FilterMemo}


                {!dataSynced ? <Loader /> : <ScrollingWall entries={entries} />}
            </main>

            <ScrollToTop scrollFunction={toggleScroll} filterChild={FilterMemo} />
        </>
    );
};

export default NameWall;

const Loader = () => (
    <div
        className='container'
        style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
        <p className='h1 loading-loader'>Loading</p>
    </div>
);
