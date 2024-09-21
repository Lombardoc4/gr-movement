import { useState, useEffect } from "react";
import { useSlideshow } from "./SlideshowContext";

export const useWindowScroll: () => [boolean, () => void] = () => {
    const [isScrolling, setScrolling] = useState(false);
    const { isSlideshow } = useSlideshow();
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        if (isScrolling && isSlideshow) {
            const photoEls = document.querySelectorAll(".photo-entry") as NodeListOf<HTMLDivElement>;
            photoEls[slideIndex].scrollIntoView({block: 'center'})
        }
    }, [slideIndex, isScrolling, isSlideshow])

    // Todo set scroll speed
    useEffect(() => {
        if (isSlideshow) {
            document.body.style.overflow = isScrolling ? "hidden" : "auto";
        }

        const scrollInterval = setInterval(
            () => {
                if (isScrolling) {

                    if (isSlideshow) {
                        const photoEls = document.querySelectorAll(".photo-entry") as NodeListOf<HTMLDivElement>;
                        setSlideIndex(prevIndex => prevIndex === photoEls.length - 1 ? 0 : prevIndex + 1);
                    } else {
                        const scrollHeight = document.documentElement.scrollHeight;
                        if (window.innerHeight + document.documentElement.scrollTop === scrollHeight) {
                            const scrollerEl = document.querySelector("#scroller") as HTMLDivElement;
                            window.scrollTo(0, scrollerEl ? scrollHeight - scrollerEl.offsetHeight : 0);
                        }
                        window.scrollBy(0, 1);
                    }
                } else {
                    setSlideIndex(0);
                    clearInterval(scrollInterval);
                }
            },
            isSlideshow ? 2500 : 5
        );

        return () => {
            document.body.style.overflow = "auto";
            clearInterval(scrollInterval);
        }
    }, [isScrolling, isSlideshow]);

    return [isScrolling, () => setScrolling(!isScrolling)];
};
