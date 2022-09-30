
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../Dropdown';

import { countries } from '../data/countries';
import { states } from '../data/states';
// import { arrCounties } from '../data/counties';
import './index.css'
import FindPerson from '../FindPerson';
import useAnalyticsEventTracker from '../customHooks/useAnalyticsEvent';

export const StaticMenu = ({children}) => {
    const gaEventTracker = useAnalyticsEventTracker('Menu');
    return (
        <>
            <h2>Drug Epidemic Memorial Wall</h2>
            {children}
            <a onClick={() => gaEventTracker('click', 'form')} className="add-btn" tabIndex={0} style={{display: 'block', textDecoration: 'none', margin: '2rem 0'}} href="https://drugepidemicmemorial.org/">Add Your Loved One and Photo</a>
            <a onClick={() => gaEventTracker('click', 'photo-wall')} className="add-btn" tabIndex={0} style={{display: 'block', textDecoration: 'none', margin: '2rem 0'}} href="https://www.yumpu.com/en/document/read/66978910/memorial-photo-wall-swipe-to-view">Memorial Photo Wall</a>
            <a onClick={() => gaEventTracker('click', 'teen-photo-wall')} className="add-btn" tabIndex={0} style={{display: 'block', textDecoration: 'none', margin: '2rem 0'}} href="https://www.yumpu.com/xx/document/read/67142988/memorial-teen-photo-wall-swipe-to-view">Memorial Teen Photo Wall</a>
        </>
    )
}

const Menu = ({menuState, countryState = [], stateState = [], allPeople = []}) => {
    const [menuOpen, setMenu] = menuState;
    const [country, setCountry] = countryState;
    const [state, setState] = stateState;
    // const [county, setCounty] = countyState;
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    const gaEventTracker = useAnalyticsEventTracker('Menu');

    useEffect(() => {

        if (!['usa', 'can'].includes(country)) {
            setMenu(false);
        }

        navigate(`/${country.toLowerCase()}`)
    }, [country]);


    useEffect(() => {
        // Only show states for usa
        if (!['usa', 'can'].includes(country)) return;


        if (state === 'Nationwide') {
            navigate('/' + country);
        } else {
            navigate(`/${country}/${state.toLowerCase()}`)
        }
        setMenu(false);

    }, [state]);


    // useEffect(() => {
    //     // Only show states for usa
    //     if (!['usa'].includes(country)) return;


    //     if (county === 'Statewide') {
    //         navigate(`/${country}/${state}`);
    //     } else {
    //         navigate(`/${country}/${state}/${county}`)
    //     }
    //     setMenu(false);

    // }, [county]);


    const getCountryInfo = (country) => {
        if (country.length <= 3){
            const {name} = countries.find(c => c.id === country)
            return name;
        }
        return country
    }



    return (
        <div className={(menuOpen ? 'open' : '') + " menu"}>
            <StaticMenu>


                <FindPerson
                    allPeople={allPeople}
                    closeMenu={() => setMenu(false)}
                    openDropdownState={[openDropdown, setOpenDropdown]}
                />

                <Dropdown
                    id="country"
                    title='Select Your Country'
                    defaultValue={getCountryInfo(country)}
                    defaultOptions={countries}
                    selectAction={setCountry}
                    openDropdownState={[openDropdown, setOpenDropdown]}
                />

                { ['usa', 'can'].includes(country) &&
                    <Dropdown
                    id="state"
                    title={'Select Your State or Province'}
                    defaultValue={state}
                    defaultOptions={states[country]}
                    selectAction={setState}
                    openDropdownState={[openDropdown, setOpenDropdown]}
                    />
                }

                {/* <Link to="/photos"  className="add-btn" style={{margin: '2rem 0'}}>
                    <div onClick={() => gaEventTracker('click', 'photoshow')} >Photo Gallery</div>
                </Link> */}



            </StaticMenu>


        </div>
    )

}

export default Menu;