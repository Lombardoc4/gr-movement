import React, { useEffect, useState } from "react";
import './dropdown.css';

// getActiveOption =

const Dropdown = ({id, title, defaultOptions, defaultValue, selectAction, openDropdownState}) => {
    const dropdownName = "dropdown" + title.slice(0,5)

    const [value, setValue] = useState(defaultValue === 'usa' ? 'United States' : defaultValue);
    const [openDropdown, setOpenDropdown] = openDropdownState;
    const [options, setOptions] = useState(defaultOptions);



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
        selectAction(selectedValue.toLowerCase());
    }

    const handleChange = (e) => {
        console.log(e);
    }



    return (
        <>
            <label
                onClick={toggleOptions}
                htmlFor={dropdownName}
            >
                {title}
            </label>

            <div className="dropdown-container" onBlur={() => console.log('blurring')}>
                <input
                    onClick={() => setOpenDropdown(id)}
                    onBlur={() => setOpenDropdown(null)}
                    onChange={() => handleChange}
                    name={dropdownName}
                    defaultValue={value}
                    type="text"/>

                {/* Options Containers */}
                {openDropdown === id &&<div className="dropdown">
                    {options.map(({name, id}) => {
                        if (name !== value) {
                            return <div key={id} onClick={() => handleSelect(id)} className="dropdown-option">{name}</div>
                        }
                    })}
                </div>}

            </div>
        </>
    )
}

export default Dropdown;