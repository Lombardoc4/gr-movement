import { Outlet } from "react-router-dom"
import { Nav } from "./Nav";
import { ScrollToTop } from "./ScrollToTop";
import { Hub } from "aws-amplify";
import { useEffect, useState } from "react";




export const Layout = () => {
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        Hub.listen('datastore', (data) => {
            if (data.payload.event === 'syncQueriesReady') {
                setDataLoading(false);
            }
          })
    })

    return (
        <>
            <Nav/>

            {/* <div style={{position: 'absolute'}}> */}
            { dataLoading ?
                <div>Loading</div>
                :
                <Outlet/>
            }
            {/* </div> */}

            <ScrollToTop/>
        </>
    )
}