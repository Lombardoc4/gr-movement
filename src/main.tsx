
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";

import ReactGA from "react-ga4";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
import { GlobalStyles } from "./styles/GlobalStyles.ts";

import "./styles/index.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

Amplify.configure(config);

ReactGA.initialize("G-H2JTF53YES");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <>
        <GlobalStyles />
        <RouterProvider router={router()} />
    </>
    // </React.StrictMode>
);
