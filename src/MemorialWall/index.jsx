import React from "react";
import { states } from "../data/states";
import WallPerson from "../WallPerson";



const groupBy = (list, key) => {

    const grouped = list.reduce(function(returnValue, item) {
        const keyValue = item[key] || 'Other';

        // Add to existing keyValue or start empty array
        (returnValue[keyValue] = returnValue[keyValue] || []).push(item);

        return returnValue;
    }, {});


    // Reduce before sorting to combine appreviation of states with fullname
    if (key === 'state' && Object.keys(grouped).length > 0) {
        const stateName = Object.keys(grouped)[0];

        //
        states[list[0].country].map(({name, id}) => {
            // Combine values of abbrevated state name with the full name
            if (grouped[name] && grouped[id]){
                grouped[name] = grouped[name].concat(grouped[id]);
            }

            delete grouped[id]
            return name;
        })

        grouped[stateName].sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))

    }



    return grouped;
};

export const WallSubHeader = ({title}) => {
    return (
        <div name={title} className='person-info state'>
            <h2 className='name'>
                {(title === "" || title === 'null') ? 'Other' : title} <span>:</span>
            </h2>
        </div>
    )
}

const MemorialWall = ({people, groupKey}) => {

    const groupedPeople = groupBy(people, groupKey);

    console.log(groupedPeople, groupKey);

    const groupTitles = Object.keys(groupedPeople).sort();

    return groupTitles.map((title) => (
                <React.Fragment key={title}>
                    {/* Header */}
                    <WallSubHeader title={title}/>

                    {/* People */}
                    {groupedPeople[title].map((person, index) => (
                        <WallPerson key={person.firstName + index} person={person}/>
                    ))}
                </React.Fragment>
            )
    )
}

export default MemorialWall