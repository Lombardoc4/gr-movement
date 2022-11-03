import {  useState } from "react"
import DropdownList from "./List";

const searchKeys = {
    default: ['name'],
    person: ['firstName', 'lastName']
};


export default function Dropdown({title, value, options, action, keySet = 'default' }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');


    const handleFocus = () => {
        if (keySet === 'default') setOpen(true);

        if (keySet === 'person' && query.length > 0) setOpen(true);
    }

    const handleChange = (e) => {
        if (!open) setOpen(true);

        if (keySet === 'person' && e.target.value.length === 0) setOpen(false);

        setQuery(e.target.value)
    }

    const search = (query) => {
        return options.filter((option) => {
            const optionValue = keySet !== 'person' ? option['name'] : option['firstName'] + ' ' + option['lastName'];

            return optionValue.toLowerCase().includes(query.toLowerCase());
        })
    }

    const selectAction = (value) => {
        setOpen(false);
        action(value);
        setQuery('');
    }

    return (
        <>
            <label htmlFor={value}>{title}</label>

            <div className="dropdown-container" >
                <input
                  className="search-input"
                  placeholder={value}
                  id={value}
                  value={query}
                  onChange={(e) => handleChange(e)}
                  onFocus={() => handleFocus()}
                  type="text"
                />
                {open && <div className="dropdown">
                    <DropdownList data={search(query)} action={(val) => selectAction(val)}/>
                </div>}
            </div>
        </>
    )
}
