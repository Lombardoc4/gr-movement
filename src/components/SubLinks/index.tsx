import { Link, useNavigate } from "react-router-dom";
import { CountryProps, countries } from "../../utils/data/countries";
import { states, StateProps } from "../../utils/data/states";
import { useNameWallStore } from "../../store/nameWallStore";
import { useLocationStore } from "../../store/locationStore";
import { useMemo } from "react";


const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Link
            className='btn'
            style={{ maxWidth: "300px" }}
            to={`..`}
            onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}
        >
            Back
        </Link>
    );
}


export const Sublinks = ({ links, children }: { links?: CountryProps[] | StateProps[], children?: JSX.Element }) => {
    const country = useLocationStore((state) => state.country);
    const state = useLocationStore((state) => state.state);
    const sublinks = useNameWallStore((state) => state.sublinks);
    const photoWall = useLocationStore((state) => state.photo);

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

    const BackLink = useMemo(() => <BackButton/>, [country, state]);


    return (
        <div className='container' style={{ marginBottom: "2rem" }}>

            {children}

            {(photoWall || country.name !== "Worldwide") && BackLink}

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