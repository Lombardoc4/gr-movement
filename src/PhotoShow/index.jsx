// Getting Folder
// https://www.googleapis.com/drive/v3/files?q=%27{folderID}3%27%20in%20parents&key=AIzaSyCOCbfvdx_x1CMPe2wNxjBgEz4ut3i9few
// Get id from folder id in url
// Convert q value from https://developers.google.com/drive/api/v3/reference/files/list
// ! There is a key, this should be moved to aws

import { useEffect, useState, useRef } from "react";
import { StaticMenu } from "../Menu";

import './index.scss'

// Confirm, object has "mimeType": "image/png" or "image/jpg" and take id
// insert image, <img src="https://drive.google.com/uc?export=view&id=INSERT_HERE_YOUR_GOOGLE_DRIVE_IMAGE_ID" alt="drive image"/>

let scrollID;

const PhotoShow = () => {
    const [menuOpen, toggleMenu] = useState(false);
    const [slideshowMode, toggleSlideshowMode] = useState(false);
    const [data, setData] = useState([]);

    //Scroll Status
    const [scrolling, toggleScrolling] = useState(false);

    const photoshow = useRef(null);

    useEffect(() => {
        if (!scrolling) {
            clearInterval(scrollID);
            return;
        }

        const startScroll = () => {
            let id = setInterval(() => {
                const photoGrid = photoshow.current;

                // if at end of screen, scroll to 0;
                if (photoGrid.innerWidth + photoGrid.scrollX >= photoGrid.offsetWidth) {
                    photoGrid.scrollTo(0, 0);
                } else {
                    photoGrid.scrollBy(1, 0);
                }


            }, slideshowMode ? 15000 : 30)



            return id;
        }

        scrollID = startScroll();
    }, [scrolling])

    useEffect(() => {
        const images = [];
        let count = 100;
        while (count > 0) {
            images.push(
                <div className={(slideshowMode ? 'slideshow ' : '') +  (count % 2 === 0 ? 'rotate' : '') + " img-container " }>
                        <img src="https://drive.google.com/uc?export=view&id=1E653Fmfqvlbve0j4_C1ZIFC53mif_8dn" alt="drive image"/>
                </div>
            )
            count--;
        }

        setData(images);

    }, [slideshowMode])

    return (
        <div id="main-app" className="main-app">

            <div ref={photoshow} id="photoshow" className={"grid " + (menuOpen ? 'grid-slideRight' : '' )}>

                { data }

            </div>

            <div className={(menuOpen ? 'open' : '') + " menu"}>
                <StaticMenu/>
            </div>

            <div className="floating">

                    <div className="add-btn" tabIndex={0} onClick={() => toggleMenu(!menuOpen)}>
                        Menu
                    </div>


                    <div className="add-btn" tabIndex={0} onClick={() => {toggleSlideshowMode(true)}}>
                        Slideshow
                    </div>


                    <div className="add-btn" tabIndex={0} onClick={() => {toggleSlideshowMode(false)}}>
                        Scrolling
                    </div>


                    <div className="add-btn" tabIndex={0} onClick={() => {toggleScrolling(!scrolling)}}>
                        Start/Stop
                    </div>

                </div>

        </div>
    )
};


export default PhotoShow;