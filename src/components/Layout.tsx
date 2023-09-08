import { Outlet } from "react-router-dom";
import { Navbar } from "./Nav";
import { LocationProvider } from "../utils/hooks/LocationContext";
import { SlideshowProvider } from "../utils/hooks/SlideshowContext";

export const Layout = () => {
    return (
        <LocationProvider>
            <>
                <Navbar />

                <SlideshowProvider>
                    <Outlet />
                </SlideshowProvider>
            </>
        </LocationProvider>
    );
};
