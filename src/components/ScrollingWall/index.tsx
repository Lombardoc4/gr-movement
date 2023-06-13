import styled from "styled-components";
import { ErrorElement } from "../../pages/ErrorPage"
import { GroupedPeople } from "../../pages/NameWall";


const Section = styled.section`
    padding: 2em;
    line-height: 24px;
    position: relative;


    background-color: #000000;
    color: #f1f1f1;

    .heading {
        /* height: 75px; */
        position: sticky;
        z-index: 500;
        top: 2.3em;
        padding: 1em;
        color: #ffffff;
        mix-blend-mode: difference;
        pointer-events: none;

        p, h2 {
            max-width: 250px;
        }
    }

    h2 {
        font-size: 1.5em;
        line-height: 1;
        margin-bottom: 0.25em;
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 0 0.5em;
    align-items: center;
    width: 100%;
    border-top: 1px solid #ffffff;
    padding: 1em 0 5em;



    p {
        font-family: 'Optima', sans-serif;
        margin: 0;
        padding: 0.5em;
        font-size: 1.5em;
        font-weight: 700;
        text-transform: capitalize;

        &.active {
            text-decoration: underline;
            font-size: 24px;
        }
    }
`;

export const ScrollingWall = ({entries} : {entries: GroupedPeople}) => {
    return (
        <>
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
                                <p
                                className="name-entry"
                                key={entry.id}
                                data-name={entry.firstName + ' ' + entry.lastName}>
                                    {entry.firstName.toLowerCase()}{"\u00A0"}{entry.lastName.toLowerCase()}, {entry.foreverAge}
                                </p>
                                ))}
                        </NameSection>

                    </Section>
                    )
                })}

        </>
    )
}