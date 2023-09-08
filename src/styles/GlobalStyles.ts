import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 400;

        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;

        --grid-width: calc(100% - var(--gutter)*2);
        --grid-columns: 4;
        --gutter: 16px;
    }

    *, *::before, *::after{
        box-sizing: border-box;
    }

    #root{
        width: 100%;
        min-height: 100vh;
        background-color: #000000;
    }

    #scroller {
        position: relative;
    }

    body {margin: 0;}

    h1, .h1 {
        font-size: 3.2em;
        line-height: 1;
    }

    .h2, h2 {
        font-size: 2rem;
        line-height: 1.1;
    }

    button, a, .a {
        cursor: revert;

        &:hover {
            color: #edcf39
        }
    }

    ul {
        padding: 0;
        list-style: none;
    }

    li {margin-block: 0.5rem;}

    .bold {
        font-weight: 700;
    }
    .m-0 {
        margin: 0;
    }

    .mt-0 {
        margin-top: 0;
    }

    .w-100 { width: 100%; }

    .fullRow { grid-column: 1 / -1}

    .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding-inline: 1.5rem;
    }

    .h-gradient {
        font-family: 'athelas','GFS Neohellenic', sans-serif;
        background: -webkit-linear-gradient( #ba7b2c, #edcf39);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
    }


    .photo-entry {
        transition: transform 0.2s ease-out, z-index 0s 0.2s ;
        z-index: 0;

        &.slideshow {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;

        }

        img {width: 100%}

        &.expand:not(.slideshow) {
            transform: scale(1.5);
            z-index: 100;
            transition: transform 0.2s ease-out, z-index 0s 0s;


            &.left {
                transform-origin: left;
            }
            &.right {
                transform-origin: right;
            }
        }
    }

    .list-container {
        width: clamp(50%, 100%, 80%);
        margin: auto;

        h1{
            font-size: 2.5rem;
            text-transform: uppercase;
            color: #edcf39;
        }
        h2{
            font-size: 8rem;
            background: -webkit-linear-gradient( #ba7b2c, #edcf39);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            margin-bottom: 2rem;
        }

        p{
            font-family: Arial, Helvetica, sans-serif;
            width: clamp(25ch, 100%, 50ch);
            margin: auto;
            font-weight: 700;
            color: #ffffff;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

    }

    .list{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1rem;
    }



@media (min-width: 768px) {
    .container {
        padding-inline: 2em;
    }

    .lg-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding-inline: 2em;
    }

    .list-container{
        h2{
            font-size: 4rem;
        }


        p{
            font-size: 1rem;
            margin-bottom: 1rem;
        }
    }

    .list{
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    .slideshow img {
        width: clamp(320px, 100%, 600px);
        max-height: 70vh;
        margin-bottom: 5rem;
    }


}
`;
