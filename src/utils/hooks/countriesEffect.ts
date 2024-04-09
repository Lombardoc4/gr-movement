// import { useEffect } from "react";
// import { useCountriesStore } from "../../store/countriesStore";
// import { fetchCountries } from "../api/fetchCountries";

// export const countriesEffect = () =>  {
//     const countries = useCountriesStore((state) => state.countries);
//     const updateCountries = useCountriesStore((state) => state.updateCountries);
//     useEffect(() => {
//         if (!countries) {
//             fetchCountries().then((countries) => updateCountries(countries));
//         }
//     }, [countries, updateCountries]);

// }
