import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PhotoContainer } from "../components/PhotoContainer";
import { usePhotos } from "../utils/hooks/usePhotos";
import { Header } from "../components/Header";
import { ScrollToTop } from "../components/ScrollToTop";
import { useWindowScroll } from "../utils/hooks/useWindowScroll";
import { countries } from "../utils/data/countries";


const NameSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5em;
    align-items: center;
    width: 100%;

    padding: 1em 0;
    border-radius: 8px;


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
        font-family: 'Optima', sans-serif;
        margin: 0;
        padding: 0.25em 0.5em ;
        font-size: 24px;
        font-weight: 700;

        &.active {
            text-decoration: underline;
            font-size: 28px;
        }
    }
    
    @media screen and (min-width: 768px) {
        .img-container {
            height: 200px;
        }
    }
`;


interface NameWallProps {
    country?: string,
    state?: string,
}

// interface GroupedPeople {
//     [key: string]: Person[]
// }

// const parseData = (items: Person[]) => {

//     const sortedModels = items.sort((a,b) => (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0))

//     // Use inverse of above to remove duplicates
//     const filteredModels = sortedModels.filter((item, index) => {
//         if (!item.imgUrl) {
//             return false;
//         }

//         // HEFTY COMPARING Every element to every element
//         return !items.find((other, otherIndex) => item.firstName === other.firstName && item.lastName === other.lastName && index !== otherIndex && item.foreverAge === other.foreverAge && item.state === other.state)
//     })



//     return filteredModels;
// }

// const groupData = (items: Person[], filterBy: string) => {
//     const groupByCountry: GroupedPeople = items.reduce((acc: GroupedPeople , cur : Person) => {

//         const { country, state } = cur;

//         let key: string;

//         if (!country || !state) {
//             return acc;
//         }

//         key = filterBy === 'state' ? state : country;


//         if (!acc[key]) {
//             acc[key] = []
//         }

//         acc[key].push(cur);

//         return acc;

//     }, {})

//     if (filterBy === 'state') {
//         return Object.keys(groupByCountry).sort().reduce( (obj: GroupedPeople, key: string) => {
//             obj[key] = groupByCountry[key];
//             return obj;
//         }, {} );
//     }

//     return groupByCountry;
// }




const PhotoWall = ({country = 'Worldwide'}:NameWallProps) => {
    // const loadData = useLoaderData() as Person[];
    
    // urlParams
    const { countryId, stateId } = useParams();
    
    // If there's a countryId params if no country default to Worldwide
    if (countryId) {
        // Set to matching country or  worldwide if no matching
        country = countries.find(c => c.id.toLowerCase() === countryId)?.name || "Worldwide";
    }

    // const people = useNames(country, stateId) as Person[];
    const photos = usePhotos(country, stateId);
    const [ isScrolling, setIsScrolling ] = useWindowScroll();
    // const [models, setModels] = useState(photos)
    // const [entries, setEntries] = useState(groupData(models, country !== 'Worldwide' ? 'state': 'country'))

    // console.log('photos', photos);

    // // Parse Data Everytime loadData updates from Router
    // useEffect(() => {
    //     const newModels = parseData(loadData);

    //     if (newModels.length !== models.length) {
    //         setModels(newModels);
    //         setEntries(groupData(newModels, country !== 'Worldwide' ? 'state': 'country'));
    //     }
    // }, [loadData])

    // Parse Data Everytime people updates from DataStore subscription
    // useEffect(() => {
    //     const newModels = parseData(people);

    //     if (newModels.length > 0 && newModels.length !== models.length) {
    //         setModels(newModels);
    //         setEntries(groupData(newModels, country !== 'Worldwide' ? 'state': 'country'));
    //     }
    // }, [people])




    return (
        
        <>
        <Header title="Drug Epidemic Photo Memorial"/>
        
        {/* <Filters country={country} stateId={stateId} models={photos}/> */}
        
        <div style={{position: 'relative'}}>

            {/* <Filters country={country} stateId={stateId} models={photos}/> */}

            {/* { Object.keys(entries).map(entryGroup => { */}
                {/* return ( */}
                    {/* <Section key={entryGroup} className="container"> */}
                    <NameSection>
                        { photos.map(photo => <PhotoContainer imgUrl={`https://gr-movement-storage-e48b8b36191308-staging.s3.amazonaws.com/public/${photo}`}/> )}
                    </NameSection>
                    {/* </Section> */}
                    {/* ) */}
                {/* })} */}

        </div>
        
        <ScrollToTop
            scrollFunction={() => setIsScrolling(!isScrolling)}
        />
        </>
    )
}

export default PhotoWall;