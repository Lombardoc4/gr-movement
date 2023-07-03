import { useNavigate } from "react-router";
import { countries } from "../../utils/data/countries";
import { states } from "../../utils/data/states";
import { Dropdown } from "../Dropdown";


export const CountryStateSelectors = ({country, state}: {country: string, state?: string}) => {
    const navigate = useNavigate();
    const countryOptions = countries.map(c => ({id: c.id, value: c.name}));
    const countryId = countries.find(c => c.name === country)?.id || '';

    const stateOptions = [...states["United States"].map(state =>  ({id: state.id, value: state.name})), ...states["Canada"].map(state => ({id: state.id, value: state.name}))];

    const stateName = stateOptions.find(s => s.id.toLowerCase() === state)?.value;


    const handleSelect = (value: string) => {
        const mainEl = document.querySelector('main');
        if (mainEl) {
            mainEl.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
        navigate('/' + value);
    }
    
    const stateSelect = (value: string) => {
        if (states["United States"].find(s => s.id === value)) {
            handleSelect(`usa/${value.toLowerCase()}`) }
        if (states["Canada"].find(s => s.id === value)) {
            handleSelect(`canada/${value.toLowerCase()}`) 
        }
    }    

    if (country.length > 0 && country !== 'Worldwide') {
        stateOptions.unshift({
            id: countryId,
            value: "Nationwide",
        })
    }

    return (
        <div className="selectors">
            <Dropdown
                placeholder={country !== 'Worldwide' ? country : "Select a Country"}
                id="country-selector"
                value={''}
                initOptions={countryOptions}
                action={value => handleSelect(value) }
                // Should these only be the countries with submissions
                />
            <Dropdown
                placeholder={stateName || "Select a State"}
                id="state-selector"
                value={''}
                initOptions={stateOptions}
                action={value => stateSelect(value) }

                // Should these only be the states with submissions
                />
        </div>
    )
}