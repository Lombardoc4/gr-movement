import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useActivePeople } from "../customHooks/useActivePeople";

import { countries } from '../data/countries';
import { states } from "../data/states";

import MemorialWall, { WallSubHeader } from "./MemorialWall";
import Menu, { StaticMenu } from "../components/Menu";

import '../App.css';

const countriesWithStates = ['United States', 'Canada'];

const getCountryInfo = (countryId) => {
    return countries.find(c => c.id === (countryId || ''))
}

const getStateInfo = (countryName, stateId) => {
    console.log('countryName', countryName)
    return states[countryName].find(c => c.id.toLowerCase() === (stateId))
}

const getGroupKey = (country) => {
    if (country.name === 'Worldwide') {
        return 'country';
    }
    if (countriesWithStates.includes(country.name)) {
        return 'state';
    }
    return null;
}


const ResizingWall = ({children, pathname}) => {
    const [appWidth, setAppWidth] = useState(0);
    const [resizeCount, incResizeCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const scrollWall = useRef(null);
    const addedDistance = window.innerWidth <= 440 ? 250 : 50;
    const resizeCountLimit = window.innerWidth <= 440 ? 10 : 6;


    // Manage width of window
    useEffect(() => {
        if (scrollWall.current?.lastChild) {

            const lastNode = scrollWall.current?.lastChild //as HTMLElement;
            const position = lastNode.getBoundingClientRect();
            setLoading(true);

            if (window.innerHeight - 100 < position.bottom){
                const resizeValue = appWidth + (addedDistance * resizeCount);

                document.getElementById('main-app').style.width = resizeValue + 'vw';
                setAppWidth(resizeValue);


                if (resizeCount <= resizeCountLimit)
                    incResizeCount(resizeCount + 1)


            } else {
                // setTimeout();
                setLoading(false)
                incResizeCount(1);
            }

        } else {
            // loop until last node exists
            setTimeout(() => setAppWidth(appWidth === 0 ? 100 : 0), 100);
        }
    })


    useEffect(() => {
        document.getElementById('main-app').style.width = '100vw'
        setAppWidth(0);
    }, [pathname, children])




    return (
        <>
            <div className={'preloader ' + (loading ? 'show' : '')}>
                <div className='loader'></div>
                <h1>Loading Names...</h1>
            </div>
            <div className="grid" ref={scrollWall} >
                {children}
            </div>
        </>
    )
}

const NameWall = () => {


    const {pathname} = useLocation();

    const [countryId, stateId] = pathname.split('/').filter(c => c !== '' && c !== 'v2');
    const country = getCountryInfo(countryId);

    const state = stateId && getStateInfo(country.name, stateId);

    const [people] = useActivePeople(country, state);

    if (people.length === 0 && !country && !state) {
        console.log('falsey')
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '390px',
                margin: 'auto',
                justifyContent: 'center'
            }}>
                <p style={{fontWeight: 700, textAlign: 'center'}}>This page does not exists</p>
                <StaticMenu>
                    <Link className="add-btn" to="/">Global Memorial Wall</Link>
                </StaticMenu>
            </div>
        )

    }

    const Wall = people.length > 0 ? (
        <ResizingWall pathname={pathname}>
            <MemorialWall
                people={people}
                groupKey={getGroupKey(country)}
                />
        </ResizingWall>
        )
        :
        <WallSubHeader title={country.name}/>

    return (
        <div id="main-app">
            {Wall}
            <Menu
                people={people.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))}
                country={country}
                countries={countries}
                state={state}
            />
        </div>
    )
}

export default NameWall;
