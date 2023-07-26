import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Storage } from "aws-amplify";

import { Header } from "../components/Header";
import { PhotoContainer } from "../components/PhotoContainer";
import { ScrollToTop } from "../components/ScrollToTop";
import { useWindowScroll } from "../utils/hooks/useWindowScroll";
import { states } from "../utils/data/states";

interface NameWallProps {
    country?: "United States" | "Canada";
    state?: string;
}

const PhotoWall = ({ country = "United States" }: NameWallProps) => {
    const [isScrolling, setIsScrolling] = useWindowScroll();

    const [folderIndex, setFolderIndex] = useState(-1);
    const [photos, setPhotos] = useState<string[][]>([]);

    // urlParams
    const { stateId } = useParams();

    const photoFetch = async (country: string, state: string) => {
        let folder = "picture-walls/";

        if (country === "United States") {
            folder += "photoWall/";
        }
        if (country === "Canada") {
            folder += "canadaWall/";
        }

        folder += state.toUpperCase() + "/";

        const res = await Storage.list(folder, { pageSize: 1000 });

        console.log("res", [state, folderIndex, res]);
        const newPhotos = [
            ...res.results
                .filter(({ key }) => (!key ? false : /\.(jpe?g|png)$/i.test(key)))
                .map((img) => img.key || ""),
        ];

        if (newPhotos.length <= 0) setFolderIndex(folderIndex + 1);
        setPhotos([...photos, newPhotos]);
    };

    useEffect(() => {
        if (stateId) {
            photoFetch(country, stateId);
            return;
        }

        const state = states[country][folderIndex];
        // console.log('state', state, folderIndex);

        const loadMorePhotos = () => {
            const distance = document.body.scrollHeight - (window.scrollY + window.innerHeight);
            if (distance <= 0.5) {
                setFolderIndex(folderIndex + 1);
            }
        };

        // Add scroll event to trigger loading more
        window.addEventListener("scroll", loadMorePhotos);

        if (state) {
            photoFetch(country, state.id);
        }

        // remove scroll event
        return () => {
            // console.log('reset scroll event')
            window.removeEventListener("scroll", loadMorePhotos);
        };
    }, [folderIndex]);

    console.log("photos", photos);

    return (
        <>
            <Header title='Drug Epidemic Photo Memorial' />

            {/* <Filters country={country} stateId={stateId} models={photos}/> */}

            <div style={{ position: "relative", marginBottom: "8em" }}>
                {/* <Filters country={country} stateId={stateId} models={photos}/> */}

                {/* { Object.keys(entries).map(entryGroup => { */}
                {/* return ( */}
                {/* <Section key={entryGroup} className="container"> */}
                {photos.map((statePhotos, i) => {
                    if (statePhotos.length <= 0) return;

                    return (
                        <Fragment key={states[country][i].name}>
                            <NameSection>
                                <h2 className='h-gradient' style={{ fontSize: "3em", gridColumn: "1/-1" }}>
                                    {states[country][i].name}
                                </h2>
                                {statePhotos.map((photo) => (
                                    <PhotoContainer
                                        key={photo}
                                        imgUrl={`https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com/public/${photo}`}
                                    />
                                ))}
                            </NameSection>
                        </Fragment>
                    );
                })}
                {/* </Section> */}
                {/* ) */}
                {/* })} */}
            </div>

            <ScrollToTop scrollFunction={() => setIsScrolling(!isScrolling)} />
        </>
    );
};

const NameSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5em;
    align-items: center;
    width: 100%;

    padding: 1.5em;
    border-radius: 8px;
    margin-bottom: 2em;

    .img-container {
        border-radius: 0.5em;
        overflow: hidden;

        display: flex;
        justify-content: center;
        align-items: center;

        img {
            height: 100%;
            object-fit: cover;
        }
    }

    p {
        font-family: "Optima", sans-serif;
        margin: 0;
        padding: 0.25em 0.5em;
        font-size: 24px;
        font-weight: 700;

        &.active {
            text-decoration: underline;
            font-size: 28px;
        }
    }

    @media screen and (min-width: 1200px) {

    }
`;

export default PhotoWall;
