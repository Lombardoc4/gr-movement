import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { ErrorElement } from "../../pages/ErrorPage";
import { FloatingFeatures } from "../FloatingFeatures";
import { Filters } from "../Filters";
import { Section, NameSection } from "./styles";

import LocationContext from "../../utils/hooks/LocationContext";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { CountryProps } from "../../utils/data/countries";
import { GroupedPeople } from "../../utils/lib/helpers";

const filterModels = (entries : GroupedPeople) => {
    return Object.values(entries).reduce((acc, cur) => acc = [...acc, ...cur], []).map((e) => ({
        id: e.id,
        value: e.firstName + " " + e.lastName,
    }))
}

const NoSubmissions = ({country} : {country : CountryProps}) => {
    return (
        <>
            <div className='container' style={{ textAlign: "center" }}>
                <h2>No submissions</h2>
                <Link className='btn' style={{ maxWidth: "350px", margin: "auto" }} to={`/${country.id.toLowerCase()}`}>
                    Back to {country.name}
                </Link>
            </div>
            <ErrorElement />
        </>
    );
}

export const ScrollingWall = ({ entries }: { entries: GroupedPeople }) => {
    const { country } = useContext(LocationContext);

    const isMobile = useMediaQuery("(max-width: 768px)");

    const [modalsClosed, setModalsClosed] = useState(false);

    const FilterEl = <Filters models={filterModels(entries)} searchAction={() => setModalsClosed(!modalsClosed)} />;

    if (Object.keys(entries).length <= 0) return <NoSubmissions country={country} />;

    return (
        <div id='scroller'>
            {!isMobile && FilterEl}

            {Object.keys(entries).map((entryGroup) => (
                <ScrollerSection key={entryGroup} entries={entries} entryGroup={entryGroup} />
            ))}

            <FloatingFeatures filterChild={FilterEl} />
        </div>
    );

};


const ScrollerSection = ({entries, entryGroup} : {entries: GroupedPeople, entryGroup: string}) => {
    return (
        <Section>
            <div className='heading container'>
                {/* Hide if states */}
                {/* {!state.id  && (
                    <span
                        className={
                            "icon fi fis fi-" +
                            countries.find((c) => c.name === entryGroup)?.alpha.toLowerCase()
                        }
                    ></span>
                )} */}
                <div className='header-main'>
                    <h2>{entryGroup}</h2>
                    {entries[entryGroup] && <div className='bold'>{entries[entryGroup].length} Loved Ones</div>}
                </div>
            </div>
            <NameSection>
                {entries[entryGroup].map((entry) => (
                    <p className='name-entry' key={entry.id} data-id={entry.id}>
                        {entry.firstName} {entry.lastName}, {entry.foreverAge}
                    </p>
                ))}
            </NameSection>
        </Section>
    );
}