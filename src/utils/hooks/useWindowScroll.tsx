import { useState, useEffect } from "react";

export const useWindowScroll = () => {
    const [isScrolling, setIsScrolling] = useState(false);
    
    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (isScrolling) {
                window.scrollBy(0, 1);
            } else {
                clearInterval(scrollInterval);
            }
            
        }, 80)
        
        return () => clearInterval(scrollInterval);
        
    }, [isScrolling])
    
    return [isScrolling, setIsScrolling] as const;
}
            