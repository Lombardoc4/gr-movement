import { useLoaderData, useParams } from "react-router-dom";
import { useNames } from "../utils/hooks/useNames";
import { useEffect, useState } from "react";
import { Person } from "../utils/models";
import styled from "styled-components";
import { countries } from "../utils/data/countries";
import { ErrorElement } from "./ErrorPage";
import { Filters } from "../components/Filters";


const Section = styled.section`
    padding: 2em;
    line-height: 24px;
    position: relative;


    background-color: #000000;
    color: #f1f1f1;

    .heading {
        /* height: 75px; */
        position: sticky;
        top: calc(75px + 4em);
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 0 1em;
        padding: 1.5em;
        background-color: #ffffff;
        color: #000000;
        border-radius: 8px;
        border: 1px solid #000000;
    }

    h2 {
        font-size: 2em;
        line-height: 1;
        text-transform: uppercase;
    }

    @media screen and (max-width: 700px) {
        padding: 1em;

        .heading {
            flex-direction: column;
            align-items: flex-start;
        }

        h2 {
            font-size: 1.5em;
        }
    }


`;

const NameSection = styled.div`

    /* display: flex;
    justify-content: space-between;
    flex-wrap: wrap; */

    display: grid;
    grid-template-columns: repeat(auto-fit, max(250px));
    gap: 0 0.5em;
    align-items: center;
    width: 100%;

    padding: 1em 0;
    border-radius: 8px;



    p {
        font-family: 'Optima', sans-serif;
        margin: 0;
        padding: 0.25em 0.5em ;
        font-size: 24px;
        font-weight: 700;

        &.active {
            text-decoration: underline;
            font-size: 28px;
        }
    }
`;

interface NameWallProps {
    country?: string,
}

interface GroupedPeople {
    [key: string]: Person[]
}

const parseData = (items: Person[]) => {
    const sortedModels = items.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))

    // Use inverse of above to remove duplicates
    const filteredModels = sortedModels.filter((item, index) => {
        return !items.find((other, otherIndex) => item.firstName === other.firstName && item.lastName === other.lastName && index !== otherIndex && item.foreverAge === other.foreverAge && item.state === other.state)
    })



    return filteredModels;
}

const groupData = (items: Person[], filterBy: string) => {
    const groupByKey: GroupedPeople = items.reduce((acc: GroupedPeople , cur : Person) => {

        const { country, state } = cur;

        let key: string;

        if (!country) {
            return acc;
        }


        key = ((filterBy === 'state') ? state : country) || '~Unknown';


        if (!acc[key]) {
            acc[key] = []
        }

        acc[key].push(cur);

        return acc;

    }, {})


    if (filterBy === 'state') {
        // Sort States alphabetically
        // TODO just use states data since it's already in order
        return Object.keys(groupByKey).sort().reduce( (obj: GroupedPeople, key: string) => {
            obj[key] = groupByKey[key];
            return obj;
        }, {} );
    }

    return groupByKey;
}



const NameWall = ({country = "Worldwide"} :NameWallProps) => {
    const loadData = useLoaderData() as Person[];
    let { countryId, stateId } = useParams();
    // If no country look for countryId if no country default to Worldwide
    if (country === "Worldwide" && countryId) {
        country = countries.find(c => c.id.toLowerCase() === countryId)?.name || "Worldwide";
    }

    const people = useNames(country || "Worldwide", stateId) as Person[];
    const [models, setModels] = useState(parseData(loadData.length > 0 ? loadData : people))
    const [entries, setEntries] = useState(groupData(models, ["United States", "Canada"].includes(country)  ? 'state': 'country'))



    // Parse Data Everytime loadData updates from Router
    useEffect(() => {


        if (loadData.length <= 0) {
            // console.log('display error', people)
            return
        }

        const newModels = parseData(loadData);


        if (newModels.length !== models.length) {
            // Todo fixed this to stop render over and over again
            setModels(newModels);
            setEntries(groupData(newModels, ["United States", "Canada"].includes(country) ? 'state': 'country'));
        }
    }, [loadData])

    // Parse Data Everytime people updates from DataStore subscription
    useEffect(() => {
        const newModels = parseData(people);

        if (newModels.length > 0 &&  newModels.length !== models.length) {
            // Todo fixed this to stop render over and over again
            setModels(newModels);
            setEntries(groupData(newModels, ["United States", "Canada"].includes(country) ? 'state': 'country'));
        }
    }, [people])


    return (
        <div style={{position: 'relative'}}>

            <Filters country={country} stateId={stateId} models={models}/>


            { Object.keys(entries).length <= 0 && (
                <div style={{width: '300px', padding: '2em 0',  margin: 'auto', color: '#ffffff'}}>
                    <h2>No submissions</h2><br/>
                    <ErrorElement/>
                </div>
            )}

            { Object.keys(entries).map(entryGroup => {
                return (
                    <Section key={entryGroup} className="container">
                        <div className="heading">
                            <h2>{entryGroup}</h2>
                            {entryGroup && <p>{entries[entryGroup].length} Loved Ones Lost</p> }
                        </div>
                    <NameSection>
                        { entries[entryGroup].map(entry => (
                            <p className="name-entry" key={entry.id} data-name={entry.firstName + ' ' + entry.lastName}>{entry.firstName}{"\u00A0"}{entry.lastName}, {entry.foreverAge}</p>
                            ))}
                    </NameSection>
                    </Section>
                    )
                })}





        </div>
    )
}

export default NameWall;