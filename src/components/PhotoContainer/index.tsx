import { RefCallback } from "react";
// import { RefCallback, useEffect, useRef, useState } from "react";
// import useMediaQuery from "../../utils/hooks/useMediaQuery";

export const PhotoContainer = ({lastRef, folder, slideshow}: {lastRef?: RefCallback<HTMLElement> | false, folder: string | boolean, slideshow: boolean})  => {
    const imgSrc = `https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com/public/${folder}`;


    // ! Fancy stuff to make image expand on click
    // const [isOpen, setOpen] = useState(false);
    // const containerRef = useRef<HTMLDivElement>(null);
    // const isMobile = useMediaQuery("(max-width: 768px)");


    // useEffect(() => {
    //     if (containerRef.current && !isMobile) {
    //         if (isOpen) {
    //             const { x, width } = containerRef.current.getBoundingClientRect();
    //             if (window.innerWidth - x - width <= 24) {
    //                 containerRef.current.classList.add('right')
    //             }
    //             if (x === 24) {
    //                 containerRef.current.classList.add('left')
    //             }
    //             containerRef.current.classList.add('expand')
    //         } else {
    //             containerRef.current.classList.remove('expand', 'right', 'left')
    //         }
    //     }

    // }, [isOpen])


    return (
        <div
            className={"photo-entry img-container " + (slideshow ? "slideshow" : "")}
            ref={lastRef || undefined}
            // onClick={() => setOpen(true)}
            // onMouseOut={() =>  setOpen(false)}
            // data-name={entry.firstName + ' ' +  entry.lastName }
            // style={{position: 'relative'}}
        >
            {!folder && <div style={{width: '100%', aspectRatio: '4 / 5'}}></div>}
            {folder && <img src={imgSrc + "?v=" + Date.now()} />}
        </div>
    );
}