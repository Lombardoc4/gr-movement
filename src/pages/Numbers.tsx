import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { styled } from "styled-components";

import { states } from '../utils/data/states';
import { Ambassador } from '../utils/models';
import { Person } from '../utils/models';
import { Accordian } from '../components/Accordian';
import { groupData } from '../utils/lib/nameParsers';


const StyledNumbers = styled.main`
    max-width: 1200px;
    margin: auto;
    padding: 1rem;
    
    h1, h2, h3 {
        font-family: 'athelas','GFS Neohellenic', sans-serif;
    }

    h1{ font-size: 3rem; }

    h2{ font-size: 2.5rem; }

    h3{ font-size: 2rem; }

    .totals{ margin-bottom: 1rem; }

    .button-slide{
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


    .active-overlay{
        position: absolute;
        pointer-events: none;
        top: 0;
        height: 100%;
        width: 50%;
        background-color: rgba(237,207,57,0.2);
        mix-blend-mode: exclusion;
        box-shadow: inset 0 0 8px -6px;
        transition: transform 0.3s;
    }

`;


const ByTheNumbers = () => {
    const [worldwide, setWorldwide] = useState<{[key: string]: Ambassador[] | Person[]}>({});
    const [unitedStates, setUnitedStates] = useState<{[key: string]: Ambassador[] | Person[]}>({});
    const [canada, setCanada] = useState<{[key: string]: Ambassador[] | Person[]}>({});
    const [ambassadors, setAmbassadors] = useState<{[key: string]: Ambassador[] | Person[]}>({});
    const [subPage, setSubPage] = useState('main')

    useEffect(() => {
        // Get All Ambassador Data
        const ambassadorSub = DataStore.observeQuery(
        Ambassador
        ).subscribe(snapshot => {
            const { items } = snapshot;
            
            const groupByKey: {[key: string]: Ambassador[]} = items.reduce((acc: {[key: string]: Ambassador[]} , cur : Ambassador) => {
    
                const { state } = cur;
        
                const key = state || '~Unknown';
        
        
                if (!acc[key]) {
                    acc[key] = []
                }
        
                acc[key].push(cur);
        
                return acc;
        
            }, {})
        
        
            // Sort States alphabetically
            // TODO just use states data since it's already in order
            const sortedStateAmbassadors = Object.keys(groupByKey).sort().reduce( (obj: {[key: string]: Ambassador[]} , key: string) => {
                obj[key] = groupByKey[key];
                return obj;
            }, {} as {[key: string]: Ambassador[]});

            setAmbassadors(sortedStateAmbassadors);
        })

        // Get All Data
        const subscription = DataStore.observeQuery(
        Person
        ).subscribe(snapshot => {
            const { items } = snapshot;

            // group by Country
            const groupByCountry = groupData(items, 'country');
            
            // Sort Countries Alphabetically
            const sortedCountry = Object.keys(groupByCountry)
                // Set US Before Canada
                .sort((first, second) => {
                    // Make sure USA if first followed by Canada
                    if (first === 'Canada' && second === 'United States') {
                        return 1
                    }
                    else if (first === 'United States' || first === 'Canada') {
                        return -1
                    }
                    else return 0;
                })
                // Map to new key order to object
                .reduce((obj, key) => {
                    obj[key] = groupByCountry[key];
                    return obj;
                }, {} as {[key: string]: Person[]});

            setWorldwide(sortedCountry);


            // Sort USA & Canada States
            Object.entries(states).map(([country, data]) => {

                const groupByState = groupData(sortedCountry[country], 'state');

                // Add States that don't have data
                data.map(({name}) => {
                    groupByState[name] = groupByState[name]  ? [...groupByState[name]] : [];
                })

                // Sort states by name
                const sortedStatesPeople = Object.keys(groupByState).sort().reduce(
                    (obj, key) => {
                        obj[key] = groupByState[key];
                        return obj;
                    }, {} as {[key: string]: Person[]}
                );

                if (country === 'United States'){
                    setUnitedStates(sortedStatesPeople)
                }

                if (country === 'Canada') {
                    setCanada(sortedStatesPeople)
                }
            });

        });

        // Clean up function
        return () => {
            // unsubscribe from observer
            subscription.unsubscribe();
            ambassadorSub.unsubscribe();
        }

    }, []);


    return (
        <StyledNumbers>
            <h1>Drug Epidemic Memorial</h1>
            <h2  className='h-gradient'>By The Numbers - {subPage === 'main' ? 'Our Loved Ones' : 'Our Ambassadors'}</h2>

            <div className='button-slide'>

                <button className='btn' onClick={() => setSubPage('main')}>Loved Ones</button>
                <button className='btn' onClick={() => setSubPage('ambassadors')}>Ambassadors</button>
                <div className="active-overlay" style={{transform: `translateX(${subPage === 'ambassadors' ? '100%': '0%'})`}}></div>
            </div>
            { subPage === 'ambassadors' &&
                <Accordian title="ambassadors united-states" data={ambassadors}/>
            }
            { subPage === 'main' && <>
                <Accordian title="worldwide" data={worldwide}/>
                <Accordian title="united-states" data={unitedStates}/>
                <Accordian title="canada" data={canada}/>
            </>}
        </StyledNumbers>
    )
}

export default ByTheNumbers
