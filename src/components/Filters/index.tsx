import styled from "styled-components";
import { Dropdown } from "../Dropdown"
// import MusicPlayer from "../MusicPlayer"
// import { CountryStateSelectors } from "../StateCountryDropdown"
// import { useContext } from "react";
// import LocationContext from "../../utils/hooks/LocationContext";


const FilterSection = styled.div`
    color: #000000;

    @media screen and (min-width: 768px) {
        display: block;
        position: sticky;
        top: 2rem;
        z-index: 500;
    }

    .filter-container {
        flex-direction: column;
        width: 100%;
        padding: 1em;
        /* margin: 2em 0 0; */
        background-color: #ffffff;
        display: flex;
        font-size: 18px;
        border-radius: 8px;
        gap: 1em;
        min-height: 5em;

    }

    @media only screen and (min-width: 768px) {
        .filter-container {
            flex-direction: row;
            padding: 1em 1em 1em 350px;
            align-items: center;
        }
    }

        /* .search {
        flex: 1;
        width: 100%;
    } */

        /* .selectors {
        flex: 1;
        width: 100%;

        display: flex;
        flex-direction: column;

        gap: 1em;
    } */
    /* @media only screen and (min-width: 768px) {

        .selectors {
            flex-direction: row;
        }
    } */

`;

const scrollToPerson = (value: string) => {
    // Remove previously active element
    document.querySelector('.name-entry.active')?.classList.remove('active');

    const el = document.querySelector(`[data-id='${value}']`)
    if (el) {
        el.classList.add('active');
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }
}

interface FilterProps {
    models: { id: string, value: string}[],
    searchAction?: () => void
}

export const Filters = ({models, searchAction}: FilterProps) => {
    // const {country, state} = useContext(LocationContext);

    return (
        <>
            <FilterSection className='lg-container'>
                <div className='filter-container'>
                    <Dropdown
                        placeholder='Find Your Loved One'
                        id='search'
                        value=''
                        initOptions={models}
                        action={(value) => {
                            searchAction && searchAction();
                            scrollToPerson(value);
                        }}
                    />

                    {/* <CountryStateSelectors country={country.name} state={state.id}/> */}
                </div>
            </FilterSection>
        </>
    );
}