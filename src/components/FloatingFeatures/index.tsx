import { useEffect, useState } from "react";
import styled from "styled-components";
import MusicPlayer from "../MusicPlayer";
import { Modal } from "../Modal";
// import useMediaQuery from "../../utils/hooks/useMediaQuery";
import { Instructions } from "../Instructions";
import { useWindowScroll } from "../../utils/hooks/useWindowScroll";
import { useSlideshow } from "../../utils/hooks/SlideshowContext";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

const StyledContainer = styled.div`
    position: sticky;
    z-index: 999;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;

    svg {
        display: block;
        margin: auto;
    }

    button,
    .btn {
        width: 100%;
        height: 32px;
        border: 1px solid #000000;

        .scrollToTop {
            max-width: 25%;
            height: 52px;
        }
    }

    .desktop {
        display: none;
    }

    @media screen and (min-width: 768px) {
        opacity: 0.5;
        /* position: fixed; */
        bottom: 2em;
        right: 2em;
        left: unset;
        cursor: pointer;

        display: flex;
        gap: 1em;
        font-size: 1.2em;
        justify-content: center;
        align-items: center;

        /* transition: transform 0.3s; */

        &:hover {
            opacity: 1;
        }
    }
    /* @media only screen and (min-width: 768px) {
        div {
            display: flex;
        }
    } */
    @media only screen and (min-width: 768px) {
        .mobile {
            display: none;
        }
    }
    @media only screen and (min-width: 768px) {
        .desktop {
            display: flex;
            width: clamp(300px, 100%, 500px);
        }
    }
    @media only screen and (min-width: 768px) {
        .scrollToTop {
            width: auto;
            margin: 1rem;
            height: 52px;
        }
    }
`;

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};

interface IFloatingFeatures {
    filterChild?: JSX.Element;
}

export const FloatingFeatures = ({ filterChild }: IFloatingFeatures) => {
    const [isScrolling, toggleScroll] = useWindowScroll();
    const {isSlideshow, toggleSlideshow} = useSlideshow();
    const [modal, setModal] = useState(false);
    const [viewer, setViewer] = useState("");
    const isMobile = useMediaQuery("(max-width: 768px)")

    const handleScroll = () => {
        toggleScroll();
        setModal(false);
        !isScrolling && setViewer('')
    };

    const handleSlideshow = () => {
        toggleSlideshow();
        isScrolling && toggleScroll()
    };

    const ScrollBtn = (
        <button className='btn__border w-100' onClick={handleScroll}>
            {isScrolling ? "Stop" : "Start"} Scroll
        </button>
    );
    const isPhoto = window.location.pathname.includes("photo");
    const SlideshowBtn =  (
        <button className='btn__border w-100' onClick={handleSlideshow}>
            {isSlideshow ? 'Gallery' : 'Slideshow'}
        </button>
    );

    useEffect(() => {
        setModal(false);
    }, [filterChild]);

    const handleViewChange = (val: string) => {
        setViewer(viewer !== val ? val : "");
    };

    return (
        <>
            <StyledContainer>
            {isMobile &&
                <button className='mobile' onClick={() => setModal(!modal)}>
                    Features
                </button>
                }
                {!isMobile && <>
                <button className='mobile' onClick={() => setModal(!modal)}>
                    Features
                </button>
                <div
                className='desktop'
                style={{
                    padding: "0.5rem",
                    backgroundColor: "#fff",
                    color: "#000",
                    borderRadius: "0.5rem",
                    display: 'flex',
                    flexDirection: "column",
                    gap: "1rem",
                }}
                >
                    {viewer === "music" && <MusicPlayer playlistName='nameWall' />}
                    {viewer === "scroll" && (
                        <div style={{ display: 'flex', gap: "1em" }}>
                            {ScrollBtn}
                            {isPhoto && SlideshowBtn}
                        </div>
                    )}
                    {viewer === "help" && (
                        <div>
                            <h3 className='mt-0'>Instructions</h3>
                            <Instructions />
                        </div>
                    )}
                    <div style={{ display: "flex", gap: "1em" }}>
                        <button onClick={() => handleViewChange("music")}>Music</button>
                        <button onClick={() => handleViewChange("scroll")}>Scroll</button>
                        <button onClick={() => handleViewChange("help")}>Help</button>
                    </div>
                </div>
                </>}
                <button className='scrollToTop' onClick={scrollToTop} style={{ maxWidth: "25%" }}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='32'
                        height='32'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                    >
                        <path d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z' />
                    </svg>
                </button>
            </StyledContainer>

            <Modal isOpen={modal} onClose={() => setModal(false)}>
                <MobileFeatures filters={filterChild} scroll={ScrollBtn} slideshow={isPhoto ? SlideshowBtn : <></>} />
            </Modal>
        </>
    );
};

interface IMobileFeatures {
    filters: JSX.Element | undefined;
    scroll: JSX.Element;
    slideshow: JSX.Element;
}

const MobileFeatures = ({ filters, scroll, slideshow }: IMobileFeatures) => {
    return (
        <div>
            {filters && (
                <div style={{ paddingBottom: "0.75rem", marginBottom: "0.75rem", borderBottom: "1px solid #000" }}>
                    <h3 className='mt-0'>Filters</h3>
                    {filters}
                </div>
            )}
            <div style={{ paddingBottom: "0.75rem", marginBottom: "0.75rem", borderBottom: "1px solid #000" }}>
                <h3 className='mt-0'>Music</h3>
                <MusicPlayer playlistName='nameWall' />
            </div>
            <div style={{ paddingBottom: "0.75rem", marginBottom: "0.75rem", borderBottom: "1px solid #000" }}>
                <h3 className='mt-0'>Scroll</h3>
                <div style={{ display: "flex", gap: "1em" }}>
                    {scroll}
                    {slideshow}
                </div>
            </div>
            <div style={{ paddingBottom: "0.75rem", marginBottom: "0.75rem", borderBottom: "1px solid #000" }}>
                <h3 className='mt-0'>Instructions</h3>
                <Instructions />
            </div>
        </div>
    );
};
