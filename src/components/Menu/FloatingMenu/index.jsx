import { useWindowScroll } from "../../../customHooks/useWindowScroll"
import MusicPlayer from "../../MusicPlayer";


export default function FloatingMenu({children}) {
    const [scrolling, setScrolling] = useWindowScroll();

    return(
        <div className="floating">
            {children}
            <div className="add-btn" tabIndex={0} onClick={() => {setScrolling(!scrolling)}}>
                Scroll
            </div>
            <MusicPlayer playlistName={'nameWall'} />
        </div>
    )
}