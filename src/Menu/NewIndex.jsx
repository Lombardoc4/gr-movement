import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { countries } from '../data/countries';
import { states } from '../data/states';
import Dropdown from "../Dropdown/NewIndex";
import FloatingMenu from "../FloatingMenu";
import useAnalyticsEventTracker from "../customHooks/useAnalyticsEvent";

const countriesWithStates = ['United States', 'Canada'];

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

const NewIndex = ({people, country, state}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!country) {
            navigate('/');
            return;
        }
    }, [])

    const defaultDropdownAction = (key, value) => {
        if (key === 'country') navigate(`/${value.toLowerCase()}`);

        if (key === 'state') navigate(`/${country.id.toLowerCase()}/${value.toLowerCase()}`);
    }

    return (<>
        <div className={(open ? 'open' : '') + ' menu'}>
            <StaticMenu>

                <Dropdown
                    title="Find a loved one:"
                    value='Name'
                    options={people}
                    keySet='person'
                    />

                <Dropdown
                  title={"Select a country:"}
                  value={country.name}
                  options={countries}
                  action={value => defaultDropdownAction('country', value)}
                  />

                {countriesWithStates.includes(country.name) &&
                    <Dropdown
                      title={"Select a state:"}
                      value={state.name || 'Nationwide'}
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

export default NewIndex;