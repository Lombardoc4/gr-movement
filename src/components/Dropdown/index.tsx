import {  useEffect, useState } from "react"
import { styled } from "styled-components";
import { useOutsideClick } from "../../utils/hooks/useOutsideClick";

// const searchKeys = {
//     default: ['name'],
//     person: ['firstName', 'lastName']
// };

interface DropdownProps {
    placeholder: string,
    id: string
    value: string
    initOptions: {
        id: string,
        value: string,
    }[],
    action?: (value: string) => void,
    keySet?: string
}

interface StyledDropdownProps {
    $open: boolean
}

const StyledDropdown = styled.div<StyledDropdownProps>`
    position: relative;
    width: 100%;
    /* margin-bottom: 1rem; */

    input {
        font-size: 18px;
        font-weight: 700;
        width: 100%;
        /* margin-top: 0.25rem; */
        padding: 0.5em 1em;
        border: 1px solid #535353;
        outline: none;
        background-color: #ffffff;
        border-radius: ${({$open}) => $open ? '8px 8px 0 0' : '8px'};
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        overflow: scroll;
        max-height: 16rem;
        background-color: #ffffff;
        border: 1px solid #323232;
        border-top: none;
    }

    .dropdown-option {
        text-transform: capitalize;
        padding: 0.5em 1em;
        font-size: 18px;
        width: 100%;
        background-color: #ffffff;
        border-bottom: 1px solid #323232;

        color: #323232;
        cursor: pointer;
    }
`;


export const Dropdown = ({placeholder, id, value, initOptions, action }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(value);
    const [options, setOptions] = useState(initOptions);

    const DropdownRef = useOutsideClick(() => {
        setOpen(false);
    })

    // const handleFocus = () => {
    //     if (keySet === 'default') setOpen(true);
    //     if (keySet === 'person' && query.length > 0) setOpen(true);
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!open) { setOpen(true) }
        // if (keySet === 'person' && e.target.value.length === 0) setOpen(false);
        setQuery(e.target.value)
    }

    useEffect(() => {
        if (query) {
            // Set Options filtering values that include the query string
            setOptions(initOptions.filter(o => o.value.toLowerCase().includes(query.toLowerCase())))
        } else {
            setOptions(initOptions);
        }
    }, [query])

    const selectAction = (selected: {
        id: string,
        value: string,
    }) => {
        setOpen(false);
        action && action(selected.id);
        setQuery(selected.value);
    }

    return (
            <StyledDropdown ref={DropdownRef} $open={open}>
                <input
                  className="search-input"
                  placeholder={placeholder}
                  id={id}
                  value={query}
                  onChange={(e) => handleChange(e)}
                  onFocus={() => setOpen(true)}
                  type="text"
                  autoComplete="off"
                />
                {(open && options.length > 0) &&
                    <div className="dropdown">
                        { options.map((option) => {
                            return (
                                <div
                                    key={option.id}
                                    className="dropdown-option"
                                    onClick={() => selectAction(option)}>
                                        {option.value}
                                </div>
                            )
                        })}
                    </div>
                }
            </StyledDropdown>
    )
}
