import { useState } from "react";
import { useNavigate } from "react-router-dom";


const allStates = [
    'Select State',
    'Country Wide',
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


const StateFilter = ({closeModal}) => {
    // const [state, setState] = stateState;
    const navigate = useNavigate();
    const [state, setState] = useState(allStates[0]);
    const [selectOpen, toggleSelect] = useState(false);

    const toggleSelectOpen = () =>{
        toggleSelect(!selectOpen);
    }

    const goToStatePage = () => {
        closeModal();
        if (state === allStates[0]) {
            return;
        } else if (state === allStates[1]) {
            navigate('/');
        } else {
            navigate(`/${state.toLowerCase()}`)

        }
    };

    return (
        <div>
            <label  onClick={toggleSelectOpen} htmlFor="state-selector">
            Find by state:&nbsp;
            </label>
            <div onClick={toggleSelectOpen} className="selector" name="state-selector" style={{}}>

                {
                    selectOpen ?
                    allStates.map(s =>
                        <p onClick={() => setState(s)} className={s === state ? 'selected' : ''} key={s} value={s}>{s}</p>
                    )
                    :
                    <div>{state}</div>
                }
            </div>
            <div className="btn" style={{marginLeft: 'auto'}} onClick={goToStatePage} >Search</div>
        </div>
    )
}

export default StateFilter;