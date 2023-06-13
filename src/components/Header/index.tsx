
import butterflyLogo from '../../assets/butterfly.png'
import bgFlair from '../../assets/bg-flair.png'
import styled from 'styled-components';

const HeaderEl = styled.header`

    justify-content: space-evenly;
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    // width: clamp(50%, 100%, 80%);
    margin: auto;
    color: #edcf39;
    /* text-align: center; */


    .landing-graphic{
        display: flex;
        align-items: center;
        position: relative;
        min-width: 100%;
        margin: 0 -5% 1em;


        .butterfly-img{
            position: relative;
            width: 250px;
            left: -50%;
        }

        .flair-img{
            width: 50%;
        }
    }

    h2{
        font-family: 'Athelas','GFS Neohellenic', sans-serif;
        font-size: 3em;
        line-height: 1;
        background: -webkit-linear-gradient( #ba7b2c, #edcf39);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 0.25em;
    }

    p{
        width: clamp(25ch, 100%, 50ch);
        margin: auto;
        font-weight: 700;
        color: #ffffff;
        font-size: 1em;
        margin-bottom: 1em;
    }

    ul {
        margin: 0.5em 0;

        li {
            margin-left: 2em;
        }
    }

    @media screen and (max-width: 700px) {
        .landing-graphic {
            margin: 0 0 1em;


            .butterfly-img {
                width: 150px;
            }
        }

    }
`;

export const Header = ({title, children} : {title: string, children: JSX.Element}) => {

    return (
        <HeaderEl>
            <div>
                <h2>
                    {title}
                </h2>

                <div className="landing-graphic">
                    <img
                    className="flair-img"
                    src={bgFlair}
                    />
                    <img
                    className="flair-img"
                    style={{ transform: "scaleX(-1)"}}
                    src={bgFlair}
                    />
                    <img
                    className="butterfly-img"
                    style={{transform: `translateX(-50%)`}}
                    src={butterflyLogo}
                    />
                </div>
            </div>

            {children}

        </HeaderEl>
    )
}