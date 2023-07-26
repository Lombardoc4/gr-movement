import styled from "styled-components";
import { ErrorElement } from "../../pages/ErrorPage";
import { GroupedPeople } from "../../pages/NameWall";


const Section = styled.section`
    padding: 1em;
    line-height: 24px;
    position: relative;


    background-color: #000000;
    color: #f1f1f1;

    .heading {
        position: sticky;
        padding: 0;
        pointer-events: none;
        background-color: #ffffff;
        color: #000000;
        border-radius: 0.5em;
        top: 1em;

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

    @media screen and (min-width: 768px) {
        padding: 2em;
    }


    @media screen and (min-width: 768px) {
        .heading {
            top: 2.3em;
            z-index: 500;

            background-color: transparent;
            color: #ffffff;
            padding: 1em;
            mix-blend-mode: difference;

        }
    }


`;

const NameSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 0 0.5em;
    align-items: center;
    width: 100%;
    padding: 1em 0 5em;



    p {
        font-family: 'Optima', sans-serif;
        margin: 0;
        font-size: 1.5em;
        padding: 0.5em 0.25em;
        line-height: 1.1;
        font-weight: 700;
        text-shadow: 0 0 0.1em #ffffff;
        text-transform: capitalize;
        text-align: center;

        &.active {
            text-decoration: underline;
            font-size: 2em;

        }
    }

    @media screen and (min-width: 768px) {
        border-top: 1px solid #ffffff;
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
                    <Section key={entryGroup}>
                        <div className="heading container">

                            <div className="container">
                                <h2>{entryGroup}</h2>
                                {entryGroup && <p>{entries[entryGroup].length} Loved Ones Lost</p> }
                            </div>
                        </div>
                        <NameSection>
                            { entries[entryGroup].map(entry => (
                                <p
                                className="name-entry"
                                key={entry.id}
                                data-name={entry.firstName + ' ' + entry.lastName}>
                                    {entry.firstName.toLowerCase()} {entry.lastName.toLowerCase()}, {entry.foreverAge}
                                </p>
                                ))}
                        </NameSection>

                    </Section>
                    )
                })}

        </>
    )
}