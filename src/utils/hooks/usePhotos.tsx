import { useEffect, useState } from "react"
// import { states } from '../data/states';
import { Storage } from 'aws-amplify';


export const usePhotos = (country: string, state?: string) => {
    const [photos, setPhotos] = useState<string[]>([]);
    const [nextToken, setNextToken] = useState('start');

    useEffect(() => {
        if (!nextToken) {
            return;
        }


        const getData = async () => {
            let folder = 'picture-walls/';
            if (country === 'United States') {
                folder += 'photoWall/'


            }
            else if (country === 'Canada') {
                folder += 'canadaWall'
            }

            if (state) {
                folder += (state + '/')
            }

            let res = await Storage.list(folder,
                {
                    pageSize: 1000,
                    nextToken: nextToken === 'start' ? undefined : nextToken
                });

            // Filter images
            const images = res.results.filter(({key}) => !key ? false : (/\.(jpe?g|png)$/i).test(key)).map(img => img.key || '');
            // Set Images
            setPhotos([...photos, ...images]);

            // Check for nextToken
            if (res.nextToken) {
                // Set nextToken
                setNextToken(res.nextToken)
            }


        }

        getData();

    }, [nextToken])

    // let query = ((p:any) => p);
    // if (state && (country === 'United States' || country === 'Canada')) {
    //     const stateName = states[country].find(s => s.id.toLowerCase() === state)?.name;
    //     if (stateName) {
    //         query = ((p:any) => p.state.eq(stateName));
    //     }

    // } else if (country !== 'Worldwide') {
    //     query = ((p:any) => p.country.eq(country));
    // }

    // console.log('country', country)

    // useEffect(() => {
    //     Storage.list('photoWall/' + (state ? `${state}/` : '') + '')
    //         .then((res) => console.log('res', processStorageList(res)))
    //         .catch((err) => console.log(err));

    // }, [])


    return photos;
}
