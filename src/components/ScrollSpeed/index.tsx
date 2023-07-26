import { useState } from "react";
import { styled } from "styled-components";

interface StyledModalProps {
    $open: boolean
}

const StyledModal = styled.div<StyledModalProps>`
    position: absolute;
    bottom: calc(100% + 2em);
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    box-shadow: 0 0 0 2px #000000, 0 0 0 4px #ffffff;
    color: #000000;

    opacity: ${({ $open }) => $open ? '1' : 0};
    pointer-events: ${({ $open }) => $open ? 'initial' : 'none'};
    transition: opacity 0.2s;

    min-width: 250px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;


    .heading {
        display: flex;
        gap: 1em;
        align-items: center;
        padding: 1em;
        font-size: 18px;
        font-weight: 700;

        svg {
            margin: 0;
        }
    }

    .buttons {
        padding: 1em;
        display: flex;
        gap: 1em;

        button {
            width: 100%;
        }
    }

    @media (min-width: 768px) {
        /* position: absolute; */
        /* right: -1em; */
        /* left: unset; */
        /* transform: translateX(0); */
    }

`;


const MiniModal = ({title, children}: {title: string, children: JSX.Element} ) => {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(!open)
    }

    return (
        <>
            <button onClick={() => openModal()} style={{position: 'relative'}}>
                {title}

                <StyledModal $open={open} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} >
                    {children}
                </StyledModal>
            </button>

        </>
    )
}

export default MiniModal;