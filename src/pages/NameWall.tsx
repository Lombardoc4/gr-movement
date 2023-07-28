import { useLoaderData, useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNames } from "../utils/hooks/useNames";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import { Person } from "../utils/models";
import { countries } from "../utils/data/countries";
import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { ScrollingWall } from "../components/ScrollingWall";
import { parseData, groupData } from "../utils/lib/nameParsers";
import { ScrollToTop } from "../components/ScrollToTop";
import { useWindowScroll } from "../utils/hooks/useWindowScroll";
import HubSyncContext from "../utils/hooks/HubContext";

interface NameWallProps {
	country?: string;
}

export interface GroupedPeople {
	[key: string]: Person[];
}

const NameWall = ({ country = "Worldwide" }: NameWallProps) => {
	// Router Loader Data
	const loadData = useLoaderData() as Person[];
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
		// Set to matching country or  worldwide if no matching
		country = countries.find((c) => c.id.toLowerCase() === countryId)?.name || "Worldwide";
	}

	// Subscribe to realtime data for events
	const people = useNames(country || "Worldwide", stateId) as Person[];
	const [models, setModels] = useState(parseData(loadData.length > 0 ? loadData : people));
	const entries = useMemo(
		() => groupData(models, ["United States", "Canada"].includes(country) ? "state" : "country"),
		[country, models]
	);

	// Parse Data Everytime loadData updates from Router
	useEffect(() => {
		const data = loadData.length <= 0 ? people : loadData;

		if (data.length === models.length) {
			return;
		}

		// ! Beware hoisting
		const newModels = parseData(data);
		if (newModels.length !== models.length) {
			setModels(newModels);
		}
	}, [loadData, models.length, people]);



	const FilterMemo = useMemo(() => {
		return (
			<Filters
				country={country}
				stateId={stateId}
				models={models.map((m) => ({
					id: m.id,
					value: m.firstName + " " + m.lastName,

				}))}
                searchAction={() => setModalsClosed(!modalsClosed)}
			/>
		);
	}, [country, stateId, models, modalsClosed]);

	return (
		<>
			<Header title='Drug Epidemic Memorial' />

			<main>
				{!isMobile && FilterMemo}

				{!dataSynced ? (
					<div
						className='container'
						style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}
					>
						<p className='h1 loading-loader'>Loading</p>
					</div>
				) : (
					<ScrollingWall entries={entries} />
				)}
			</main>

			<ScrollToTop
				scrollFunction={toggleScroll}
				filterChild={FilterMemo}
			/>
		</>
	);
};

export default NameWall;
