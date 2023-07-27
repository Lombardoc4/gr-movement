import { Link, NavLink } from "react-router-dom"
import {  styled } from "styled-components"
import { useState } from "react";
import butterflyLogo from "../../assets/butterfly.png"
import useMediaQuery from "../../utils/hooks/useMediaQuery";


const StyledHeader = styled.div`
    padding-top: 1em 0;
    /* position: sticky; */
    top: 0;
    left: 0;
    right: 0;
    /* background-color: #ffffff; */
    z-index: 1000;
    position: relative;
    padding: 0.5em 0;

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 75px;
    }


    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5em;
        width: 100%;

    }


    @media screen and (max-width: 700px) {
        .container {
            padding: 1em 2em;
        }
    }

`;

interface MenuState {
    open: boolean
}

const Burger = styled.div<MenuState>`
    display: none;
    padding: 0.5em 0.25em;

    line{
        fill:none;
        stroke:#edcf39;
        stroke-linecap:round;
        stroke-miterlimit:10;
        stroke-width:3px;
        transform-origin: center;
        transition: transform 0.2s, opacity 0.2s;
    }

    .burger-outer {
        opacity: ${({open}) => open ? 0 : 1};

        &:nth-child(1) { transform: translateY(${({open}) => open ? '10px' : 0})}
        &:nth-child(2) { transform: translateY(${({open}) => open ? '-10px' : 0})}
    }
    #burger-middle {
        transform: rotate(${({open}) => open ? "45deg" : "0"});
    }
    #burger-middle2 {
        transform: rotate(${({open}) => open ? "-45deg" : "0"});
    }

    @media screen and (max-width: 700px) {
        display: flex;
    }
`

const FullNav = styled.div<MenuState>`
    color: #000000;
    position: fixed;
    z-index: 1000;
    top: 100vh;
    left: 0;
    right: 0;
    height: ${({open}) => open ? 'calc(100vh - 75px)' : '0'};
    transform: translateY(${({open}) => open ? 'calc(-100vh + 75px)' : '0'});
    background-color: #edcf39;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    transition: transform 0.3s, height 0.3s;
    padding: 2em;


    button {
        height: 100%;
        width: 100%;
        font-size: 1.2em;
    }

    a, .a {
        width: 100%;
        height: 20%;
    }

    @media screen and (min-width: 768px) {
        position: static;
        flex-direction: row;
        background-color: transparent;
        padding: 0;
        height: 100%;
    }
    @media screen and (min-width: 768px) {

        a, .a {
            margin-left: 0.5em;
            margin-right: 0.5em;
            height: 100%;
            width: auto;
        }
    }
    @media screen and (min-width: 768px) {
        h2 {
            display: none;
        }
    }

`;

export const HeroNav = () => {
    const [navOpen, openNav] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)')


    const toggleNav = () => {
        if (isMobile) {
            openNav(!navOpen);
            document.body.style.overflow = navOpen ? 'auto' : 'hidden';
        }
    }

    return (
        <>
        <StyledHeader>
            <div className="container">
                <nav>
                    <Link to="https://wall.drugepidemicmemorial.org/" relative="path">
                        <img src={butterflyLogo} alt="Drug Epidemic Memorial" width={60} height={40}/>
                    </Link>
                    <Burger open={navOpen} onClick={toggleNav}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="27" viewBox="0 0 23 18">
                            <line className="burger-outer" x1="1.5" y1="1.5" x2="21.5" y2="1.5"/>
                            <line id="burger-middle" x1="1.5" y1="9" x2="21.5" y2="9"/>
                            <line id="burger-middle2" x1="1.5" y1="9" x2="21.5" y2="9"/>
                            <line className="burger-outer" x1="1.5" y1="16.5" x2="21.5" y2="16.5"/>
                        </svg>
                    </Burger>
                    <FullNav open={navOpen}>
                        <h2>Drug Epidemic Memorial</h2>

                        <NavLink to="https://wall.drugepidemicmemorial.org/">
                            <button>
                                Name Wall
                            </button>
                        </NavLink>
                        <NavLink to="https://wall.drugepidemicmemorial.org/photos">
                            <button>
                                Photo Wall
                            </button>
                        </NavLink>
                        <Link to="https://drugepidemicmemorial.org/heroes">
                            <button>
                                Recognize Your Hero
                            </button>
                        </Link>

                        {/* <button className="a">
                            Help
                        </button> */}
                    </FullNav>
                </nav>
            </div>
        </StyledHeader>
        </>

    )
}

export const Nav = () => {
    const [navOpen, openNav] = useState(false);
    // const stateOptions = [...states["United States"].map(state => state.name), ...states["Canada"].map(state => state.name)];
    const isMobile = useMediaQuery('(max-width: 768px)')

    // const country = '';

    // if (country.length > 0) {
    //     stateOptions.unshift("Nationwide")
    // }

    const toggleNav = () => {
        if (isMobile) {
            openNav(!navOpen);
            document.body.style.overflow = navOpen ? 'auto' : 'hidden';
        }
    }

    return (
        <>
        <StyledHeader>
            <div className="container">
                <nav>
                    <Link to="/">
                        <img src={butterflyLogo} alt="Drug Epidemic Memorial" width={60} height={40}/>
                    </Link>
                    <Burger open={navOpen} onClick={toggleNav}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="27" viewBox="0 0 23 18">
                            <line className="burger-outer" x1="1.5" y1="1.5" x2="21.5" y2="1.5"/>
                            <line id="burger-middle" x1="1.5" y1="9" x2="21.5" y2="9"/>
                            <line id="burger-middle2" x1="1.5" y1="9" x2="21.5" y2="9"/>
                            <line className="burger-outer" x1="1.5" y1="16.5" x2="21.5" y2="16.5"/>
                        </svg>
                    </Burger>
                    <FullNav open={navOpen}>
                        <h2>Drug Epidemic Memorial</h2>

                        <NavLink to="/" onClick={toggleNav}>
                            <button>
                                Name Wall
                            </button>
                        </NavLink>
                        <NavLink to="/photos" onClick={toggleNav} >
                            <button>
                                Photo Wall
                            </button>
                        </NavLink>
                        <Link to="https://drugepidemicmemorial.org/">
                            <button>
                                Include Your Loved One
                            </button>
                        </Link>
                        {/* <button className="a">
                            Help
                        </button> */}
                    </FullNav>
                </nav>
            </div>
        </StyledHeader>
        </>

    )
}