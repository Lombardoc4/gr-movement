import { Link } from "react-router-dom";
import { countryWStates } from "../../utils/lib/helpers";
import { CountryProps, countries } from "../../utils/data/countries";
import { states, StateProps } from "../../utils/data/states";

const pageLinks = (entries: string[], country: CountryProps) => {
    return entries
    .map((e: string) => {
            if (countryWStates(country.name) && states[country.name].find((s) => s.name === e)) {
                // Get State ids
                return states[country.name].find((s) => s.name === e);
            } else if (countries.find((c) => c.name === e)) {

                // Get Country id
                return countries.find((c) => c.name === e);
            }

        }) // Remove undefined
        .filter((val): val is StateProps | CountryProps => val !== undefined);
};

const BackButton = <Link className="btn" style={{maxWidth: '300px'}} to={`..`}>Back</Link>;


export const Sublinks = ({ entries, country, back = false, children }: { entries: string[]; country: CountryProps, back?: boolean, children?: JSX.Element }) => {
    const links = pageLinks(entries, country);

    if (entries.length <= 0) return <></>;

    return (
        <div className='container' style={{ marginBottom: "2rem" }}>

            {children}

            {back && country.name !== "Worldwide" && BackButton}

            {links.length > 1 && (
                <>
                    <h3>View these {country.name === "Worldwide" ? "countries" : "states"} in more detail: </h3>

                    <div className='list'>
                        {links.map((pLink) => (
                            <Link className='btn' key={pLink.id} to={pLink.id.toLowerCase()}>
                                {pLink.name}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};