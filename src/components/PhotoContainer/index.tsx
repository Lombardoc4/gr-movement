// import { useRef, useState } from "react";
// import { Person } from "../../utils/models"

export const PhotoContainer = ({imgUrl}: {imgUrl: string})  => {
    // const [open, setOpen] = useState(false);
    // const overlayRef = useRef<HTMLDivElement>(null);

    // const positionOverlay = () => {
    //     if (overlayRef.current) {

    //         if (overlayRef.current.parentElement) {
    //             const { x, width } = overlayRef.current.parentElement.getBoundingClientRect();
    //             console.log(x + width);
    //             console.log(window.innerWidth);

    //             if (window.innerWidth - x - width < 300) {
    //                 overlayRef.current.style.right = '50%'
    //                 overlayRef.current.style.left = 'auto'
    //             }
    //         }

    //     }

    //     setOpen(true);
    // }

    // if (entry.imgUrl) {
        return (
            <div

                // onMouseEnter={positionOverlay}
                // onMouseEnter={() =>  setOpen(true)}
                // onMouseLeave={() =>  setOpen(false)}
                // data-name={entry.firstName + ' ' +  entry.lastName }
                style={{position: 'relative'}}>
            <div
            className="name-entry img-container">
                <img style={{width: '100%'}} src={imgUrl} />
                    {/* <div ref={overlayRef} style={{display: open ? 'flex' : 'none', position: 'absolute', top: '50%', left: '50%', width: '400px', zIndex: '500', padding: '0.25em', backgroundColor: '#000000'}}>
                        <div style={{width: '100%', margin: '1em' , maxHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
                            <img style={{width: '100%'}} src={entry.imgUrl} />
                        </div>
                        <p>{entry.firstName + ' ' +  entry.lastName}</p>
                        <p>Forever {entry.foreverAge}</p>
                    </div> */}
            </div>
            </div>
        )
    // }

    return <></>;
}