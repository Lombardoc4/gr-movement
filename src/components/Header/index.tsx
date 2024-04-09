import butterflyLogo from "../../assets/butterfly.png";
import bgFlair from "../../assets/bg-flair.png";
import styled from "styled-components";
import { Link } from "react-router-dom";


const StyledGraphic = styled.div`
    display: flex;
    align-items: center;
    min-width: 100%;
    padding: 3em 0;

    .butterfly-img {
        position: relative;
        width: 150px;
        left: -50%;
    }

    .flair-img {
        min-width: 50%;

        img {
            width: 100%;
        }

        &:nth-child(2) img{
            transform: scaleX(-1);
        }
    }

    @media screen and (min-width: 768px) {
        .butterfly-img {
            display: none;
        }
    }
`;

const LandingGraphic = () => {
    return (
        <StyledGraphic>
            <div className='flair-img'>
                <img src={bgFlair} />
            </div>
            <div className='flair-img'>
                <img src={bgFlair} />
            </div>
            <img className='butterfly-img' style={{ transform: `translateX(-50%)` }} src={butterflyLogo} />
        </StyledGraphic>
    );
};

const StyledHeader = styled.header`
    overflow: hidden;
    background-color: #000000;
    margin-bottom: 3em;

    h1 {
        line-height: 1;
        max-width: 700px;
    }

    .intro {
        font-weight: 700;
    }

    .container .butterfly-img {
        display: none;
    }

    a {
        text-decoration: none;
        /* text-align: center; */

        :hover {
            color: #000000;
            text-decoration: underline;
            text-underline-offset: 0.25rem;
        }
    }


    @media screen and (min-width: 768px) {
        padding-top: 2rem;
        min-height: 60vh;
        /* display: grid; */
        align-items: center;
    }

    @media screen and (min-width: 768px) {
        .container .butterfly-img {
            display: initial;
        }
    }
    /* @media screen and (min-width: 768px) {
        h2 {
            font-size: 4rem;
        }
    } */

    @media screen and (min-width: 768px) {
        .intro {
            flex: 1
        }
    }
    @media screen and (min-width: 768px) {
        .intro p{
            font-size: 1.25rem;
        }
    }
`;

export const Header = ({
    title,
    //children
}: {
    title: string;
    // children?: JSX.Element
}) => {
    return (
        <StyledHeader className="container">
            <div style={{ display: "flex", gap: '2rem', paddingBlock: '2rem' }}>
                <div className="intro">
                    <h1 className='h-gradient m-0'>{title}</h1>

                    <div>
                        <p>The Drug Epidemic Memorial Wall is a virtual International wall honoring our loved ones.</p>
                        <p>
                            This stunning, heartbreaking, and seemingly endless stream of precious lives is a powerful
                            visual created for healing, education, raising awareness and honoring our loved ones by
                            saving lives.
                        </p>
                    </div>
                </div>

                <img className='butterfly-img' style={{ width: "33%", objectFit: "contain" }} src={butterflyLogo} />
            </div>

            <div
                style={{
                    display: "flex",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    paddingBlock: "2rem",
                    gap: "3rem",
                    // fontSize: "1.5rem",
                }}
            >
                {/* {children} */}
                <div style={{flex: 1}}>
                    <h2 className='h-gradient m-0 bold'>Name Walls</h2>
                    <div>
                        <ul>
                            <li>
                                <Link className='btn' to='/'>
                                    🌐 International
                                </Link>
                            </li>
                            <li>
                                <Link className='btn' to='/usa'>
                                    🇺🇸 United States
                                </Link>
                            </li>
                            <li>
                                <Link className='btn' to='/can'>
                                    🇨🇦 Canada
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <h2 className='h-gradient m-0 bold'>Photo Walls</h2>
                    <div>
                        <ul>
                            <li>
                                <Link className='btn' to='/photos' >
                                    🇺🇸 United States
                                </Link>
                            </li>
                            <li>
                                <Link className='btn' to='/photos/teens' >
                                    🇺🇸 United States Teens
                                </Link>
                            </li>
                            <li>
                                <Link className='btn' to='/photos/can'>
                                    🇨🇦 Canada
                                </Link>
                            </li>
                            <li>
                                <Link className='btn' to='/photos/world'>
                                    🌐 Rest of the World
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <h2 className='h-gradient m-0 bold'>The numbers</h2>
                    <div>
                        <ul>
                            <li>
                                <Link className='btn' to='/numbers'>
                                    By the Numbers
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <LandingGraphic />

            {/* {instruction && <Instructions/>} */}
        </StyledHeader>
    );
};
