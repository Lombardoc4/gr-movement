import { RefCallback, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Header } from "../components/Header";
import { FloatingFeatures } from "../components/FloatingFeatures";
import { StateProps, states } from "../utils/data/states";
import { Sublinks } from "../components/SubLinks";
import { CountryProps, countries } from "../utils/data/countries";
import { Storage } from "aws-amplify";
import { PhotoContainer } from "../components/PhotoContainer";
import { ErrorElement } from "./ErrorPage";
import { countryWStates } from "../utils/lib/helpers";
import { styled } from "styled-components";
import { useSlideshow } from "../utils/hooks/SlideshowContext";

interface PhotoGroupProps {
    name: string;
    id: string;
    data: string[];
}

const emptyState: StateProps = {
    name: "",
    id: "",
};

const initialPhotoArray = (country: CountryProps, state: StateProps) => {
    const dataArray: string[] = [];

    if (state.id.length > 0) return [{ ...state, data: dataArray }];
    else if (states[country.name]) {
        return states[country.name].map((s) => ({ ...s, data: dataArray }));
    } else return [{ ...country, data: dataArray }];
};

const photoFetch = async (folderName: string) => {
    const res = await Storage.list(folderName, { pageSize: 1000 });

    const newPhotos = [
        ...res.results.filter(({ key }) => (!key ? false : /\.(jpe?g|png)$/i.test(key))).map((img) => img.key || ""),
    ];

    return newPhotos;
};

export const Photos = ({ folder, countryName }: { folder: string; countryName: string }) => {
    const [folderIndex, setFolderIndex] = useState(0);

    const { stateId = "" } = useParams();
    const country = countries.find((c) => c.name === countryName) as CountryProps;
    const countryWithStates = countryWStates(countryName);
    let state: StateProps = useMemo(() => {
        if (countryWithStates)
            return states[countryName].find((s) => s.id === stateId.toUpperCase()) || emptyState;
        else
            return emptyState;
    }, [folder, stateId])


    if (stateId !== '' && state.id === '') return <ErrorElement/>

    const [photos, setPhotos] = useState<PhotoGroupProps[]>(initialPhotoArray(country, state));
    const wallTitle = state.name !== "" ? state.name : countryName;

    const observer = useRef<IntersectionObserver>();
    const lastElRef: RefCallback<HTMLElement> = useCallback(
        (el: HTMLElement) => {
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
        [folderIndex]
    );

    // Reset photos when folder changes
    useEffect(() => {
        setPhotos(initialPhotoArray(country, state));
        setFolderIndex(0);
    }, [folder, stateId]);

    useEffect(() => {
        // Next state to load photos off
        const stateFolder = photos[folderIndex];
        // console.log('folderIndex', folderIndex);

        // If there is a state fetch the photos
        if (stateFolder) {
            const subFolder = countryWithStates ? stateFolder.id : "";

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
    }, [folderIndex, photos.length]);

    return (
        <>
            <Header title='Drug Epidemic Photo Memorial'/>

            <main>
                <Sublinks
                    entries={photos.map((p) => p.name)}
                    country={country}
                    back={countryWithStates && state.id !== ""}
                >
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

const PhotoGroup = ({ photoGroup, lastElRef, last}: IPhotoGroup) => {
    const { isSlideshow } = useSlideshow();
    return (
        <PhotoSection className={'scrollerSection ' && isSlideshow ? 'slideshow' : ''} style={{ marginBottom: last ? '4rem' : 'initial'} }>
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
