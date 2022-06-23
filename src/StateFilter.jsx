import { useState } from "react";



const allStates = [
    'Select State',
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
]


const StateFilter = (stateState) => {
    // const [state, setState] = stateState;
    const [state, setState] = useState(allStates[0]);
    const [selectOpen, toggleSelect] = useState(false);

    const toggleSelectOpen = () =>{
        toggleSelect(!selectOpen);
    }

    return (
        <div>
            <label  onClick={toggleSelectOpen} htmlFor="state-selector">
            Find by state:&nbsp;
            </label>
            <div onClick={toggleSelectOpen} className="selector" name="state-selector" style={{maxHeight: '5rem', overflow: 'scroll', backgroundColor: '#ffffff', color: '#000000', borderRadius: '0.5rem', padding: '0.1rem 0'}}>

                {
                    selectOpen ?
                    allStates.map(s =>
                        <p onClick={() => setState(s)} className={s === state ? 'selected' : ''} key={s} value={s}>{s}</p>
                    )
                    :
                    <div>{state}</div>
                }
            </div>

        </div>
    )
}

export default StateFilter;