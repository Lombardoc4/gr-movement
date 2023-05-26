import { useParams } from "react-router-dom";
// import { Person } from "../utils/models";
import styled from "styled-components";
import { PhotoContainer } from "../components/PhotoContainer";
// import { Filters } from "../components/Filters";
import { usePhotos } from "../utils/hooks/usePhotos";

// const Section = styled.section`
//     padding: 2em;
//     line-height: 24px;
//     position: relative;


//     background-color: #000000;
//     color: #f1f1f1;

//     .heading {
//         height: 75px;
//         position: sticky;
//         top: calc(75px + 4em);
//         display: inline-flex;
//         align-items: center;
//         gap: 12px;
//         margin: 0 0 1em;
//         padding: 1.5em;
//         background-color: #ffffff;
//         color: #000000;
//         border-radius: 8px;
//         border: 1px solid #000000;
//     }

//     h2 {
//         font-size: 2em;
//         text-transform: uppercase;
//     }
// `;

const NameSection = styled.div`

    /* display: flex;
    justify-content: space-between;
    flex-wrap: wrap; */

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5em;
    align-items: center;
    width: 100%;

    padding: 1em 0;
    border-radius: 8px;


    .img-container {
        height: 200px;
        border-radius: 8px;
        overflow: hidden;


        display: flex;
        justify-content: center;
        align-items: center;

        img {
            /* width: 100%; */
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
    let { stateId } = useParams();

    // const people = useNames(country, stateId) as Person[];
    const photos = usePhotos(country, stateId);
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
    )
}

export default PhotoWall;