import { APPS } from "./constants"

export const getApp = () => {
    const main = APPS.find(app => app.main);
    const subdomain = getSubdomain(window.location.hostname);
    const subApp = APPS.find((app) => subdomain === app.subdomain)

    if ( !main ) throw new Error ('Must have main app');

    if ( subdomain === "" || !subApp ) return main.app;

    return subApp.app;
}

const getSubdomain = (hostname: string) => {
    const hostnameParts = hostname.split(".")
    let sliceIndex = -2;

    const isLocalhost = hostnameParts.slice(-1)[0] === 'localhost';
    if (isLocalhost) sliceIndex = -1;

    return hostnameParts.slice(0, sliceIndex).join("");
}