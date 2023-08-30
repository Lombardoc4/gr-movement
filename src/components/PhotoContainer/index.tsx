import { useEffect, useRef, useState } from "react";
import useMediaQuery from "../../utils/hooks/useMediaQuery";

export const PhotoContainer = ({imgUrl, slideshow}: {imgUrl: string, slideshow: boolean})  => {
    const [isOpen, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    // On hover for 1seconds, expand image
    // let timeout: NodeJS.Timeout;
    // const expandImage = () => {
    //     if (timeout) {
    //         clearTimeout(timeout);
    //     }

    //     timeout = setTimeout(() => {
    //         setOpen(true);
    //     }, 1000);
    // }

    const cancelExpand = () => {
        // clearTimeout(timeout);
        setOpen(false);
    }


    useEffect(() => {
        if (containerRef.current && !isMobile) {
            if (isOpen) {
                const { x, width } = containerRef.current.getBoundingClientRect();
                if (window.innerWidth - x - width === 0) {
                    containerRef.current.classList.add('right')
                }
                if (x === 0) {
                    containerRef.current.classList.add('left')
                }
                containerRef.current.classList.add('expand')
            } else {
                containerRef.current.classList.remove('expand', 'right', 'left')
            }
        }

    }, [isOpen])


    return (
        <div
            className={"photo-entry " + (slideshow ? 'slideshow' : '')}
            ref={containerRef}
            onClick={() => setOpen(!isOpen)}
            onMouseOut={() =>  cancelExpand()}
            // onMouseEnter={() =>  expandImage()}
            // data-name={entry.firstName + ' ' +  entry.lastName }
            style={{position: 'relative'}}>
            <div className="name-entry img-container">
                <img style={{width: (!isMobile && slideshow) ? '600px' : '100%'}} src={imgUrl} />
            </div>
        </div>
    )
}