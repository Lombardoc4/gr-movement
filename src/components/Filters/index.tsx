import styled from "styled-components";
import { Dropdown } from "../Dropdown"
// import MusicPlayer from "../MusicPlayer"
import { CountryStateSelectors } from "../StateCountryDropdown"


const FilterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
    height: 100%;
    transition: transform 0.3s, height 0.3s;
    padding: 2em;
    color: #000000;

    .main {
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

    .search {
        flex: 1;
        width: 100%;
    }

    .selectors {
        flex: 1;
        width: 100%;

        display: flex;
        flex-direction: column;
        
        gap: 1em;
    }

    /* @media screen and (max-width: 1000px) {
        .main {
            flex-direction: column;

        }
    } */

    @media screen and (min-width: 768px) {
        display: block;
        position: sticky;
        top: 0;
        z-index: 500;
        /* position: fixed;
        z-index: 1000;
        top: 100vh;
        left: 0;
        right: 0;
        height: 100vh;
        transform: translateY(-100vh); */
        /* background-color: rgba(237, 207, 57, 0.2); */
        
        .main {
            flex-direction: row;
            padding: 1em 1em 1em 300px;
            align-items: center;
        }

        .selectors {
            flex-direction: row;
        }
        /* justify-content: center; */
        h3 {
            display: none;
        }
    }

`;



const scrollToPerson = (value: string) => {
    document.querySelector('.name-entry.active')?.classList.remove('active');
    const el = document.querySelector(`[data-name='${value}']`)

    if (el) {
        el.classList.add('active');
        el.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    }

}

interface FilterProps {
    country: string,
    stateId?: string,
    models: { id: string, value: string}[],
    searchAction?: () => void
}

export const Filters = ({country, stateId, models, searchAction}: FilterProps) => {
    return (
        <>
        <FilterSection className="container">
                <div className="main">
                    <h3>FILTERS</h3>
                    <div className="search">

                    <Dropdown
                        placeholder="Find Your Loved One"
                        id="search"
                        value=""
                        initOptions={models}
                        action={(value) => {searchAction && searchAction(); scrollToPerson(value);}}
                        />

                    </div>

                    <CountryStateSelectors country={country} state={stateId}/>

                    {/* <MusicPlayer playlistName="nameWall"/> */}
                </div>
            </FilterSection>
        </>
    )
}