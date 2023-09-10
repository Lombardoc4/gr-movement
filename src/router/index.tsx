import { Navigate, createBrowserRouter } from "react-router-dom";
import NameWall from "../pages/NameWall";
import { Layout } from "../components/Layout.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
// import PhotoWall from "../pages/PhotoWall.tsx";
import ByTheNumbers from "../pages/Numbers.tsx";
import { Photos } from "../pages/Photos.tsx";
// import HeroPage from "../pages/Heroes.tsx";
// import { HeroStyles } from "../styles/heroStyles.ts";

// const HeroRouter = createBrowserRouter([
//     {
//       path: "/",
//       element: <HeroStyles><HeroPage/></HeroStyles>,
//       errorElement: <ErrorPage/>,
//     },
// ]);

const PhotoWallRoutes = [
    // Canada
    {
        path: "can",
        //   errorElement:
        children: [
            {
                index: true,
                element: <Photos folder='canadaWall' countryName="Canada" />,
            },
            {
                path: ":stateId",
                element: <Photos folder='canadaWall' countryName="Canada"/>,
            },
        ],
    },
    // Teens USA
    {
        path: "teens",
<<<<<<< HEAD
        element: <PhotoWall country='Teens' />,
    },
    {
        path: "teens/:stateId",
        element: <PhotoWall country='Teens' />,
=======
        element: <Photos folder='teenWall'  countryName="United States"/>,
    },
    {
        path: "teens/:stateId",
        element: <Photos folder='teenWall'  countryName="United States" />,
    },
    // Rest of the World
    {
        path: "world",
        element: <Photos folder='restOfWorld' countryName="Worldwide" />,
>>>>>>> dev
    },
    // USA
    {
        index: true,
        element: <Photos folder="photoWall"  countryName="United States" />,
    },
    {
        path: ":stateId",
        element: <Photos folder='photoWall'  countryName="United States" />,
    },
];

const WallRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            // Worldwide
            {
                index: true,
                element: <NameWall />,
            },
            { path: "numbers", element: <ByTheNumbers /> },
            {
                path: "photo",
                element: <Navigate to='/photos' replace />,
            },
            {
                path: "photo/can",
                element: <Navigate to='/photos/can' replace />,
            },
            {
                path: "photos/",
                children: PhotoWallRoutes,
            },
            {
                path: ':params',
                element: <NameWall />,
            },
            {
                path: ':params/*',
                element: <NameWall />,
            },
        ],
    },
]);

const APPS = [
    // {
    //     subdomain: "heroes",
    //     router: HeroRouter,
    //     main: false,
    // },
    {
        subdomain: "wall",
        router: WallRouter,
        main: true,
    },
];

// const getSubdomain = (hostname: string) => {
//     const hostnameParts = hostname.split(".");
//     let sliceIndex = -2;

//     const isLocalhost = hostnameParts.slice(-1)[0] === "localhost";
//     if (isLocalhost) sliceIndex = -1;

//     return hostnameParts.slice(0, sliceIndex).join("");
// };

export const router = () => {
    const main = APPS.find((app) => app.main);
    // const subdomain = getSubdomain(window.location.hostname);

    // const subApp = APPS.find((app) => subdomain === app.subdomain);

    if (!main) throw new Error("Must have main app");
    return main.router

    // if (subdomain === "" || !subApp) return main.router;

    // return subApp.router;
};
