// Getting Folder
// https://www.googleapis.com/drive/v3/files?q=%27{folderID}}%27%20in%20parents&key={API_KEY}
// Get id from folder id in url
// Convert q value from https://developers.google.com/drive/api/v3/reference/files/list

// Confirm, object has "mimeType": "image/png" or "image/jpg" and take id
// insert image, <img src="https://drive.google.com/uc?export=view&id=INSERT_HERE_YOUR_GOOGLE_DRIVE_IMAGE_ID" alt="drive image"/>

import { Hub, Storage } from "aws-amplify";
import { useEffect, useState, useRef } from "react";
import { StaticMenu } from "../Menu";
import { states } from "../data/states";

import MusicPlayer from "../MusicPlayer";

import './index.scss'


let scrollID;

const wallFolderIds = {
    teenWall: '1i8fUcQj5P4f3sDnpj10ZsudDjsohC8J-',
    photoWall: '18A6zWwdQGxERzYYKDAPpc3afcU-azVz3'
};




// Find condition to combine two identical fetch calls

const getStateFolders = async (folderID, folderKey) => {


    const stateFolders = await fetch(`https://www.googleapis.com/drive/v3/files?orderBy=name&q=%27${folderID}%27%20in%20parents&key=${process.env.REACT_APP_GOOGLE_API}`);

    return stateFolders.json();
}

const getImagesFromFolder = async (folderID, name) => {
    const folderContent = await fetch(`https://www.googleapis.com/drive/v3/files?pageSize=1000&orderBy=name&q=%27${folderID}%27%20in%20parents&key=${process.env.REACT_APP_GOOGLE_API}`);
    const fileData = await folderContent.json();

    fileData.files.filter(file => file.mimeType.includes('image/'))
    return fileData;
}





const PhotoShow = ({folderKey}) => {
    const [menuOpen, toggleMenu] = useState(false);
    const [slideshowMode, toggleSlideshowMode] = useState(false);
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);

    //Scroll Status
    const [scrolling, toggleScrolling] = useState(false);

    const photoshow = useRef(null);

    useEffect(() => {

        // const getFolders = async () => {
        //     const folderIds = []
        //     const data = await getStateFolders(wallFolderIds[folderKey], folderKey);

        //     data.files.map(folder => folderIds.push({id: folder.id, name: folder.name}));

        //     return folderIds.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        // };

        // const getData = async () => {
        //     const imageData = []
        //     const folders = await getFolders();


        //     const promises = folders.map(async (folder) => {
        //         const data = await getImagesFromFolder(folder.id, folder.name);

        //         return data.files;
        //     })

        //     Promise.all(promises).then(values => {

        //             // console.log('vals', values)
        //             values.map(v => v.length > 1 && imageData.push(...v));
        //             setData([...images,...imageData]);
        //     })
        // }

        // Make a call for each state


        const getS3Data = async (id) => {
            const url = folderKey + '/' + id + '/';
            // console.log(url)

            return Storage.list(url, { maxKeys: 1000}) // for listing ALL files without prefix, pass '' instead
                .then(result => {
                    // prune folders
                    result = result.filter(({key}) => {
                        if (key.includes('.jpg'))
                            return true;
                        else if (key.includes('.jpeg'))
                            return true;
                        else if (key.includes('.png'))
                            return true;
                        else
                            return false;

                    });


                    return result;



                    // result = result.filter(val => ['.jpg', '.png', '.jpeg'].some(v => v.contains(val)))
                })
                .catch(err => console.log(err));

        }

        const getData = async () => {
            const vals = []
            const alphaStates = states['United States'].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

            const promises = alphaStates.map(async (state) => {
                const result = await getS3Data(state.id);

                return result;
            })

            Promise.all(promises).then(values => {

                    // console.log('vals', values)
                    values.map(v => v.length > 1 && vals.push(...v));
                    setData([...data,...vals]);
            })
        }

        // const vals = []
        // states['United States'].map(async state => {

        //     // result.then(res => setData([...data, ...res]))
        //     console.log('data', data)
        //     console.log('res', result);

        //     setData([...data, result]);

        //     // console.log(state);
        // })

        // Promise.all(promises).then(values => {

        //         // console.log('vals', values)
        //         values.map(v => v.length > 1 && imageData.push(...v));
        //         setData([...images,...imageData]);
        // })



        // getS3Data();
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

                if (photoGrid.offsetWidth + photoGrid.scrollLeft >= photoGrid.scrollWidth) {
                    photoGrid.scrollTo(0, 0);
                } else {
                    photoGrid.scrollBy(1, 0);
                }


            }, slideshowMode ? 3000 : 15)



            return id;
        }

        if (photoshow.current) {
            scrollID = startScroll();
        }

    }, [scrolling])


    const pushImageToState = () => {
        const newImages = [];
        let count = 0;
        const countLimit = data.length - images.length >= 10 ? 10 : data.length - images.length;

        while (count < countLimit) {
            const index = images.length + count;
            newImages.push(
                <div key={data[index].eTag} className="img-container">
                    <img
                     alt={data[index].eTag}
                     src={`https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com/public/${data[index].key}`}
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
                const scrollFullScreenWidth = this.scrollLeft % windowWidth >= windowWidth - 20 || this.scrollLeft % windowWidth <= 20;

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


                    {(scrolling || folderKey === 'teenWall') && <MusicPlayer playlistName={folderKey}/>}


                    <div style={{display: 'flex'}}>
                        <div className={"add-btn " + (slideshowMode ? 'active' : '')} tabIndex={0} onClick={() => {toggleScrolling(false); toggleSlideshowMode(true)}}>
                            Slideshow
                        </div>


                        <div className={"add-btn " + (!slideshowMode ? 'active' : '')} tabIndex={0} onClick={() => {toggleScrolling(false); toggleSlideshowMode(false)}}>
                            Scroll
                        </div>


                        <div className={"add-btn " + (scrolling ? 'active' : '')} tabIndex={0} onClick={() => {toggleScrolling(!scrolling)}}>
                            {scrolling ? 'Stop' : 'Start'}
                        </div>
                    </div>


                </div>

        </div>
    )
};


export default PhotoShow;