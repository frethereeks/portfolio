"use client"

import React from 'react'
import { Header2, Header3, Para1 } from '@/components/ui/Typography'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { usePathname } from 'next/navigation'

export default function AboutSection() {
    const pathname = usePathname()
    return (
        <>
            <section className="py-5 md:py-10 lg:py-20 px-4">
                <div className="container mx-auto lg:px-10 grid lg:grid-cols-2 gap-8 lg:justify-center">
                    <aside className="relative bg-primary rounded-xl"></aside>
                    <aside className="relative flex flex-col gap-2 md:gap-4 py-10">
                        <Header3 className='text-secondary font-inspiration'>About us</Header3>
                        <Header2 className={`${pathname === appRoutePaths.about ? "text-white" : "text-primary"} font-medium font-eugusto max-w-sm`}>We Provide <span className="flex items-center gap-4 lg:gap-6">Healthy Food</span></Header2>
                        <Para1 className={`font-urbanist ${pathname === appRoutePaths.about ? "text-white opacity-60" : "text-text"} text-lg lg:text-xl max-w-md`}>Food for us comes from our relatives, whether they have wings or fins or roots. That is how we consider food. Food has a culture, it has a history, it has a story and a relationship.</Para1>
                        {
                            pathname === appRoutePaths.about ?
                                <Link href={appRoutePaths.menu} className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 mt-2 rounded-[2rem] bg-white text-primary text-lg md:text-xl cursor-pointer font-urbanist">Order Food <IoIosArrowRoundForward className="text-xl md:text-3xl group-hover:translate-x-2" /></Link>
                                :
                                <Link href={appRoutePaths.about} className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 mt-2 rounded-[2rem] bg-secondary text-white text-lg md:text-xl cursor-pointer font-urbanist">Learn More <IoIosArrowRoundForward className="text-xl md:text-3xl group-hover:translate-x-2" /></Link>
                        }
                    </aside>
                </div>
            </section>
        </>
    )
}
