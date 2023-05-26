import { Link, NavLink } from "react-router-dom"
import {  styled } from "styled-components"
import { states } from "../../utils/data/states";
import { useRef } from "react";


const StyledHeader = styled.header`
    padding-top: 1em 0;
    /* position: sticky; */
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    z-index: 1000;


    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 75px;
    }


    nav {
        display: flex;
        gap: 0.5em;

        a {
            padding: 0 0.5em;
        }
    }

`;

export const Nav = () => {
    const headerRef = useRef<HTMLHeadElement>(null)
    const stateOptions = [...states["United States"].map(state => state.name), ...states["Canada"].map(state => state.name)];

    const country = '';

    if (country.length > 0) {
        stateOptions.unshift("Nationwide")
    }

    return (
        <>
        <StyledHeader ref={headerRef}>
            <div className="container">
                <nav>
                <Link to="/">
                    Butterfly Icon
                </Link>
                    <NavLink to="/">
                        Name Wall
                    </NavLink>
                    <NavLink to="/photos">
                        Photo Wall
                    </NavLink>
                </nav>
                <nav>
                    <Link to="https://drugepidemicmemorial.org/">
                        Include Your Loved One
                    </Link>
                    <Link to="https://drugepidemicmemorial.org/">
                        Contact Us
                    </Link>
                </nav>
            </div>
        </StyledHeader>
        </>

    )
}