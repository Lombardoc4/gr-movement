// Getting Folder
// https://www.googleapis.com/drive/v3/files?q=%27{folderID}}%27%20in%20parents&key={API_KEY}
// Get id from folder id in url
// Convert q value from https://developers.google.com/drive/api/v3/reference/files/list
// ! There is a key, this should be moved to aws

import { useEffect, useState, useRef } from "react";
import { StaticMenu } from "../Menu";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import MusicPlayer from "../MusicPlayer";

import './index.scss'

// Confirm, object has "mimeType": "image/png" or "image/jpg" and take id
// insert image, <img src="https://drive.google.com/uc?export=view&id=INSERT_HERE_YOUR_GOOGLE_DRIVE_IMAGE_ID" alt="drive image"/>

let scrollID;


const getStateFolders = async () => {
    const stateFolders = await fetch(`https://www.googleapis.com/drive/v3/files?orderBy=name&q=%2718A6zWwdQGxERzYYKDAPpc3afcU-azVz3%27%20in%20parents&key=${process.env.REACT_APP_GOOGLE_API}`);

    return stateFolders.json();
}

const getImagesFromFolder = async (folderID) => {
    const folderContent = await fetch(`https://www.googleapis.com/drive/v3/files?orderBy=name&q=%27${folderID}%27%20in%20parents&key=${process.env.REACT_APP_GOOGLE_API}`);
    const fileData = await folderContent.json();

    // console.log(fileData);

    fileData.files.filter(file => file.mimeType.includes('image/'))
    return fileData;
}

const PhotoShow = () => {
    const [menuOpen, toggleMenu] = useState(false);
    const [slideshowMode, toggleSlideshowMode] = useState(false);
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);
    const [loadedImgCount, addLoadedImg] = useState(0);
    // const [scrollPos, setScrollPos] = useState(0);

    //Scroll Status
    const [scrolling, toggleScrolling] = useState(false);

    const photoshow = useRef(null);

    useEffect(() => {

        const getFolders = async () => {
            const folderIds = []
            const data = await getStateFolders();

            // console.log(data);

            data.files.map(folder => folderIds.push({id: folder.id, name: folder.name}));

            return folderIds.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        };

        const getData = async () => {
            const imageData = []
            const folders = await getFolders();

            const promises = folders.map(async (folder) => {
                const data = await getImagesFromFolder(folder.id);
                return data.files;
            })

            Promise.all(promises).then(values => {

                values.map(v => imageData.push(...v));
                setData([...images,...imageData]);
            })
        }

        getData();

    }, [])



    // Transitions
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


            }, slideshowMode ? 3000 : 30)



            return id;
        }

        scrollID = startScroll();
    }, [scrolling])

    // Setting Classes on Images
    useEffect(() => {

        // Do this if (1000 - # of returned items < 1000)
        if (data.length > 0) {

            const images = [];
            let count = 0;

            // Make smaller containers of 10 images that load on scroll?


            while (count < data.length) {
                images.push(
                    <div key={data[count].id} className="img-container">
                        <LazyLoadImage
                         alt={data[count].name}
                         src={`https://drive.google.com/uc?export=view&id=${data[count].id}`}
                         effect="blur"
                         />
                        {/* <img src={`https://drive.google.com/uc?export=view&id=${data[count].id}`} loading="lazy" alt={data[count].name}/> */}
                    </div>
                )
                count++;
            }
        setImages(images);
        }

    }, [data]);

    return (
        <div id="main-app" className="main-app bg-black">

            <div ref={photoshow} id="photoshow" className={"grid " + (menuOpen ? 'grid-slideRight' : '' ) + ' ' + (slideshowMode ? 'slideshow ' : '') }>

                { images }

            </div>

            <div className={(menuOpen ? 'open' : '') + " menu"}>
                <StaticMenu/>
            </div>

            <div className="floating">

                    <div className="add-btn" tabIndex={0} onClick={() => toggleMenu(!menuOpen)}>
                        Menu
                    </div>


                    <div className={"add-btn " + (slideshowMode ? 'active' : '')} tabIndex={0} onClick={() => {toggleScrolling(false); toggleSlideshowMode(true)}}>
                        Slideshow
                    </div>


                    <div className={"add-btn " + (!slideshowMode ? 'active' : '')} tabIndex={0} onClick={() => {toggleScrolling(false); toggleSlideshowMode(false)}}>
                        Scrolling
                    </div>


                    <div className={"add-btn " + (scrolling ? 'active' : '')} tabIndex={0} onClick={() => {toggleScrolling(!scrolling)}}>
                        {scrolling ? 'Stop' : 'Start'}
                    </div>

                    {scrolling && <MusicPlayer playlistName={'photoWall'}/>}

                </div>

        </div>
    )
};


export default PhotoShow;