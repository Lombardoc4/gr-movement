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
    element: <PhotoWall country="Worldwide"/>,
  },
  // Canada
  {
    path: "can",
  //   errorElement:
      children: [
          {
              index: true,
              element: <PhotoWall country="Canada"/>,
          },
          {
              path: ":stateId",
              element: <PhotoWall country="Canada"/>,
          }

      ]
  },
  // USA
  {
    path: "usa",
  //   errorElement:
      children: [
          {
              index: true,
              element: <NameWall country="United States"/>,
          },
          {
              path: ":stateId",
              element: <PhotoWall country="United States"/>,
          }

      ]
  },
  // Other
  {
    path: ":countryId",
      element: <PhotoWall/>,
  },
]

const WallRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorPage/>,
      children: [
          // Worldwide
          {
            index: true,
            loader: async () => {
              return await DataStore.query(Person, Predicates.ALL, {limit: 10000});
            },
            element: <NameWall country="Worldwide"/>,
          },
          { path: "numbers",
            element: <ByTheNumbers/>
          },
          // Canada
          {
            path: "can",
          //   errorElement:
              children: [
                  {
                      index: true,
                      loader: async () => {
                        return await DataStore.query(
                          Person,
                          (p) => p.country.eq('Canada'),
                          {limit: 10000}
                          );
                        },
                      element: <NameWall country="Canada"/>,
                  },
                  {
                      path: ":stateId",
                      loader: async ({params}) => {
                        if (params.stateId) {
                          // get state values
                          const state = states['Canada'].find(val => val.id.toLowerCase() === params.stateId);

                          // return state;
                          if (state) {
                            return await DataStore.query(
                              Person,
                              (p) => p.state.eq(state.name),
                              {limit: 10000}
                            );
                          }

                        }

                        throw new Response("Not Found", { status: 404 });
                      },
                      element: <NameWall country="Canada"/>,
                  }

              ]
          },
          // USA
          {
            path: "usa",
          //   errorElement:
              children: [
                  {
                      index: true,
                      loader: async () => {
                        return await DataStore.query(
                          Person,
                          (p) => p.country.eq('United States'),
                          {limit: 10000}
                          );
                        },
                      element: <NameWall country="United States"/>,
                  },
                  {
                      path: ":stateId",
                      loader: async ({params}) => {
                        if (params.stateId) {
                          // get state values
                          const state = states['United States'].find(val => val.id.toLowerCase() === params.stateId);

                          // return state;
                          if (state) {
                            return await DataStore.query(
                              Person,
                              (p) => p.state.eq(state.name),
                              {limit: 10000}
                            );
                          }

                        }

                        throw new Response("Not Found", { status: 404 });
                      },
                      element: <NameWall country="United States"/>,
                  }

              ]
          },
          // Other
          {
            path: ":countryId",
              loader: async ({params}) => {
                if (params.countryId) {
                  // get state values
                  const country = countries.find(val => val.id.toLowerCase() === params.countryId);

                  // return state;
                  if (country) {
                    return await DataStore.query(
                      Person,
                      (p) => p.country.eq(country.name),
                      {limit: 10000}
                    );
                  }

                  throw new Response("Not Found", { status: 404 });

                }
              },
              element: <NameWall/>,
          },
          // Photos
          {
            path: "photo",
            element: <Navigate to="/photos" replace/>
          },
          {
            path: "/photos",
            children: PhotoWallRoutes
          },
      ]
    },
    
  ]);

  
const APPS = [
    {
        subdomain: 'heroes',
        router: HeroRouter,
        main: false
    },
    {
        subdomain: 'wall',
        router: WallRouter,
        main: true
    }
]

const getSubdomain = (hostname: string) => {
    const hostnameParts = hostname.split(".")
    let sliceIndex = -2;

    const isLocalhost = hostnameParts.slice(-1)[0] === 'localhost';
    if (isLocalhost) sliceIndex = -1;

    return hostnameParts.slice(0, sliceIndex).join("");
}

export const router = () => {
    const main = APPS.find(app => app.main);
    const subdomain = getSubdomain(window.location.hostname);
    const subApp = APPS.find((app) => subdomain === app.subdomain)
    
    console.log('subdomain', subdomain);

    if ( !main ) throw new Error ('Must have main app');

    if ( subdomain === "" || !subApp ) return main.router;

    return subApp.router;
}
