import { useState, useEffect } from "react";

export const useWindowScroll = () => {
    const [isScrolling, setScrolling] = useState(false);

    // Todo set scroll speed

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (isScrolling) {
                window.scrollBy(0, 1);
            } else {
                clearInterval(scrollInterval);
            }

        }, 50)

        return () => clearInterval(scrollInterval);

    }, [isScrolling])

    return () => setScrolling(!isScrolling);
}
