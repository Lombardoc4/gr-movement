import styled from "styled-components";
import { Dropdown } from "../Dropdown"
// import MusicPlayer from "../MusicPlayer"
import { CountryStateSelectors } from "../StateCountryDropdown"
import { Person } from "../../utils/models";


const FilterSection = styled.div`
    position: sticky;
    z-index: 500;
    top: 2em;



    .main {
        /* margin: 2em 0 0; */
        background-color: #ffffff;
        display: flex;
        align-items: center;
        font-size: 18px;
        padding: 1em 1em 1em 300px;
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
        gap: 1em;
    }

    @media screen and (max-width: 1000px) {
        .main {
            flex-direction: column;

        }
    }

    @media screen and (max-width: 700px) {
        position: fixed;
        z-index: 1000;
        top: 100vh;
        left: 0;
        right: 0;
        height: 100vh;
        transform: translateY(-100vh);
        background-color: #edcf39;
        display: flex;
        flex-direction: column;
        gap: 1em;
        align-items: center;

        transition: transform 0.3s, height 0.3s;
        padding: 2em;

        .main {
            flex-direction: column;
        }
    }

`;



const selectPerson = (value: string) => {
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
    models: Person[]
}

export const Filters = ({country, stateId, models}: FilterProps) => {
    return (
        <>
        <FilterSection className="container">
                <div className="main">
                    <div className="search">

                    <Dropdown
                        placeholder="Find Your Loved One"
                        id="search"
                        value=""
                        initOptions={models.map((m: Person) => ({id: m.firstName + ' ' + m.lastName, value: m.firstName + ' ' + m.lastName}))}
                        action={(value) => {selectPerson(value)}}
                        />

                        </div>

                    <CountryStateSelectors country={country} state={stateId}/>

                    {/* <MusicPlayer playlistName="nameWall"/> */}
                </div>
            </FilterSection>
        </>
    )
}