import { useEffect, useState } from "react";

let scrollID;

export const useWindowScroll = () => {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        if (!scrolling) {
            clearInterval(scrollID);
            return;
        }

        const startScroll = () => {
            let id = setInterval(() => {
                // if at end of screen, scroll to 0;
                if (window.innerWidth + window.scrollX >= document.getElementById('main-app').offsetWidth) {
                    window.scrollTo(0, 0);
                } else {
                    window.scrollBy(1, 0);
                }

            }, 30)

            return id;
        }

        scrollID = startScroll();

    }, [scrolling])

    return [scrolling, setScrolling];
}