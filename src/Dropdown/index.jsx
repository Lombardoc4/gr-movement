import React, { useEffect, useState } from "react";
import './dropdown.css';

// getActiveOption =

const Dropdown = ({id, title, options, defaultValue, selectAction, openDropdownState}) => {
    const dropdownName = "dropdown" + title.slice(0,5)

    const [value, setValue] = useState(defaultValue === 'usa' ? 'United States' : defaultValue);
    const [openDropdown, setOpenDropdown] = openDropdownState;



    useEffect(() => {
        const selectedName = options.find(o => o.id === defaultValue.toUpperCase());
        selectedName && setValue(selectedName.name);
    }, [defaultValue])


    const toggleOptions = () => {
        // if opening send signal upstream
        openDropdown === id ? setOpenDropdown(null) : setOpenDropdown(id);
    }

    const handleSelect = (selectedValue) => {
        const selectedName = options.find(o => o.id === selectedValue);
        setValue(selectedName.name);
        setOpenDropdown(null);
        selectAction(selectedValue);
    }




    return (
        <>
        <label onClick={toggleOptions} htmlFor={dropdownName}>{title}</label>
        <div className="dropdown-container">
            <div class="input" onClick={toggleOptions}>{value}</div>

            {/* Options Containers */}
            {openDropdown === id &&
                <div className="dropdown">
                    {/* Map Options */}
                    {options.map(({name, id}) => {
                        if (name !== value) {
                            return <div key={id} onClick={() => handleSelect(id)} className="dropdown-option">{name}</div>
                        }
                    })}
                </div>
            }

        </div>
        </>
    )
}

export default Dropdown;