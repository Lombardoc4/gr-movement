import { createContext, useContext, useState } from "react";



const SlideshowContext = createContext<ISlideshowContext | undefined>(undefined);

export const SlideshowProvider = ({ children }: { children: JSX.Element }) => {
    const [isSlideshow, setSlideshow] = useState(false);
    const toggleSlideshow = () => setSlideshow(!isSlideshow);

    return <SlideshowContext.Provider value={{ isSlideshow, toggleSlideshow }}>{children}</SlideshowContext.Provider>;
}

export const useSlideshow = (): ISlideshowContext => {
    const context = useContext(SlideshowContext);
    if (!context) {
        throw new Error("No context provided");
    }
    return context;
};
