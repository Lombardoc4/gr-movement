// Getting Folder
// https://www.googleapis.com/drive/v3/files?q=%27{folderID}}%27%20in%20parents&key={API_KEY}
// Get id from folder id in url
// Convert q value from https://developers.google.com/drive/api/v3/reference/files/list

// Confirm, object has "mimeType": "image/png" or "image/jpg" and take id
// insert image, <img src="https://drive.google.com/uc?export=view&id=INSERT_HERE_YOUR_GOOGLE_DRIVE_IMAGE_ID" alt="drive image"/>

import { useEffect, useState, useRef } from "react";
import { StaticMenu } from "../Menu";

import MusicPlayer from "../MusicPlayer";

import './index.scss'


let scrollID;

const wallFolderIds = {
    teen: '1i8fUcQj5P4f3sDnpj10ZsudDjsohC8J-',
    main: '18A6zWwdQGxERzYYKDAPpc3afcU-azVz3'
};


// Find condition to combine two identical fetch calls

const getStateFolders = async (folderID) => {
    const stateFolders = await fetch(`https://www.googleapis.com/drive/v3/files?orderBy=name&q=%27${folderID}%27%20in%20parents&key=${process.env.REACT_APP_GOOGLE_API}`);

    return stateFolders.json();
}

const getImagesFromFolder = async (folderID) => {
    const folderContent = await fetch(`https://www.googleapis.com/drive/v3/files?orderBy=name&q=%27${folderID}%27%20in%20parents&key=${process.env.REACT_APP_GOOGLE_API}`);
    const fileData = await folderContent.json();


    fileData.files.filter(file => file.mimeType.includes('image/'))
    return fileData;
}





const PhotoShow = ({folderKey}) => {
    const [menuOpen, toggleMenu] = useState(false);
    const [slideshowMode, toggleSlideshowMode] = useState(false);
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);
    // const [scrollPos, setScrollPos] = useState(0);

    //Scroll Status
    const [scrolling, toggleScrolling] = useState(false);

    const photoshow = useRef(null);

    useEffect(() => {

        const getFolders = async () => {
            const folderIds = []
            const data = await getStateFolders(wallFolderIds[folderKey]);

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

                    // console.log('vals', values)
                    values.map(v => v.length > 1 && imageData.push(...v));
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


            }, slideshowMode ? 3000 : 15)



            return id;
        }

        scrollID = startScroll();
    }, [scrolling])


    const pushImageToState = () => {
        const newImages = [];
        let count = 0;
        const countLimit = data.length - images.length >= 10 ? 10 : data.length - images.length;

        while (count < countLimit) {
            const index = images.length + count;
            newImages.push(
                <div key={data[index].id} className="img-container" data-id={data[index].name}>

                    <img
                     alt={data[index].name}
                     src={`https://drive.google.com/uc?export=view&id=${data[index].id}`}
                     />
                </div>
            )
            count++;
        }
        setImages([...images, ...newImages]);
    }

    useEffect(() => {
        if (images.length > 0) {

            const windowWidth = window.innerWidth;



            photoshow.current.addEventListener('scroll', function() {
                const scrollFullScreenWidth = this.scrollLeft % windowWidth >= windowWidth - 10 || this.scrollLeft % windowWidth <= 10;

                if (scrollFullScreenWidth && data.length > images.length) {

                    // Make smaller containers of 10 images that load on scroll?
                    pushImageToState();

                }
            })

        }

    }, [images])

    useEffect(() => {
        if (data.length > 0) {
            pushImageToState();
        }
    }, [data])



    return (
        <div className="photo-bg">

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