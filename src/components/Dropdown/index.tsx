import { useEffect, useState } from "react";
import { useOutsideClick } from "../../utils/hooks/useOutsideClick";
import { StyledDropdown } from "./styles";

// const searchKeys = {
//     default: ['name'],
//     person: ['firstName', 'lastName']
// };

interface IOption {
    id: string;
    value: string;
    state?: string;
}

interface DropdownProps {
    placeholder: string;
    id: string;
    value: string;
    initOptions: IOption[];
    action?: (value: string) => void;
    keySet?: string;
}

interface IDropdownOptions {
    options: DropdownProps["initOptions"];
    selectAction: (selected: IOption) => void;
}

export const Dropdown = ({ placeholder, id, value, initOptions, action }: DropdownProps) => {
    const [options, setOptions] = useState(initOptions);
    const [query, setQuery] = useState(value);

    // Dropdown options open or not
    const [open, setOpen] = useState(false);

    // Used for keyboard scrolling index
    const [active, setActive] = useState(-1);

    // Close Dropdown if click outside
    const DropdownRef = useOutsideClick(() => {
        setOpen(false);
        setActive(-1)
    });

    // On input value change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!open) {
            setOpen(true);
        }
        setQuery(e.target.value);
    };

    // When a dropdown option is selected
    const selectAction = (selected: { id: string; value: string }) => {
        // Close modal and clear query
        setOpen(false);
        setQuery("");

        // Trigger action prop
        action && action(selected.id);
    };

    const keyScroll = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case "ArrowDown":
                active <= options.length && setActive(active + 1);
                break;
            case "ArrowUp":
                active >= 0 && setActive(active - 1);
                break;
            case "Enter":
                selectAction(options[active]);
                break;
            case "Escape":
                setActive(-1);
                setOpen(false);
                break;
            default:
                setOpen(true);
        }
    };

    // Remove active close on dropdown options and add to new value
    useEffect(() => {
        document.querySelector(".dropdown-option.active")?.classList.remove("active");
        if (active >= 0) {
            const activeEl = document.querySelectorAll(".dropdown-option")[active] as HTMLDivElement
            activeEl.classList.add("active");
            (document.querySelector('.dropdown') as HTMLDivElement).scrollTop = activeEl.offsetTop;
        }
    }, [active]);

    // If options or query change update options
    useEffect(() => {

        const options = query
            ? initOptions.filter((o) => o.value.toLowerCase().includes(query.toLowerCase()))
            : initOptions;

        setOptions(options);
    }, [initOptions, query]);

    return (
        <StyledDropdown ref={DropdownRef} $open={open}>
            <input
                className='search-input'
                placeholder={placeholder}
                id={id}
                value={query}
                onChange={(e) => handleChange(e)}
                onFocus={() => setOpen(true)}
                onKeyDown={keyScroll}
                type='text'
                autoComplete='off'
            />
            {open && options.length > 0 && <DropdownOptions options={options} selectAction={selectAction} />}
        </StyledDropdown>
    );
};

const DropdownOptions = ({ options, selectAction }: IDropdownOptions) => (
    <div className='dropdown'>
        {options.map((option) => {
            return (
                <div key={option.id} className='dropdown-option' onClick={() => selectAction(option)}>
                    {option.value.toLowerCase()}
                </div>
            );
        })}
    </div>
);
