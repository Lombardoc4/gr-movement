import { useState, useEffect } from "react";

export const useWindowScroll = () => {
    const [isScrolling, setScrolling] = useState(false);

    // Todo set scroll speed

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (isScrolling) {
                if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
                    const scrollerEl = document.querySelector('#scroller') as HTMLDivElement
                    window.scrollTo(0, scrollerEl ? scrollerEl.offsetHeight : 0)
                }
                window.scrollBy(0, 1);
            } else {
                clearInterval(scrollInterval);
            }

        }, 50)

        return () => clearInterval(scrollInterval);

    }, [isScrolling])

    return () => setScrolling(!isScrolling);
}
