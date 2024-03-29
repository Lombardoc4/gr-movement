import { createGlobalStyle } from "styled-components";

export const HeroStyles = createGlobalStyle`


    /*******************/
    /* HERO PAGE STYLES */
    /*******************/
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
            background-clip: text;
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


@media (min-width: 768px) {

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
