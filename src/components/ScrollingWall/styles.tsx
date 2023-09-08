import { styled } from "styled-components";

export const Section = styled.section`
    margin: 4rem 0 0;
    position: relative;

    @media screen and (min-width: 768px) {
        padding: 2rem;
    }

    &:first-of-type {
        margin: 0;
    }

    @media screen and (min-width: 768px) {
        &:first-of-type {
            margin-top: -90px;
            padding-top: 0;
        }
    }

    .heading {
        pointer-events: none;
        background-color: #ffffff;
        color: #000000;

        position: sticky;
        top: 0;

        display: flex;
        align-items: center;
        gap: 1rem;
        padding-block: 1rem;
    }

    @media screen and (min-width: 768px) {
        .heading {
            top: 2rem;
            z-index: 500;

            background-color: transparent;
            color: #ffffff;
            mix-blend-mode: difference;
        }
    }

    h2 {
        margin: 0;
    }

    /* .icon {
        height: 32px;
        width: 32px;
        border: 1px solid #000000;
        border-radius: 3rem;
    } */

    @media screen and (min-width: 768px) {
        .header-main {
            padding-inline: 1rem;
        }
    }
`;

export const NameSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: repeat(auto-fit, 50px);
    gap: 0 0.5rem;
    align-items: center;
    width: 100%;
    padding: 1rem 1.5rem 0;

    min-height: 75dvh;


    p {
        font-family: "Optima", sans-serif;
        margin: 0;
        font-size: 1.5em;
        padding-block: 0.5em;
        line-height: 1.1;
        font-weight: 700;
        text-shadow: 0 0 0.1em #ffffff;
        /* text-transform: capitalize; */
        /* text-align: center; */

        &.active {
            text-decoration: underline;
            font-size: 2em;
        }
    }

    @media screen and (min-width: 768px) {
        border-top: 1px solid #ffffff;
        min-height: 77dvh;

    }
`;