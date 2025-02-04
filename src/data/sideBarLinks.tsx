import { appRoutePaths } from "@/routes/paths"
import { GrUserSettings, GrUserWorker } from "react-icons/gr"
import { LuActivity, LuLayoutDashboard, LuMessageSquarePlus, LuScrollText } from "react-icons/lu";

type SidebarProps = {
    id: string
    title: string
    icon: React.ReactNode
    link: string
}

export const sideBarLinks: SidebarProps[] = [
    {
        id: '8q2s03x5068q20',
        title: 'Dashboard',
        icon: <LuLayoutDashboard />,
        link: appRoutePaths.admindashboard,
    },
    {
        id: '8q2s03x5068q21',
        title: 'Admins',
        icon: <GrUserWorker />,
        link: appRoutePaths.adminadmin,
    },
    {
        id: '8q2s03x5068q22',
        title: 'Projects',
        icon: <LuScrollText />,
        link: appRoutePaths.adminproject,
    },
    {
        id: '8q2s03x5068q23',
        title: 'Messages',
        icon: <LuMessageSquarePlus />,
        link: appRoutePaths.admincontact,
    },
    {
        id: '8q2s03x5068q24',
        title: 'Activities',
        icon: <LuActivity />,
        link: appRoutePaths.adminactivities,
    },
    {
        id: '8q2s03x5068q25',
        title: 'Profile',
        icon: <GrUserSettings />,
        link: appRoutePaths.adminprofile,
    },
]