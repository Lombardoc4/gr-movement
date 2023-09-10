import { styled } from "styled-components";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

const StyledInstructions = styled.div`
    /* padding: 1em; */
    /* font-size: 0.75em; */

    .functionality {
        margin: 2em auto;
    }

    h3 {
        font-size: 1.75em;
        line-height: 1;
        text-align: center;
        margin-bottom: 0.25em;
    }

    .main-content {
        margin: auto;
        font-weight: 700;
        margin-bottom: 1em;
    }

    li {
        margin-left: 1rem;
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
        h3 {
            font-size: 2.5em;
        }
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
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isPhoto = window.location.pathname.includes("photo");


    // TODO : Update instructions

    return (
        <StyledInstructions>
            <div className='main-content'>
                {isMobile && <p>To navigate between walls use the menu button on the top right of the page</p>}

                <p>To navigate to a subsection of the wall you can use the button list above the names or photos</p>

                {!isPhoto && (
                    <p>
                       There is a filter bar to find your loved one and bring them into view on the wall
                    </p>
                )}

                <p>
                    We offer a music playlist to play along with your viewing experience.
                </p>

                <p>
                    You can have the wall scroll automatically using the scroll features.
                    {isPhoto && "We also offer a slideshow mode to view photos one at a time"}
                </p>
                <p>
                    You can press the arrow on the right if you want to return to the links at the top of the page.
                </p>

                <p>If you have any question please email us at <a href="mailto:info@drugepidemicmemorial.org">info@drugepidemicmemorial.org</a></p>
            </div>
        </StyledInstructions>
    );
};