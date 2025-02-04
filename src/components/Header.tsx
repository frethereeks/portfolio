"use client"

import React, { useCallback } from 'react'
import Link from 'next/link'
import { headerLinks } from '@/data'
import { appRoutePaths } from '@/routes/paths'
import { IoBriefcaseOutline, IoCloseOutline } from 'react-icons/io5'
import { HiOutlineMoon } from "react-icons/hi2";
import { HiMenuAlt3, HiOutlineSun } from "react-icons/hi";
import { usePathname } from 'next/navigation'
// import SearchInput from './SearchInput'
import { ThemeMode } from '@/provider/ThemeProvider'

type HeaderProps = {
    setDarkMode: React.Dispatch<React.SetStateAction<ThemeMode>>,
    darkMode: ThemeMode
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
    const [navshow, setNavshow] = React.useState(false)
    const [fixed, setFixed] = React.useState(false)
    const location = usePathname();

    React.useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY > 60) {
                setFixed(true)
            }
            else {
                setFixed(false)
            }
        }
        return () => {
            setNavshow(false);
        }
    }, [location])

    const handleClick = useCallback(() => {
        setDarkMode(prev => prev === "dark" ? "light" : "dark")
    }, [setDarkMode])

    const handleNavshow = useCallback(() => {
        setNavshow(prev => !prev)
    }, [setNavshow])
        
    return (
        <header className={`${fixed ? 'fixed shadow-md shadow-black/20' : 'relative shadow-none'} z-40 w-full px-4 py-2 md:py-4 lg:py-5 bg-white`}>
            <div className="container mx-auto flex justify-between gap-4">
                <nav className={`flex-1 flex flex-col lg:flex-row lg:items-center gap-2 z-50 absolute lg:static top-0 w-full min-h-screen lg:min-h-max ${navshow ? 'right-0' : 'right-full'}`}>
                    <div onClick={() => setNavshow(!navshow)} className={`${navshow ? 'flex lg:hidden' : 'hidden'} transition-none duration-0 fixed top-0 left-0 w-screen h-screen bg-text/50`}></div>
                    <div className="relative flex flex-col lg:flex-row justify-center lg:justify-start h-screen lg:h-max lg:items-center gap-2 lg:gap-1 xl:gap-2 max-w-[20rem] lg:max-w-max bg-white">
                        <div onClick={() => setNavshow(!navshow)} className="absolute top-2 right-3 lg:hidden bg-text/30 text-primary text-3xl cursor-pointer p-1 grid place-items-center font-extrabold rounded-xl">
                            <IoCloseOutline />
                        </div>
                        {
                            headerLinks.map(link => (
                                <Link key={link.id} href={link.url} className="lg:flex-1 p-2 lg:px-4 font-semibold lg:text-center text-primary hover:text-white bg-white hover:bg-primary lg:rounded-md capitalize">{link.title}</Link>
                            ))
                        }
                    </div>
                </nav>
                <Link href={appRoutePaths.home} className="flex-1 flex gap-2 lg:justify-center flex-shrink-0">
                    <div className="w-10 lg:w-12 h-[110%] md:h-[120%] relative flex justify-between sm:gap-1 flex-wrap border-primary">
                        <div className="rounded-sm overflow-hidden h-[40%] w-[42%] sm:w-[40%] lg:h-[44%] lg:w-[44%] bg-primary"></div>
                        <div className="rounded-sm overflow-hidden h-[40%] w-[42%] sm:w-[40%] lg:h-[44%] lg:w-[44%] bg-milk border-2 border-primary"></div>
                        <div className="rounded-sm overflow-hidden h-[40%] w-[42%] sm:w-[40%] lg:h-[44%] lg:w-[44%] bg-milk border-2 border-primary"></div>
                        <div className="rounded-sm overflow-hidden h-[40%] w-[42%] sm:w-[40%] lg:h-[44%] lg:w-[44%] bg-primary"></div>
                    </div>
                    <div className="flex">
                        {/* <div className='text-primary text-xl md:text-2xl lg:text-3xl font-medium font-eugusto leading-none tracking-wide uppercase'>Frethericks <span className='bg-primary text-white grid place-items-center text-sm w-max text-center tracking-[.8rem] uppercase -my-1 lg:-my-2 pl-2.5'>PORTFIOLIO</span></div> */}
                        <div className='text-primary text-xl md:text-2xl lg:text-3xl font-medium font-eugusto leading-none tracking-wide uppercase'>Fredericks <span className='bg-primary text-white grid place-items-center text-sm w-max text-center tracking-[.2rem] lg:tracking-[.55rem] uppercase -my-1 lg:-my-2 pl-1.5 md:pl-2.5'>PORTFIOLIO</span></div>
                    </div>
                </Link>
                <div className='flex-1 flex-shrink-0 flex justify-end items-center gap-4'>
                    <div className={`hidden lg:flex gap-2 border-b-2 border-primary max-w-lg`}>
                        {/* <SearchInput /> */}
                    </div>
                    <button className="relative button bg-primary hidden sm:flex items-center gap-2">
                        <IoBriefcaseOutline /> Hire Me
                    </button>
                    <div onClick={handleNavshow} className="relative lg:hidden bg-text/10 text-primary text-2xl md:text-3xl cursor-pointer xs:w-7 xs:h-7 w-9 h-9 grid place-items-center font-extrabold rounded-md">
                        <HiMenuAlt3 />
                    </div>
                    <div onClick={handleClick} className="relative text-primary text-lg lg:text-2xl cursor-pointer w-6 h-6">
                        {darkMode === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
                    </div>
                </div>
            </div>
        </header>
    )
}
