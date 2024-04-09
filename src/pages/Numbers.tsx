import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { Accordian } from "../components/Accordian";
import { GroupedPeople, ambassadorGroupBy, groupBy } from "../utils/lib/helpers";
import { useNames } from "../utils/hooks/useNames";
import { onCreateAmbassador } from "../utils/graphql/subscriptions";
import { generateClient } from "aws-amplify/api";
import { listAmbassadors } from "../utils/graphql/queries";
import { LocationEffect } from "../utils/hooks/locationEffect";
import { Loader } from "../components/Loader";
import { LazyAmbassador } from "../utils/models";

const client = generateClient();

const StyledNumbers = styled.main`
    max-width: 1200px;
    margin: auto;
    padding: 1rem;

    h1,
    h2,
    h3 {
        font-family: "athelas", "GFS Neohellenic", sans-serif;
    }

    h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 2.5rem;
    }

    h3 {
        font-size: 2rem;
    }

    h3,
    p {
        margin: 0;
    }

    .totals {
        margin-bottom: 1rem;
    }

    .button-slide {
        margin: 1em 0;
        position: relative;
        display: flex;
        width: 100%;
        max-width: 300px;
        border-radius: 0.5em;
        overflow: hidden;
    }

    .btn {
        width: 50%;
        font-weight: 700;
        padding: 1em 1.5em;
        border-radius: 0;
        border: none;
        outline: none;
        // box-shadow: 0 0 16px -8px;
    }

    .active-overlay {
        position: absolute;
        pointer-events: none;
        top: 0;
        height: 100%;
        width: 50%;
        background-color: rgba(237, 207, 57, 0.2);
        mix-blend-mode: exclusion;
        box-shadow: inset 0 0 8px -6px;
        transition: transform 0.3s;
    }
`;

const ByTheNumbers = () => {
    const [ambassadors, setAmbassadors] = useState<{ [key: string]: LazyAmbassador[] }>({});
    const [subPage, setSubPage] = useState("main");

    LocationEffect();
    const people = useNames();
    const unitedStates = useMemo(
        () =>
            (people["United States"] &&
                people["United States"].length > 0 &&
                groupBy(people["United States"], "state")) ||
            [],
        [people]
    );
    const canada = useMemo(
        () => (people["Canada"] && people["Canada"].length > 0 && groupBy(people["Canada"], "state")) || [],
        [people]
    );

    useEffect(() => {
        // Get All Ambassador Data
        client.graphql({ query: listAmbassadors, variables: { limit: 250 } }).then(({ data }) => {
            const { items } = data.listAmbassadors;
            const groupedAmbassadors = ambassadorGroupBy(items);

            setAmbassadors(groupedAmbassadors);
        });

        // Subcscribe to updates as well
        const ambassadorSub = client.graphql({ query: onCreateAmbassador }).subscribe({
            next: ({ data }) => {
                const state = data.onCreateAmbassador.state;

                setAmbassadors((prev) => {
                    if (prev[state]) {
                        return {
                            ...prev,
                            [state]: [...prev[state], data.onCreateAmbassador],
                        };
                    } else return {};
                });
            },
            error: (error) => error,
        });
        return () => {
            // unsubscribe from observer
            ambassadorSub.unsubscribe();
        };
    }, []);


    // console.log('people')
    if (Object.keys(people).length <= 0) {
        return (
            <ByTheNumbersLayout>
                <Loader />
            </ByTheNumbersLayout>
        );
    }

    return (
        <ByTheNumbersLayout>
            <h2 className='h-gradient'>{subPage === "main" ? "Our Loved Ones" : "Our Ambassadors"}</h2>
            <div className='button-slide'>
                <button className='btn' onClick={() => setSubPage("main")}>
                    Loved Ones
                </button>
                <button className='btn' onClick={() => setSubPage("ambassadors")}>
                    Ambassadors
                </button>
                <div
                    className='active-overlay'
                    style={{ transform: `translateX(${subPage === "ambassadors" ? "100%" : "0%"})` }}
                ></div>
            </div>

            { subPage === 'ambassadors' &&
                <Accordian title="US ambassadors" data={ambassadors}/>
            }
            {subPage === "main" && (
                <>
                    <Accordian title='Worldwide' data={people} />
                    <Accordian title='united states' data={unitedStates as GroupedPeople} />
                    <Accordian title='canada' data={canada as GroupedPeople} />
                </>
            )}
        </ByTheNumbersLayout>
    );
};

export default ByTheNumbers;

const ByTheNumbersLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledNumbers>
            <h1 className='h-gradient'>By The Numbers</h1>
            {children}
        </StyledNumbers>
    );
};
