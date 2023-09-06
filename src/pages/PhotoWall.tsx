import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Storage } from "aws-amplify";

import { Header } from "../components/Header";
import { PhotoContainer } from "../components/PhotoContainer";
import { ScrollToTop } from "../components/ScrollToTop";
import { useWindowScroll } from "../utils/hooks/useWindowScroll";
import { StateProps, states } from "../utils/data/states";

interface NameWallProps {
    country?: "United States" | "Canada" | "Teens";
    state?: string;
}

interface PhotoGroupProps extends StateProps {
    data: string[]
}

const photoFetch = async (country: string, state: string) => {

    console.log('country', country);
    let folder = "picture-walls/";

    if (country === "United States") {
        folder += "photoWall/";
    }
    else if (country === "Canada") {
        folder += "canadaWall/";
    }
    else if (country === "Teens") {
        folder += "teenWall/"
    }
    else if (country === "World") {
        folder += "restOfWorld/"
    }

    folder += state.toUpperCase() + "/";

    const res = await Storage.list(folder, { pageSize: 1000 });

    const newPhotos = [
        ...res.results
            .filter(({ key }) => (!key ? false : /\.(jpe?g|png)$/i.test(key)))
            .map((img) => img.key || ""),
    ];

    return newPhotos;

};


const PhotoWall = ({ country = "United States" }: NameWallProps) => {
    const toggleScroll = useWindowScroll();
    const { stateId } = useParams();
    // TODO --- Simplify
    // If state id filter state and map or just map
    const initialCountry = country === 'Teens' ? 'United States' : country;
    const initialState = stateId ? states[initialCountry].filter(s => s.id === stateId.toUpperCase()).map(s => ({...s, data : []})) : states[initialCountry].map(s => ({...s, data : []}));
    const [photos, setPhotos] = useState<PhotoGroupProps[]>(initialState);
    const [folderIndex, setFolderIndex] = useState(0);

    useEffect(() => {
        const state = photos[folderIndex];
        if (state) {
            photoFetch(country, state.id).then((res: string[]) => {
                state.data = res;
                if (res.length <= 0) setFolderIndex(folderIndex + 1);
                setPhotos([...photos.map((s, i) => i === folderIndex ? state : s)]);
            });
        }

        // If no state specific we will load more as we scroll
        if (!stateId) {
            const loadMorePhotos = () => {
                const distance = document.body.scrollHeight - (window.scrollY + window.innerHeight);
                if (distance <= 0.5) {
                    setFolderIndex(folderIndex + 1);
                }
            };

            // Add scroll event to trigger loading more
            window.addEventListener("scroll", loadMorePhotos);

            // remove scroll event
            return () => {
                window.removeEventListener("scroll", loadMorePhotos);
            };
        }
    }, [folderIndex]);

    console.log("photos", photos);

    return (
        <>
            <Header title='Drug Epidemic Photo Memorial' />

            {/* <Filters country={country} stateId={stateId} models={photos}/> */}

            <div style={{ position: "relative", marginBottom: "8em" }}>
                {/* <Filters country={country} stateId={stateId} models={photos}/> */}

                {photos.map((state, i) => {
                    if (state.data.length <= 0 || i > folderIndex) return;

                    return (
                        <Fragment key={state.name}>
                            <NameSection>
                                <h2 className='h-gradient' style={{ fontSize: "3em", gridColumn: "1/-1" }}>
                                    {state.name}
                                </h2>
                                {state.data.map((photo) => (
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

            <ScrollToTop scrollFunction={toggleScroll} />
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
