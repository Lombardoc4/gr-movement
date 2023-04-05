
import { Storage } from "aws-amplify";
import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { StaticMenu } from "../components/Menu";
import MusicPlayer from "../components/MusicPlayer";

import { states } from "../data/states";
import './index.scss'

let scrollID;

const getS3Data = async (folderKey, id) => {
    const url = folderKey + '/' + id + '/';

    return Storage.list(url, { pageSize: 1000 }) // for listing ALL files without prefix, pass '' instead
        .then(({results}) => {
            // prune folders
            results = results.filter(({key}) => {
                if (key.includes('.jpg'))
                    return true;
                else if (key.includes('.jpeg'))
                    return true;
                else if (key.includes('.png'))
                    return true;
                else
                    return false;
            });

            return results;

        })
        .catch(err => console.log(err));
}

const alphabetizedNames = (peopleList) => {
    return peopleList.map((person) => ({...person, name: person.key.toUpperCase().replace('-', ' ')})).sort((a, b) => a.name.localeCompare(b.name))
}

const PhotoShow = ({folderKey, country = 'United States'}) => {
    const [menuOpen, toggleMenu] = useState(false);
    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);

    const [slideshowMode, toggleSlideshowMode] = useState(false);
    //Scroll Status
    const [scrolling, toggleScrolling] = useState(false);

    const navigate = useNavigate();
    const photoshow = useRef(null);
    const {id} = useParams();


    useEffect(() => {
        const getMultiData = async () => {
            const vals = []

            // alphabetical order
            const alphaStates = states[country].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))

            // Make a call for each state returns a promise
            const promises = alphaStates.map(async (state) => {
                const result = await getS3Data(folderKey, state.id);
                return result.length > 0 ? alphabetizedNames(result) : [];
                // return result;
            })

            Promise.all(promises).then(values => {
                // push values that are length > 0
                values.map(v => v.length >= 1 && vals.push(...v));

                setData([...data,...vals]);
            })
        }

        const getSingleData = async () => {
            const result = await getS3Data(folderKey, id.toUpperCase());
            if (result.length <= 0) {
                navigate('/photos')

                // No images and redirect
            } else {

                setData(alphabetizedNames(result));
            }
        }

        if (id) {
            getSingleData();
        } else {
            getMultiData();
        }

    }, [id])


    // Transitions
    useEffect(() => {
        if (!scrolling) {
            clearInterval(scrollID);
            return;
        }

        const transitionTiming = slideshowMode ? 3000 : 15;
        const photoGrid = photoshow.current;
        const startScroll = () => {

            let id = setInterval(() => {
                if (photoGrid.offsetWidth + photoGrid.scrollLeft >= photoGrid.scrollWidth) {
                    photoGrid.scrollTo(0, 0); // Reset
                } else {
                    photoGrid.scrollBy(1, 0); //Scroll/Increment
                }
            }, transitionTiming)
            return id;
        }

        if (photoGrid) {
            scrollID = startScroll();
        }

    }, [scrolling])


    const pushImageToState = () => {
        const newImages = [];
        let count = 0;
        const countLimit = data.length - images.length >= 10 ? 10 : data.length - images.length;
        // const countLimit = data.length;


        while (count < countLimit) {
            const index = images.length + count;
            newImages.push(
                <div key={data[index].key} className="img-container">
                    <img
                     alt={data[index].name}
                     src={`https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com/public/${data[index].key}`}
                     />
                </div>
            )
            count++;
        }


        setImages([...images, ...newImages]);

        return count;
    }


    useEffect(() => {
        // Todo figure out why this need to be reapplied everytime
        if (images.length > 0) {

            const windowWidth = window.innerWidth;

            photoshow.current.addEventListener('scroll', function() {
                const scrollFullScreenWidth = this.scrollLeft % windowWidth >= windowWidth - 30 || this.scrollLeft % windowWidth <= 30;

                if (scrollFullScreenWidth && data.length > images.length) {

                    // Make smaller containers of 10 images that load on scroll?
                    pushImageToState();
                }

            })
        }

    }, [images])


    useEffect(() => {
        data.length > 0 && pushImageToState();
    }, [data])



    return (
        <div className="photo-bg">

            <div
                ref={photoshow}
                id="photoshow"
                className={"grid " + (menuOpen ? 'grid-slideRight' : '' ) + ' ' + (slideshowMode ? 'slideshow ' : '')}
            >
                { images }
            </div>

            <div className={(menuOpen ? 'open' : '') + " menu"}>
                <StaticMenu>
                    <Link className="add-btn" to="/">Global Memorial Wall</Link>
                </StaticMenu>
            </div>

            <div className="floating">

                    <div
                        className="add-btn"
                        tabIndex={0}
                        onClick={() => toggleMenu(!menuOpen)}
                    >
                        Menu
                    </div>


                    {(scrolling && folderKey !== 'canadaWall' || folderKey === 'teenWall') && <MusicPlayer playlistName={folderKey} playing={scrolling}/>}

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