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
        font-family: 'athelas','GFS Neohellenic', sans-serif;
        background: -webkit-linear-gradient( #ba7b2c, #edcf39);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
    }


    .photo-entry {
        transition: transform 0.2s ease-out, z-index 0s 0.2s ;
        z-index: 0;

        &.slideshow {
            min-height: 100vh;
            display: flex;
            align-items: center;
        }

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


    /*******************/
    /* HERO PAGE STYLES */
    /*******************/
    .list-container {
        width: clamp(50%, 100%, 80%);
        margin: auto;
        color: #edcf39;
        text-align: center;


        h1{
            font-size: 2.5rem;
            text-transform: uppercase;
            color: #edcf39;
        }
        h2{
            font-size: 8rem;
            background: -webkit-linear-gradient( #ba7b2c, #edcf39);
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
        grid-template-columns: repeat(auto-fit, 300px);
        gap: 1rem 0.5rem;

        .h2{
            font-size: 1.5rem;
            color: #ffffff
        }
    }



body.heroes{
    min-height: 100vh;
    background-color: #000000;

    h1, h2{
        font-family: 'Athelas','GFS Neohellenic', sans-serif;
    }

    main{
        margin: auto;
    }

    .intro {
        margin-bottom: 0;
    }

    .links{

        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
        gap: 2rem;

        h1{
            font-size: 2rem;
            text-transform: uppercase;
            color: #edcf39;
            background: -webkit-linear-gradient( #ba7b2c, #edcf39);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .btn-group{
            display: flex;
            gap: 1.5rem;
        }

        .btn{
            padding: 0.75rem 1.25rem;
            border-radius: 0.25rem;
            // font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
            color: #000000;
            text-decoration: none;
            text-transform: uppercase;
            background-color: #edcf39;
            border: 1px solid #ba7b2c;

            &:hover{
                background: -webkit-linear-gradient( #ba7b2c, #edcf39);
            }
        }

    }


    .butterfly-img{
        width: 200px;
        margin: 2rem auto;
    }

    .landing-graphic{
        display: flex;
        align-items: center;
        position: relative;
        margin: 0 -5%;


        .butterfly-img{
            position: absolute;
            width: 200px;
            left: 50%;
            // margin: 1rem auto;
        }

        .flair-img{
            width: 50%;
        }
    }




    .hero-section{
        max-width: 1000px;
        color: #ffffff;
        margin: auto;
        padding: 2rem 0;
        display: flex;
        flex-direction: column;

        img:not(.butterfly-img){
            width: 100%;
            border: 2px solid #edcf39;
        }

        .frameImg img, .butterfly-img{
            border: none;
        }

        .h1{
            font-size: 4rem;
            margin-bottom: 2rem;
        }

        .hero-main{
            display: flex;
            flex-wrap: wrap;
            // margin-top: 1rem;

            .h1{
                font-style: italic;
                margin-bottom: 1rem;
            }

            .h2{
                font-size: 1.5rem;
                font-weight: 300;
                margin-bottom: 1rem;

            }

            p{ font-weight: 600;  line-height: 1.3;}

            & > *{
                width: 50%;
                padding: 1rem;
            }
        }

        .hero-video{
            display: flex;
            flex-direction: column;

            video{
                max-height: 400px;
                width: clamp(50%, 100%, 90%);
                margin: 2rem auto;
            }
        }

    }

}


@media screen and (max-width: 690px) {

    .list-container{
        h2{
            font-size: 4rem;
        }


        p{
            font-size: 1rem;
            margin-bottom: 1rem;
        }
    }


body.heroes{

    .links{
        flex-direction: column;
        gap: 1rem;

        h1{
            font-size: 1.75rem;
        }

        .btn{
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            padding: 0.5rem 0.75rem;
        }
    }


    .landing-graphic{

        .butterfly-img{
            position: absolute;
            width: 100px;
            left: 50%;
            // margin: 1rem auto;
        }

        .flair-img{
            width: 50%;
        }
    }

    .hero-section{
        .profile-photo{
            order: -1
        }
        .hero-main{
            flex-direction: column;

            & > *{
                width: 100%;
                padding: 1rem;
            }
        }
    }
}

}
`;
