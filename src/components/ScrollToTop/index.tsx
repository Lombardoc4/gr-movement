import { useEffect, useState } from "react";
import { styled } from "styled-components"
import MusicPlayer from "../MusicPlayer";
import { Modal } from "../Modal";
import { Instructions } from "../Header";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

interface StyleProps {
    $visible: boolean
}

const StyledContainer = styled.div<StyleProps>`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    /* z-index: 1001; */
    
    display: flex;
    
    svg {
        display:block;
        margin: auto;
    }
    
    button {
        width: 100%;
        border: 1px solid #000000;
    }
    
    @media screen and (min-width: 768px) {
        position: fixed;
        bottom: 2em;
        right: 2em;
        left: unset;
        cursor: pointer;
    
        display: flex;
        gap: 1em;
        /* justify-content: flex-end; */
    
        transform: translateY(${({$visible}) => $visible ? 0 : 'calc(100% + 2em)'});
        transition: transform 0.3s;
    
        div {
            display: flex;
        }
        
        button {
            width: auto;
        }
    }

`;

const StyledInstructions = styled.div`
    background-color: #000000;
    border-radius: 0.5em;
    box-shadow: 0 0 1em rgba(255, 255, 255, 0.5);
    max-width: 500px;
`;

export const ScrollToTop = ({filterChild, scrollFunction}: {filterChild?: JSX.Element, scrollFunction: () => void}) => {

    const [visible, setVisible] = useState(false);
    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    
    const isMobile = useMediaQuery('(max-width: 768px)');

    
    useEffect(() => {
        setHelpModalOpen(false)
        setFilterModalOpen(false)
    }, [filterChild])

    useEffect(() => {
        const handleScroll = () => {
            if (visible !== window.scrollY > 200) {
                setVisible(window.scrollY > 200)
            }
        }
        
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [visible])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    return (<>
        <StyledContainer $visible={visible} >
            {(isMobile &&  filterChild) && <button onClick={() => setFilterModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                </svg>
            </button>}
            <button onClick={scrollFunction}>Scroll</button>
            <MusicPlayer playlistName="nameWall"/>
            <button onClick={() => setHelpModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                </svg>
            </button>
            <button onClick={scrollToTop}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                </svg>
            </button>
        </StyledContainer>
        <Modal isOpen={helpModalOpen} onClose={() => setHelpModalOpen(false)} >
            <StyledInstructions>
                <Instructions/>
            </StyledInstructions>
        </Modal>
        {(isMobile && filterChild) && <Modal isOpen={filterModalOpen} onClose={() => setFilterModalOpen(false)} >{filterChild}</Modal>}
    </>
    )
}