import { useEffect, useState } from "react";
import useAnalyticsEventTracker from "../customHooks/useAnalyticsEvent";

const key = 'search';

const getFullName = (person) => {
    // No person or name
    if (!person || !person.firstName || !person.lastName) { return false;}

    return person.firstName + ' ' + person.lastName;
}

const FindPerson = ({allPeople,  openDropdownState, closeMenu}) => {

    const [searchPerson, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openDropdown, setOpenDropdown] = openDropdownState;
    const gaEventTracker = useAnalyticsEventTracker('Menu');

    // Bring Search Person Into View
    useEffect(() => {
        if (searchPerson) {


            // Clearn Previous Search
            const previousPerson = document.querySelector(`.person-info.found`);
            previousPerson && previousPerson.classList.remove('found')

            // Get First Person that matches search value
            const foundPerson = allPeople.find(person => {
                // Get full name and return false if none
                const fullName = getFullName(person);

                return fullName && fullName.startsWith(searchPerson);
            });

            // No Person - no further
            if (!foundPerson) { return;}

            // Find Element By Name then Display front and center
            const name = getFullName(foundPerson);
            const personEl = document.querySelector(`[name='${name}']`);

            personEl.classList.add('found');
            setTimeout(() => {

                personEl.scrollIntoView({behavior: "smooth", inline: "center"});

            }, 300)
        }
    }, [searchPerson])



    const handleChange = (e) => {
        const value = e.target.value;

        setSearch(value);

        if (value.length > 0) {
            // filter existing search or use all the people
            const searchArray = searchResults.length > 0 ? searchResults : allPeople;

            // Filter search results
            setSearchResults(searchArray.filter(person => {
                const fullName = getFullName(person);

                return fullName && fullName.startsWith(value);
            }));
        } else {
            setSearchResults([]);
        }
    }

    const handleClick = (name) => {
        // Reset Everything
        setSearch(name);
        setSearchResults([]);
        setOpenDropdown(null);
        closeMenu();
    }




    return (
        <div className="dropdown-container">
            <label onClick={() => setOpenDropdown(key)} htmlFor="personSearch">
                Find Your Loved One
            </label>
            <input
                type="text"
                name="personSearch"
                className="search-input"
                onFocus={() => {setOpenDropdown(key); gaEventTracker('click', 'find person')}}
                value={searchPerson}
                placeholder="Name"
                onChange={handleChange}/>

            {(openDropdown === key && searchPerson.length > 0) &&
                <div className="dropdown">
                    {/* Map Options */}
                    {/* Observe duplicates: replace searchResults w allPeople and remove index */}
                    {searchResults.map((person, index) => {
                        const name = getFullName(person);
                        return <div key={name + index} onClick={() => handleClick(name)} className="dropdown-option">{name}</div>
                    })}
                </div>
            }
        </div>
    )
}

export default FindPerson;