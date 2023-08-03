
import butterflyLogo from '../../assets/butterfly.png'
import bgFlair from '../../assets/bg-flair.png'
import styled from 'styled-components';
import useMediaQuery from '../../utils/hooks/useMediaQuery';

const StyledInstructions = styled.div`
    padding: 1em;
    font-size: 0.75em;


    .functionality {
        margin: 2em auto;

    }

    h3{
        font-size: 1.75em;
        line-height: 1;
        text-align: center;
        margin-bottom: 0.25em;
    }

    .main-content{
        margin: auto;
        font-weight: 700;
        margin-bottom: 1em;
    }

    li {
        margin-left: 2em;
    }

    .btn-group {
        display: flex;
        /* flex-direction: column; */
        gap: 0.5em;
        margin: 1em auto;
        align-items: center;
        /* text-align: center; */
        /* font-size: 0.75em; */

        svg {
            display: block;
        }

        button {
            pointer-events: none;
            font-size: 0.5em;

        }
    }

    @media screen and (min-width: 768px) {
        h3 { font-size: 2.5em; }
    }
    @media only screen and (min-width: 768px) {

        .functionality {
            /* width: 33ch; */
        }
    }
    @media only screen and (min-width: 768px) {
        .main-content {
            width: clamp(25ch, 100%, 50ch);
        }
    }
    @media only screen and (min-width: 768px) {

        .btn-group {
            gap: 1em;
            /* flex-direction: row; */
            /* text-align: left; */
            width: 33ch;
            /* margin: 2em auto; */
            padding: 1em;
            border: 1px solid #fff;
        }

    }
    @media only screen and (min-width: 768px) {
            button {
                margin: 0;
            }
    }
`;

export const Instructions = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isPhoto = window.location.pathname.includes('photo');

    return (
        <StyledInstructions>

            <h3 className='h-gradient'>Instructions</h3>
            <div className="main-content">

                { !isPhoto && <p>
                    On the top of your screen you will see a filter bar.
                    This will showcase the name of the active section of the wall, as well as any active filters.
                </p>}
                <ul>
                    You can:
                    { !isPhoto && <li>Search for your loved one by name</li>}
                    <li>Filter the wall by country</li>
                    <li>Filter the wall by state/province in the United States and Canada</li>
                </ul>

                <br/>
                <h4>Bottom of the screen hosts these functionalities</h4>
                { (isMobile && !isPhoto) &&
                <p className='btn-group'>
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                        </svg>
                    </button>
                    Filter the wall by country, state or search for a name
                </p>
                }
                <p className="btn-group"><button>Scroll</button> Automatically scroll the wall</p>
                <p className="btn-group">
                    <button>
                        { isMobile ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"  viewBox="0 0 16 16">
                                <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                <path fillRule="evenodd" d="M12 3v10h-1V3h1z"/>
                                <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                <path fillRule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                            </svg> :
                            'Music'
                        }
                    </button>
                    Open a music player where you can play, pause and skip tracks
                </p>
                <p className="btn-group">
                    <button>
                        {isMobile ? <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"  viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                        </svg>
                        : 'Help'
                        }
                    </button>
                    Open these instructions</p>
                <p className="btn-group">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                        </svg>
                    </button>
                    Scroll to the top of the page
                </p>
            </div>
        </StyledInstructions>
    )
}

const StyledGraphic = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    min-width: 100%;
    margin: 0 0 1em;


    .butterfly-img{
        position: relative;
        width: 150px;
        left: -50%;
    }

    .flair-img{
        min-width: 50%;

        img {
            width: 100%;
        }
    }

    @media screen and (min-width: 768px) {
        margin: 0 auto 1em;

        .butterfly-img {
            width: 250px;
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
				<img
					style={{ transform: "scaleX(-1)" }}
					src={bgFlair}
				/>
			</div>
			<img
				className='butterfly-img'
				style={{ transform: `translateX(-50%)` }}
				src={butterflyLogo}
			/>
		</StyledGraphic>
	);
};

const StyledHeader = styled.header`
    font-size: 1.5em;
    padding: 3em 0;
    overflow: hidden;

    h2{
        font-size: 2em;
        line-height: 1;
        text-align: center;
        margin: 0 auto 1em;
        max-width: 700px;

    }

    .intro {
        padding: 1em;
        margin: auto;
        font-weight: 700;
        margin-bottom: 2em;
        text-align: center;
    }

    @media screen and (min-width: 768px) {
        h2 { font-size: 3em; }
    }

    @media screen and (min-width: 768px) {
        .intro {
            margin-bottom: 4em;
            width: clamp(25ch, 100%, 50ch);

        }
    }
`;


export const Header = ({title, instruction = true} : {title: string, instruction?: boolean}) => {

    return (
        <StyledHeader>
            <h2 className='h-gradient'>{title}</h2>

            <LandingGraphic/>

            <div className="intro">
                <p>The Drug Epidemic Memorial Wall is a virtual International wall honoring our loved ones.</p>
                <p>This stunning, heartbreaking, and seemingly endless stream of precious lives is a powerful visual created for healing, educationg, raising awareness and honoring our loved ones by saving lives.</p>
            </div>

            {instruction && <Instructions/>}

        </StyledHeader>
    )
}