import { styled } from "styled-components";

interface StyledDropdownProps {
    $open: boolean;
}

export const StyledDropdown = styled.div<StyledDropdownProps>`
    position: relative;
    width: 100%;
    /* margin-bottom: 1rem; */

    input {
        font-size: 18px;
        font-weight: 700;
        width: 100%;
        /* margin-top: 0.25rem; */
        padding: 0.75em 1em;
        border: 1px solid #535353;
        outline: none;
        background-color: #ffffff;
        color: #000000;
        border-radius: ${({ $open }) => ($open ? "8px 8px 0 0" : "8px")};
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 1000;
        overflow: scroll;
        max-height: 16rem;
        background-color: #ffffff;
        border: 1px solid #323232;
        border-top: none;
        border-bottom: none;
        border-radius: 0 0 8px 8px;
    }

    .dropdown-option {
        text-transform: capitalize;
        padding: 0.75em 1em;
        font-size: 18px;
        width: 100%;
        background-color: #ffffff;
        border-bottom: 1px solid #323232;

        color: #323232;
        cursor: pointer;

        &.active {
            background-color: #dadada;
        }
    }
`;