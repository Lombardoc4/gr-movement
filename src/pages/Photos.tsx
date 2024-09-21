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
import { PhotoLocationEffect } from "../utils/hooks/locationEffect";
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
            // pageSize: 10,
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
    const locationLoading = useLocationStore((state) => state.loading);
    PhotoLocationEffect();

    const [photoLoading, setPhotoLoading] = useState(false);
    const [folderIndex, setFolderIndex] = useState(0);
    const [photos, setPhotos] = useState<PhotoGroupProps[]>([]);

    const wallTitle = state.name || country.name;

    const observer = useRef<IntersectionObserver>();
    const lastElRef: RefCallback<HTMLElement> = useCallback(
        (el: HTMLElement) => {
            if (el) {
                // Remove existing observer
                if (observer.current) observer.current.disconnect();

                observer.current = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting && folderIndex !== photos.length - 1) {
                        setFolderIndex(folderIndex + 1);
                        setPhotoLoading(true);
                    }
                }, {
                    rootMargin: `0px 0px 250px 0px`,
                });

                observer.current.observe(el);
            }
        },
        [folderIndex, photos.length]
    );

    // Either show canada or usa sublinks
    const links = useMemo(() => {
        if (locationLoading || state.name) return [];


        if (country.name) {
            return states[country.name]
        }
        // Other have no sublinks
        return [];
    }, [locationLoading, country, state]);



    // Reset photos when country or state change
    useEffect(() => {
        if (locationLoading) return;

        setFolderIndex(0);
        setPhotos(initialPhotoArray(country, state));
        // Since we have initial array being fetching photos
        setPhotoLoading(true);
    }, [locationLoading, country.id, state.id]);


    // Fetch photos
    useEffect(() => {
        // If location loading or photos not ready to fetch return
        if (locationLoading || !photoLoading) return;

        // Get index of initialPhotoArray
        // ex: {name: 'Arizona', id: 'AZ', data: []}
        const fetchSubState = photos[folderIndex];

        // Confirm stateFolder exists and has no data
        if (fetchSubState && fetchSubState.data.length <= 0) {

            photoFetch(`picture-walls/${folder}/${fetchSubState.id}`).then((res: string[]) => {
                // update substate data with fetched photos
                fetchSubState.data = res;

                // If no photos remove subState from photos State
                if (photos.length > 1 && res.length <= 0) {
                    setPhotos([...photos.filter((_s, i) => i !== folderIndex)]);
                }
                // Else append new photos to photos State at folderIndex
                else {
                    setPhotos([...photos.map((s, i) => (i === folderIndex ? fetchSubState : s))]);
                    setPhotoLoading(false);
                }
            });
        }
    }, [folderIndex, photoLoading, locationLoading]);

    return (
        <>
            <Header title={`Drug Epidemic ${folder === "teenWall" ? "Teen" : ""} Photo Memorial`} />

            <main>
                <Sublinks links={links}>
                    {state.id === "" ? <h2 className='h-gradient'>{wallTitle} Photo Wall</h2> : <></>}
                </Sublinks>

                {(photos.length !== 0 &&photos[0].data.length <= 0 && folderIndex === 0) && (
                    <div
                        className='container'
                        style={{ minHeight: "200px", textAlign: "center", placeItems: "center" }}
                    >
                        No Photos Available
                    </div>
                )}
                <div id='scroller'>
                    {photos.map((photoGroup, i) => {
                        // If no data or folderIndex wasn't loaded yet
                        if (photoGroup.data.length <= 0 || i > folderIndex) return;

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

    // Need to figure out if this element is in view
    const [inView, setInView] = useState(false);
    const observer = useRef<IntersectionObserver>();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            observer.current = new IntersectionObserver(([entry]) => {
                setInView(entry.isIntersecting);
            }, {
                rootMargin: `250px 0px 250px 0px`,
            });

            observer.current.observe(containerRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, []);



    return (
        <PhotoSection
            ref={containerRef}
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
                            folder={inView && photo}
                        />
                    )
                )}
        </PhotoSection>
    );
};

export const PhotoSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: 150px auto;
    gap: 0 0.5rem;
    align-items: center;
    width: 100%;
    padding: 1rem 1.5rem 0;

    /* min-height: 75dvh; */

    &.slideshow {
        grid-template-columns: 1fr;
    }

    @media screen and (min-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
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
