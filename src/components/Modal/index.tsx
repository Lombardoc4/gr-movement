import { useEffect } from "react";
import { styled } from "styled-components";

interface ModalProps {
    children: JSX.Element;
    isOpen: boolean;
    onClose: () => void;
}

const StyledModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    
    transform: translateY(100%);
    transition: opacity 0.3s, transform 0.3s;

    
    .modal-content {
        width: 100%;
        height: 100%;
        overflow: scroll;
        z-index: 1001;
        background-color: rgba(237, 207, 53, 0.2);
        padding: 2em 1em;
        border-radius: 0.5em;
        box-shadow: 0 0 1em rgba(255, 255, 255, 0.5);
    }
    
    .modal-close {
        bottom: 1em;
        right: 1em;
        position: absolute;
        pointer-events: auto;
        z-index: 1001;
        background-color: #ffffff;
        padding: 0.5em;
        border-radius: 0.5em;
        box-shadow: 0 0 1em rgba(0, 0, 0, 0.5);
        display: inline-flex;
        
        &:hover {
            background-color: #f1f1f1;
        }
    }
    
    &.is-active {
        pointer-events: auto;
        opacity: 1;
        transform: translateY(0);
        
        .modal-background {
            pointer-events: auto;
        }
    }
    
    @media screen and (min-width: 768px) {
        .modal-background {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 2em 1em;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .modal-close {
            svg {
                height: 42px;
                width: 42px;
            }
            /* bo: -1em; */
            /* right: -1em; */
        }
    }
    
    
`;

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
    
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
    };
    
	useEffect(() => {
		document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = isOpen ? "hidden" : "auto";
		return () => {
            document.body.style.overflow = "auto";
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen]);


	return (
		<>
			<StyledModal className={` ${isOpen ? "is-active" : ""}`}>
				<div
					className='modal-background'
					onClick={onClose}
				></div>
				<div className='modal-content'>
                    <button
                        className='modal-close is-large'
                        aria-label='close'
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                    
                    {children}</div>
			</StyledModal>
		</>
	);
};
