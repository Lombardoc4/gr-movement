import { useEffect, useState } from "react";
import { states } from "../data/states";
import { countries } from "../data/countries";
import { useLocation } from "react-router-dom";

const getCountryInfo = (countryId) => countries.find(c => c.id === (countryId || ''))

const getStateInfo = (countryName, stateId) => states[countryName].find(c => c.id.toLowerCase() === (stateId))

const useURLParams = () => {
    const {pathname} = useLocation();
    const [ country, setCountry] = useState({
        id: "",
        name : "Worldwide"
    });
    const [ state, setState] = useState({
        id: "",
        name : ""
    });

    useEffect(() => {
        const [countryParam, stateParam] = pathname.split('/').filter(c => c !== '');
        const countryVal = getCountryInfo(countryParam);


        const stateVal = stateParam && getStateInfo(countryVal.name, stateParam);


        if (countryVal && stateVal)
            setCountry(countryVal);

        if (stateVal)
            setState(stateVal);

    }, [pathname])

  return { country: country, state: state};
}
export default useURLParams;