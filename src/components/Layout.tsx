import { Outlet } from "react-router-dom"
import { Nav } from "./Nav";
import { ScrollToTop } from "./ScrollToTop";


export const Layout = () => {

    return (
        <>
            <Nav/>

            {/* <div style={{position: 'absolute'}}> */}
                <Outlet/>
            {/* </div> */}

            <ScrollToTop/>
        </>
    )
}