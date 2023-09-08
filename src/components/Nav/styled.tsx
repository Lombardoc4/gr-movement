import { styled } from "styled-components";

interface MenuState {
    open: boolean;
}

export const StyledNavbar = styled.div`
    padding-block: 2em;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5em;
    width: 100%;
`;

export const Burger = styled.div<MenuState>`
    display: flex;
    padding: 0.75rem;
    background-color: #edcf39;
    border-radius: 0.5em;

    position: fixed;
    top: 1.25rem;
    right: 2rem;
    z-index: 100;

    line {
        fill: none;
        stroke: #000000;
        stroke-linecap: round;
        transform-origin: center;
        transition: transform 0.2s, opacity 0.2s;
    }

    .burger-outer {
        opacity: ${({ open }) => (open ? 0 : 1)};
        &:nth-child(1) {
            transform: translateY(${({ open }) => (open ? "10px" : 0)});
        }
        &:nth-child(2) {
            transform: translateY(${({ open }) => (open ? "-10px" : 0)});
        }
    }
    #burger-middle {
        transform: rotate(${({ open }) => (open ? "45deg" : "0")});
    }
    #burger-middle2 {
        transform: rotate(${({ open }) => (open ? "-45deg" : "0")});
    }

    @media screen and (min-width: 768px) {
        display: none;
    }
`;

export const Nav = styled.nav<MenuState>`
    background-color: #edcf39;
    background: linear-gradient(transparent, #edcf39 33%);

    position: fixed;
    z-index: 1000;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${({ open }) => (open ? "calc(100vh - 100px) " : "initial")};
    transform: translateY(${({ open }) => (open ? "0" : "calc(100vh - 100px)")});
    transition: transform 0.3s, height 0.3s;

    display: flex;

    @media screen and (min-width: 768px) {
        position: static;
        background: transparent;
        padding: 0;
        transform: none;
    }
`;

export const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 1rem 1rem 4rem;
    height: 50%;
    width: 100%;
    margin-top: auto;

    .nav-link {
        width: 100%;
        font-size: 1.5rem;
        text-transform: uppercase;
        padding: 1rem 0;
        color: #000000;
    }

    .nav-link:not(:first-child) {
        border-top: 1px solid #000;
    }

    .nav-link.active {
        color: #fff;
    }

    @media screen and (min-width: 768px) {
        flex-direction: row;
        color: #fff;
        padding: 0;
    }

    @media screen and (min-width: 768px) {
        .nav-link {
            color: #edcf39;
            margin-left: 0.5em;
            margin-right: 0.5em;
            height: 100%;
            width: auto;
            font-size: 1.25rem;
        }
    }
`;