import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useNames } from "../utils/hooks/useNames";
import useMediaQuery from "../utils/hooks/useMediaQuery";
import { Person } from "../utils/models";
import { countries } from "../utils/data/countries";
import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { ScrollingWall } from "../components/ScrollingWall";
import { parseData, groupData } from "../utils/lib/nameParsers";





interface NameWallProps {
    country?: string,
}

export interface GroupedPeople {
    [key: string]: Person[]
}




const NameWall = ({country = "Worldwide"} :NameWallProps) => {
    // Router Loader Data
    const loadData = useLoaderData() as Person[];
    // urlParams
    let { countryId, stateId } = useParams();

    // mobileFilters
    const [filterOpen, toggleFilters] = useState(false);
    // is mobile media query
    const isMobile = useMediaQuery("(max-width: 700px)")


    // If there's a countryId params if no country default to Worldwide
    if (countryId) {
        // Set to matching country or  worldwide if no matching
        country = countries.find(c => c.id.toLowerCase() === countryId)?.name || "Worldwide";
    }

    // Subscribe to realtime data for events
    const people = useNames(country || "Worldwide", stateId) as Person[];



    const [models, setModels] = useState(parseData(loadData.length > 0 ? loadData : people))
    const entries = useMemo(() => groupData(models, ["United States", "Canada"].includes(country)  ? 'state': 'country'), [models])


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
    }, [loadData, people])


    return (
        <>

        <Header title="Drug Epidemic Memorial">
            <>
                <div>
                    <p>The Drug Epidemic Memorial Wall is a virtual International wall honoring our loved ones.</p>
                    <p>This stunning, heartbreaking, and seemingly endless stream of precious lives is a powerful visual created for healing, educationg, raising awareness and honoring our loved ones by saving lives.</p>
                </div>
                <div className="container">
                    <h2>Instructions</h2>
                    <p>
                        On the top of your screen you will see a filter bar.
                        This will showcase the name of the active section of the wall, as well as any active filters.
                        <ul>
                            You can:
                            <li>Search for your loved one by name</li>
                            <li>Filter the wall by country</li>
                            <li>Filter the wall by state/province in the United States and Canada</li>
                        </ul>
                    </p>
                    <p>
                        As you scroll, a group of buttons will appear on the bottom.
                        These buttons provide some presentation features.
                        <div style={{display: 'flex', gap: '2em', paddingTop: '1em', textAlign: 'center'}}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5em'}}><button>Scroll</button> Automatically scroll the wall</div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5em'}}><button>Music</button> Open a music player where you can play, pause and skip tracks</div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5em'}}><button>Help</button> Open these instructions</div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5em'}}><svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="40" height="40" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z"></path></svg> Scroll to the top of the page</div>
                        </div>
                    </p>
                </div>
            </>
        </Header>

        <div>

            { (!isMobile || filterOpen) && <Filters country={country} stateId={stateId} models={models}/>}

            <ScrollingWall entries={entries}/>

        </div>

        { isMobile &&
            <div style={{position: 'fixed', bottom: '1em', left: '1em', right: '1em', display: 'flex', gap: '1em', justifyContent: 'stretch', zIndex: 1000}}>
                <button style={{flex: 1}} onClick={() => toggleFilters(!filterOpen)}>Filters</button>
                <button style={{flex: 1}}>Scroll</button>
                <button style={{flex: 1}}>Music</button>
                <button style={{flex: 1}}>Menu</button>
            </div>
        }


        </>

    )
}

export default NameWall;