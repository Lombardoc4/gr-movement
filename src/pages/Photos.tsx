import { RefCallback, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Header } from "../components/Header";
import { FloatingFeatures } from "../components/FloatingFeatures";
import { StateProps, states } from "../utils/data/states";
import { Sublinks } from "../components/SubLinks";
import { CountryProps } from "../utils/data/countries";
import { list } from "aws-amplify/storage";
import { PhotoContainer } from "../components/PhotoContainer";

import { useSlideshow } from "../utils/hooks/SlideshowContext";
import styled from "styled-components";
import { LocationEffect } from "../utils/hooks/locationEffect";
import { useLocationStore } from "../store/locationStore";

interface PhotoGroupProps {
    name: string;
    id: string;
    data: string[];
}

const initialPhotoArray = (country: CountryProps, state: StateProps) => {
    const dataArray: string[] = [];

    //
    if (state.id.length > 0) return [{ ...state, data: dataArray }];
    //
    else if (states[country.name]) {
        return states[country.name].map((s) => ({ ...s, data: dataArray }));
    }
    //
    else return [{ ...country, data: dataArray }];
};

const photoFetch = async (folderName: string) => {
    const { items } = await list({
        prefix: folderName,
        options: {
            listAll: true,
        },
    });

    const newPhotos = [
        ...items.filter(({ key }) => (!key ? false : /\.(jpe?g|png)$/i.test(key))).map((img) => img.key || ""),
    ];

    return newPhotos;
};

export const Photos = ({ folder }: { folder: string }) => {
    const country = useLocationStore((state) => state.country);
    const state = useLocationStore((state) => state.state);
    const loading = useLocationStore((state) => state.loading);
    LocationEffect();

    // Either show canada or usa sublinks
    const links = useMemo(() => {
        if (loading || state.name) return [];


        if (country.name) {
            return states[country.name]
        }
        // Other have no sublinks
        return [];
    }, [loading, country, state]);

    const [folderIndex, setFolderIndex] = useState(0);
    const [photos, setPhotos] = useState<PhotoGroupProps[]>([]);

    const wallTitle = state.name || country.name;

    const observer = useRef<IntersectionObserver>();
    const lastElRef: RefCallback<HTMLElement> = useCallback(
        (el: HTMLElement) => {
            // console.log('update final el')
            if (el) {
                // Remove existing observer
                if (observer.current) observer.current.disconnect();

                observer.current = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting && folderIndex !== photos.length - 1) {
                        setFolderIndex(folderIndex + 1);
                    }
                });

                observer.current.observe(el);
            }
        },
        [folderIndex, photos.length]
    );

    // Reset photos when folder changes
    useEffect(() => {
        if (loading) return;
        // console.log('reset')
        setPhotos(initialPhotoArray(country, state));
        setFolderIndex(0);
    }, [folder, loading, country.id, state.id]);


    //
    useEffect(() => {
        if (loading || photos.length <= 0) return;

        // Next state to load photos off
        const stateFolder = photos[folderIndex];

        // If there is a state fetch the photos
        if (stateFolder) {
            const subFolder = stateFolder.id || "";

            photoFetch(`picture-walls/${folder}/${subFolder}`).then((res: string[]) => {
                // Set data from response
                stateFolder.data = res;
                // console.log('res', res)

                // If no photos remove and dependencies will run again
                if (photos.length > 1 && res.length <= 0) {
                    setPhotos([...photos.filter((_s, i) => i !== folderIndex)]);
                } else {
                    setPhotos([...photos.map((s, i) => (i === folderIndex ? stateFolder : s))]);
                }
            });
        }
    }, [folderIndex, loading, photos.length, folder]);

    // if (stateId !== "" && state.id === "") return <ErrorElement />;

    return (
        <>
            <Header title={`Drug Epidemic ${folder === "teenWall" ? "Teen" : ""} Photo Memorial`} />

            <main>
                <Sublinks links={links}>
                    {state.id === "" ? <h2 className='h-gradient'>{wallTitle} Photo Wall</h2> : <></>}
                </Sublinks>

                <div id='scroller'>
                    {photos.map((photoGroup, i) => {
                        // If no data or folderIndex wasn't loaded yet
                        if (photoGroup.data.length <= 0 || i > folderIndex) return;

                        // console.log('last', folderIndex === i)

                        return (
                            <PhotoGroup
                                key={photoGroup.name}
                                photoGroup={photoGroup}
                                lastElRef={lastElRef}
                                last={folderIndex === i}
                            />
                        );
                    })}

                    <FloatingFeatures />
                </div>
            </main>
        </>
    );
};

interface IPhotoGroup {
    photoGroup: PhotoGroupProps;
    lastElRef: RefCallback<HTMLElement>;
    last: boolean;
}

const PhotoGroup = ({ photoGroup, lastElRef, last }: IPhotoGroup) => {
    const { isSlideshow } = useSlideshow();
    return (
        <PhotoSection
            className={"scrollerSection " && isSlideshow ? "slideshow" : ""}
            style={{ marginBottom: last ? "4rem" : "initial" }}
        >
            <h2 className='h-gradient' style={{ fontSize: "3em", gridColumn: "1/-1" }}>
                {photoGroup.name}
            </h2>

            {photoGroup.data.map((photo, photoIndex) => (
                <PhotoContainer
                    lastRef={last && photoGroup.data.length === photoIndex + 1 && lastElRef}
                    key={photo}
                    slideshow={isSlideshow}
                    folder={photo}
                />
            ))}
        </PhotoSection>
    );
};

export const PhotoSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: 150px auto;
    gap: 0 0.5rem;
    align-items: center;
    width: 100%;
    padding: 1rem 1.5rem 0;

    /* min-height: 75dvh; */

    &.slideshow {
        grid-template-columns: 1fr;
    }

    p {
        font-family: "Optima", sans-serif;
        margin: 0;
        font-size: 1.5em;
        padding-block: 0.5em;
        line-height: 1.1;
        font-weight: 700;
        text-shadow: 0 0 0.1em #ffffff;
        /* text-transform: capitalize; */
        /* text-align: center; */

        &.active {
            text-decoration: underline;
            font-size: 2em;
        }
    }

    @media screen and (min-width: 768px) {
        /* min-height: 77dvh; */
    }
`;
