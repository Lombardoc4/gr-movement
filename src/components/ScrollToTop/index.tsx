import { useEffect, useState } from "react";
import { styled } from "styled-components"
import MusicPlayer from "../MusicPlayer";

interface StyleProps {
    $visible: boolean
}

const StyledContainer = styled.div<StyleProps>`
    position: fixed;
    bottom: 2em;
    right: 2em;
    cursor: pointer;

    display: flex;
    gap: 1em;
    /* justify-content: flex-end; */

    transform: translateY(${({$visible}) => $visible ? 0 : 'calc(100% + 2em)'});
    transition: transform 0.3s;

    div {
        display: flex;
    }

`;

export const ScrollToTop = () => {

    const [visible, setVisible] = useState(false);

    const handleScroll = () => {
        if (visible !== window.scrollY > 200) {
            setVisible(window.scrollY > 200)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    return (
        <StyledContainer $visible={visible} >
            <button>Scroll</button>
            <MusicPlayer playlistName="nameWall"/>
            <button>Help</button>
            <div onClick={scrollToTop} tabIndex={0}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="40" height="40" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4 9h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5A.5.5 0 0 0 4 11z"/>
                </svg>
            </div>
        </StyledContainer>
    )
}