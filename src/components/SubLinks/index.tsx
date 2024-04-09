import { Link } from "react-router-dom";
import { CountryProps, countries } from "../../utils/data/countries";
import { states, StateProps } from "../../utils/data/states";
import { useNameWallStore } from "../../store/nameWallStore";
import { useLocationStore } from "../../store/locationStore";


const BackButton = <Link className="btn" style={{maxWidth: '300px'}} to={`..`}>Back</Link>;


export const Sublinks = ({ links, children }: { links?: CountryProps[] | StateProps[], children?: JSX.Element }) => {
    const country = useLocationStore((state) => state.country);
    const state = useLocationStore((state) => state.state);
    const sublinks = useNameWallStore((state) => state.sublinks);

    // Handle predefined links

    // Map sublinks to get country or state objects
    const linkObjs = links || sublinks.map(link => {
        // If state no sublinks
        if (state.id && !states[country.name]) {
            return null
        } else if (states[country.name]) {
            return states[country.name].find((s) => s.name === link);
        }
        return countries.find((c) => c.name === link);
    });


    return (
        <div className='container' style={{ marginBottom: "2rem" }}>

            {children}

            {country.name !== "Worldwide" && BackButton}

            {(linkObjs && linkObjs.length > 0) &&
              <>
                    <h3>View these {country.name === "Worldwide" ? "countries" : "states"} in more detail: </h3>

                    <div className='list'>
                        {linkObjs.map((pLink) => (
                            pLink && <Link className='btn' key={pLink.id} to={pLink.id.toLowerCase()}>
                                {pLink.name}
                            </Link>
                        ))}
                    </div>
                </>
            }
        </div>
    );
};