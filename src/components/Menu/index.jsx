import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { countries } from '../../data/countries';
import { states } from '../../data/states';
import Dropdown from "../Dropdown";
import FloatingMenu from "./FloatingMenu";
import useAnalyticsEventTracker from "../../customHooks/useAnalyticsEvent";

import './index.css'

const countriesWithStates = ['United States', 'Canada'];

export const StaticMenu = ({children}) => {
    const gaEventTracker = useAnalyticsEventTracker('Menu');
    return (
        <>
            <h2 style={{textAlign: 'center'}}>Drug Epidemic Memorial Wall</h2>
            <div style={{marginTop: '2rem'}}>
                {children}
                <Link className="add-btn" to="/photos">US Photo Wall</Link>
                <Link className="add-btn" to="/photos/can">Canada Photo Wall</Link>
                <Link className="add-btn" to="/teen-photos/">Teen Photo Wall</Link>
                <a onClick={() => gaEventTracker('click', 'form')} className="add-btn" tabIndex={0} style={{textTransform: 'uppercase', textAlign: 'center', fontSize: '1.5rem'}} href="https://drugepidemicmemorial.org/">Add Your Loved One Now</a>
            </div>
        </>
    )
}

const revealPerson = (name) => {
    const personEl = document.querySelector(`[name='${name}']`);
    personEl.classList.add('found');
    setTimeout(() => {
        personEl.scrollIntoView({behavior: "smooth", inline: "center"});
    }, 300)
}

const Menu = ({people, country, state}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!country) {
            navigate('/');
            return;
        }
    }, [])



    const defaultDropdownAction = (key, value) => {
        // console.log([key, value])
        if (key === 'country') navigate(`/${value.toLowerCase()}`);

        if (key === 'state') navigate(`/${country.id.toLowerCase()}/${value.toLowerCase()}`);
    }

    // console.log('state', states[country.name]);

    return (<>
        <div className={(open ? 'open' : '') + ' menu'}>
            <StaticMenu>

                <Dropdown
                    title="Find a loved one:"
                    value='Name'
                    options={people}
                    keySet='person'
                    action={name => revealPerson(name)}
                    />

                <Dropdown
                  title={"Select a country:"}
                  value={country.name}
                  options={countries}
                  action={value => defaultDropdownAction('country', value)}
                  />

                {countriesWithStates.includes(country.name) &&
                    <Dropdown
                      title={`Select a ${country.name === 'Canada' ?  'province': 'state'}:`}
                      value={(state && state.name) || 'Nationwide'}
                      options={states[country.name]}
                      action={value => defaultDropdownAction('state', value)}
                    />
                }

            </StaticMenu>
        </div>
        <FloatingMenu>
            <div className="add-btn" tabIndex={0} onClick={() => setOpen(!open)}>
                Menu
            </div>
        </FloatingMenu>
    </>);
}

export default Menu;
