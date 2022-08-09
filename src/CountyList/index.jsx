import { useState } from "react";
import { arrCounties } from "../data/counties"
import { states } from "../data/states"

import './index.scss';



const CountyDropdown = ({state}) => {
    console.log(state);
    const activeCounties = arrCounties.filter(county => county.state === state);


    return activeCounties.map(county => <li className="list-item" key={county.name}>{county.name}</li>)
}

const CountyList = () => {
    const [activeState, setActiveState] = useState(false);



    return (
        <div className="county-list">
            <h1>Memorial Wall County List</h1>
            {states.usa.map(state =>
            <div className="county-dropdown">
                <div  style={{display: 'flex'}} onClick={() => {setActiveState(activeState === state ? false : state)} } key={state}>
                    <svg style={{transform: activeState === state ? "" : 'rotate(-90deg)'}} className="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                    <h3>{state.name}</h3>
                </div>
                {activeState === state && <ul class="county-list"><CountyDropdown state={state.id}/></ul>}
            </div>
            )}
        </div>
    )
}


export default CountyList