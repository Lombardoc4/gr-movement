import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    #root{
        width: 100%;
        min-height: 100vh;
        background-color: #000000;
    }

    *, *::before, *::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding-left: 2em;
        padding-right: 2em;
    }
`;