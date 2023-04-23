import { HeroRouter, WallRouter } from "../routes";

export const APPS = [
    {
        subdomain: 'heroes',
        app: HeroRouter,
        main: false
    },
    {
        subdomain: 'wall',
        app: WallRouter,
        main: true
    }
]