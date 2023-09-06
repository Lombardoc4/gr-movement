import { Navigate, createBrowserRouter } from "react-router-dom";
import NameWall from "../pages/NameWall";
import { DataStore, Predicates } from "aws-amplify";
import { Person } from "../utils/models/index";
import { Layout } from "../components/Layout.tsx";
import { states } from "../utils/data/states.ts";
import { countries } from "../utils/data/countries.ts";
import ErrorPage from "../pages/ErrorPage.tsx";
import PhotoWall from "../pages/PhotoWall.tsx";
import ByTheNumbers from "../pages/Numbers.tsx";
import HeroPage from "../pages/Heroes.tsx";

const getWorldwideData = async () => {
    return await DataStore.query(Person, Predicates.ALL, { limit: 10000 });
};

const getData = async (country: string, province?: string) => {
    if (province && (country === "United States" || country === "Canada")) {
        const state = states[country].find((val) => val.id.toLowerCase() === province);
        if (state) {
            return await DataStore.query(Person, (p) => p.state.eq(state.name), { limit: 10000 });
        }
    } else {
        return await DataStore.query(Person, (p) => p.country.eq(country), { limit: 10000 });
    }
};

const HeroRouter = createBrowserRouter([
    {
      path: "/",
      element: <HeroPage/>,
      errorElement: <ErrorPage/>,
    },
]);

const PhotoWallRoutes = [
    // Worldwide
    {
        index: true,
        element: <PhotoWall />,
    },
    // Canada
    {
        path: "can",
        //   errorElement:
        children: [
            {
                index: true,
                element: <PhotoWall country='Canada' />,
            },
            {
                path: ":stateId",
                element: <PhotoWall country='Canada' />,
            },
        ],
    },
    // Teens USA
    {
        path: "teens",
        element: <PhotoWall country='Teens' />,
    },
    {
        path: "teens/:stateId",
        element: <PhotoWall country='Teens' />,
    },
    // USA
    {
        path: ":stateId",
        element: <PhotoWall country='United States' />,
    }
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
                loader: getWorldwideData,
                element: <NameWall country='Worldwide' />,
            },
            { path: "numbers", element: <ByTheNumbers /> },
            // Canada
            {
                path: "can",
                children: [
                    {
                        index: true,
                        loader: () => getData("Canada"),
                        element: <NameWall country='Canada' />,
                    },
                    {
                        path: ":stateId",
                        loader: async ({ params }) => {
                            return getData("Canada", params.stateId);
                            // throw new Response("Not Found", { status: 404 });
                        },
                        element: <NameWall country='Canada' />,
                    },
                ],
            },
            // USA
            {
                path: "usa",
                children: [
                    {
                        index: true,
                        loader: () => getData("United States"),
                        element: <NameWall country='United States' />,
                    },
                    {
                        path: ":stateId",
                        loader: async ({ params }) => {
                            return getData("United States", params.stateId);
                            // throw new Response("Not Found", { status: 404 });
                        },
                        element: <NameWall country='United States' />,
                    },
                ],
            },
            // Other Country
            {
                path: ":countryId",
                loader: async ({ params }) => {
                    // get country data
                    const country = countries.find((val) => val.id.toLowerCase() === params.countryId);
                    if (country) {
                        return getData(country.name);
                    }
                    throw new Response("Not Found", { status: 404 });
                },
                element: <NameWall />,
            },
        ],
    },
    {
        path: "photo",
        element: <Navigate to='/photos' replace />,
    },
    {
        path: "photo/can",
        element: <Navigate to='/photos/can' replace />,
    },
    {
        path: "/photos/",
        element: <Layout />,
        children: PhotoWallRoutes,
    },
]);

const APPS = [
    {
        subdomain: "heroes",
        router: HeroRouter,
        main: false,
    },
    {
        subdomain: "wall",
        router: WallRouter,
        main: true,
    },
];

const getSubdomain = (hostname: string) => {
    const hostnameParts = hostname.split(".");
    let sliceIndex = -2;

    const isLocalhost = hostnameParts.slice(-1)[0] === "localhost";
    if (isLocalhost) sliceIndex = -1;

    return hostnameParts.slice(0, sliceIndex).join("");
};

export const router = () => {
    const main = APPS.find((app) => app.main);
    const subdomain = getSubdomain(window.location.hostname);

    const subApp = APPS.find((app) => subdomain === app.subdomain);

    if (!main) throw new Error("Must have main app");

    if (subdomain === "" || !subApp) return main.router;

    return subApp.router;
};
