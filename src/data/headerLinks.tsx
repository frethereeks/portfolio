import { appRoutePaths } from "@/routes/paths"

type THeaderLinks = {
    id: string
    title: string
    url: string
}

export const headerLinks: THeaderLinks[] = [
    {
        id: "802630",
        title: "Home",
        url: appRoutePaths.home
    },
    {
        id: "802632",
        title: "Project",
        url: appRoutePaths.projects
    },
    {
        id: "802634",
        title: "Contact",
        url: appRoutePaths.contact
    },
]