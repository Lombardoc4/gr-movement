import { Outlet } from "react-router-dom"
import { Nav } from "./Nav";

export const Layout = () => {


    return (
        <>
            <Nav/>

            {/* <div style={{position: 'absolute'}}> */}
            
                <Outlet/>
            {/* </div> */}


        </>
    )
}