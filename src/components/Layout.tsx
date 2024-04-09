import { Outlet } from "react-router-dom";
import { Navbar } from "./Nav";
import { SlideshowProvider } from "../utils/hooks/SlideshowContext";

export const Layout = () => {
    return (
            <>
                <Navbar />

                <SlideshowProvider>
                    <Outlet />
                </SlideshowProvider>
            </>
    );
};
