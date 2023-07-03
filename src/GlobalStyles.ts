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
    
    .h-gradient {
        font-family: 'Athelas','GFS Neohellenic', sans-serif;
        background: -webkit-linear-gradient( #ba7b2c, #edcf39);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
    }
    
    
    .photo-entry {
        transition: transform 0.2s ease-out;   
        &.expand {
            transform: scale(2);
            z-index: 100;
            
            &.left {
                transform-origin: left;
            }
            &.right {
                transform-origin: right;
            }
        }
        
    }
    

    .loading-loader:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4,end) 1200ms infinite;      
    animation: ellipsis steps(4,end) 1200ms infinite;
    content: "..."; /* ascii code for the ellipsis character */
    width: 0px;
    }

    @keyframes ellipsis {
        to {
            width: 1em;    
        }
    }

    @-webkit-keyframes ellipsis {
        to {
            width: 1em;    
        }
    }

    @media screen and (max-width: 700px) {
        .container{
            padding: 1em;
        }
    }
`;