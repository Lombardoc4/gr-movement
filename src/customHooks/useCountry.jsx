import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";


export default function useCountry(initialValue) {
    const [testState, setState] = useState(initialValue);
    // const location = useLocation();


    useEffect(() => {
        setState(testState + 1)

        // search for people with country and state
    }, [])

    return [testState, setState];
}