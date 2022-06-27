import { BaseSyntheticEvent } from "react"
import './App.css';


const Modal = ({closeModal, children} : {closeModal: () => void, children: JSX.Element}) => {

    const close = (e: BaseSyntheticEvent) => {
        if (e.target && e.target.id === 'mainModal'){
            closeModal();
        }
    }

    return (
        <div id="mainModal" className="modal" onClick={close}>
            <div className="modal-container">
                {children}
            </div>
        </div>
    )
}

export default Modal;