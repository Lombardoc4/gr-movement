import { useState, useEffect } from "react";

export const useSlideshow = () => {
    const [isScrolling, setScrolling] = useState(false);

    // Todo set scroll speed

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (isScrolling) {
                const photoEl = document.querySelector('.photo-entry') as HTMLDivElement;
                if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
                    const scrollerEl = document.querySelector('#scroller') as HTMLDivElement
                    window.scrollTo(0, scrollerEl ? scrollerEl.offsetHeight : 0)
                }
                window.scrollBy(0, photoEl.offsetHeight);
            } else {
                clearInterval(scrollInterval);
            }

        }, 5000)

        return () => clearInterval(scrollInterval);

    }, [isScrolling])

    return () => setScrolling(!isScrolling);
}
