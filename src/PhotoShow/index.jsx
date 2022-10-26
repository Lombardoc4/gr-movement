
import { Storage } from "aws-amplify";
import { useEffect, useState, useRef } from "react";
import { StaticMenu } from "../Menu";
import { states } from "../data/states";

import MusicPlayer from "../MusicPlayer";
import './index.scss'
import { useParams } from "react-router-dom";

let scrollID;

const getS3Data = async (folderKey, id) => {
    const url = folderKey + '/' + id + '/';
    // console.log('url', url);

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

        })
        .catch(err => console.log(err));

}

const alphabetizedNames = (peopleList) => {
    peopleList = peopleList.map((person) => ({...person, name: person.key.toUpperCase().replace('-', ' ')}))

    return peopleList.sort((a, b) => a.name.localeCompare(b.name))
}

const PhotoShow = ({folderKey}) => {
    const [menuOpen, toggleMenu] = useState(false);
    const [slideshowMode, toggleSlideshowMode] = useState(false);
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);

    const {id} = useParams();

    //Scroll Status
    const [scrolling, toggleScrolling] = useState(false);

    const photoshow = useRef(null);

    useEffect(() => {



        const getMultiData = async () => {
            const vals = []

            // alphabetical order
            const alphaStates = states['United States'].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

            // Make a call for each state returns a promise
            const promises = alphaStates.map(async (state) => {
                const result = await getS3Data(folderKey, state.id);

                return result.length > 0 ? alphabetizedNames(result) : [];
                // return result;
            })

            Promise.all(promises).then(values => {
                // push values that are length > 0
                values.map(v => v.length > 1 && vals.push(...v));
                // values = alphabetizedNames(values);

                setData([...data,...vals]);
            })
        }

        const getSingleData = async () => {
            const result = await getS3Data(folderKey, id.toUpperCase());
            setData(result.length > 0 ? alphabetizedNames(result) : []);

            // console.log('result', result);
            // setData(result);
        }

        if (id) {
            getSingleData();
        } else {
            getMultiData();
        }

    }, [])


    // Transitions
    useEffect(() => {
        if (!scrolling) {
            clearInterval(scrollID);
            return;
        }

        const transitionTiming = slideshowMode ? 3000 : 15;
        const startScroll = () => {

            let id = setInterval(() => {
                const photoGrid = photoshow.current;

                if (photoGrid.offsetWidth + photoGrid.scrollLeft >= photoGrid.scrollWidth) {
                    // reset
                    photoGrid.scrollTo(0, 0);
                } else {
                    // increment/scroll
                    photoGrid.scrollBy(1, 0);
                }


            }, transitionTiming)

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
            // console.log('data', data);
            // console.log('dataIndex', data[index]);
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

        // Todo figure out why this need to be reapplied everytime
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
            // console.log('push')
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


                    {(scrolling || folderKey === 'teenWall') && <MusicPlayer playlistName={folderKey} playing={scrolling}/>}


                    <div style={{display: 'flex'}}>
                        <div className={"add-btn " + (slideshowMode ? 'active' : '')} tabIndex={0} onClick={() => {toggleScrolling(false); toggleSlideshowMode(true)}}>
                            Slideshow
                        </div>


                        <div className={"add-btn " + (!slideshowMode ? 'active' : '')} tabIndex={0} onClick={() => {toggleScrolling(false); toggleSlideshowMode(false)}}>
                            Scroll
                        </div>


                        <div className={"add-btn " + (scrolling ? 'active' : '')} tabIndex={0} onClick={() => {toggleScrolling(!scrolling); }}>
                            {scrolling ? 'Stop' : 'Start'}
                        </div>
                    </div>


                </div>

        </div>
    )
};


export default PhotoShow;