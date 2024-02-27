import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import butterflyLogo from "../../assets/butterfly.png";
import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { StyledNavbar, Burger, Nav, NavContainer } from "./styled";


export const Navbar = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [navOpen, openNav] = useState(false);

    const toggleNav = () => {
        if (isMobile) {
            openNav(!navOpen);
            document.body.style.overflow = navOpen ? "auto" : "hidden";
        }
    };

    return (
        <>
            <header className='container'>
                <StyledNavbar>

                    <Link to='/'>
                        <img src={butterflyLogo} alt='Drug Epidemic Memorial' width={60} height={40} />
                    </Link>

                    <Burger open={navOpen} onClick={toggleNav}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 23 18'>
                            <line className='burger-outer' x1='1.5' y1='1.5' x2='21.5' y2='1.5' />
                            <line id='burger-middle' x1='1.5' y1='9' x2='21.5' y2='9' />
                            <line id='burger-middle2' x1='1.5' y1='9' x2='21.5' y2='9' />
                            <line className='burger-outer' x1='1.5' y1='16.5' x2='21.5' y2='16.5' />
                        </svg>
                    </Burger>

                    <Nav open={navOpen}>
                        <NavContainer>
                            <NavLink className="nav-link" to='/' onClick={toggleNav}>
                                Name Wall
                            </NavLink>
                            <NavLink className="nav-link" to='/photos' onClick={toggleNav}>
                                Photo Wall
                            </NavLink>
                            <NavLink className="nav-link" to='/map' onClick={toggleNav}>
                                Meetup Map
                            </NavLink>
                            <Link className="nav-link" to='https://drugepidemicmemorial.org/'>Add Your Loved One</Link>
                            <Link className="nav-link" to='https://drugepidemicmemorial.org/heroes'>Recognize a Hero</Link>
                        </NavContainer>
                    </Nav>
                </StyledNavbar>
            </header>
        </>
    );
};
