"use client"

import React from 'react'
import { Header1, Header5, Header4, Para3, } from './ui/Typography'
import Link from 'next/link'
import { appRoutePaths } from '@/routes/paths'
import { HiOutlineShoppingBag } from "react-icons/hi";
// import AppSlider from './ui/AppSlider';
import toast from 'react-hot-toast';
// import { popularFoods } from '@/data'
import { Category, Menu } from '@prisma/client'
import Image from 'next/image'

type TPageProps = {
    data: Menu[] | undefined
    categories: Category[] | undefined
}

export default function MenuSection({ data, categories }: TPageProps) {


    const handleAddToCart = (food: Menu) => {
        toast.success(`${food.name} successfully added to cart.`)
    }
    return (
        <>
            <section className="py-10 md:py-10 lg:py-20 px-4">
                <aside className="container mx-auto flex flex-col gap-4">
                    {/* <Header1 className="text-primary text-center py-4 font-medium">Popular Dishes</Header1>
                    <div className="px-4 md:px-8 lg:px-10">
                        <AppSlider
                            key={"8256015asdkjlvcqa0p25"}
                            breakpoints={{
                                360: { slidesPerView: 1, spaceBetween: 10 },
                                650: { slidesPerView: 2, spaceBetween: 20 },
                                1042: { slidesPerView: 3, spaceBetween: 30 },
                            }}
                            items={data?.length ? data?.filter(el => el.popular === true).map(food => (
                                <aside key={food.id} className="relative flex flex-col gap-2 max-w-md bg-white rounded-xl hover:shadow-lg overflow-hidden">
                                    <Link href={`${appRoutePaths.menu}/${food.id}`} className="min-h-40 flex-shrink-0 relative bg-primary">
                                        <Image src={food?.image || ""} alt={food.name} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                                    </Link>
                                    <div className="flex-1 flex flex-col justify-between gap-2 lg:gap-3 p-4">
                                        <Link href={`${appRoutePaths.menu}/${food.id}`} className="flex-1 flex flex-col">
                                            <Header4 className='text-primary font-medium font-eugusto'>{food.name}</Header4>
                                            <Para2 className="font-urbanist text-text text-balance line-clamp-3">{food.description}</Para2>
                                        </Link>
                                        <div className="flex justify-between items-center gap-3 py-2">
                                            <Header5 className='text-secondary font-urbanist'>&#8358;{food.price.toLocaleString()}</Header5>
                                            <button onClick={() => handleAddToCart(food)} className="group flex-shrink-0 flex justify-center items-center h-8 w-8 rounded-xl bg-text/10 text-primary hover:bg-text/20 text-lg md:text-xl cursor-pointer font-urbanist"><HiOutlineShoppingBag /></button>
                                        </div>
                                    </div>
                                </aside>
                            )) : []
                            }
                        />
                    </div> */}
                    <Header1 className="text-secondary text-center py-4 font-medium">Explore Our Food Menu</Header1>
                    <div className="flex justify-center gap-4 flex-wrap">
                        {
                            categories?.map(category => (
                                <Header4 key={category.id} className="border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white text-center w-40 p-4 mt-10 mb-2 shadow-lg shadow-text/40 rounded-md py-1 font-medium flex justify-center items-center gap-2">{category.name} <span className='font-urbanist font-semibold text-xs md:text-sm'></span></Header4>
                            ))
                        }
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                        {
                            data?.map(food => (
                                <aside key={food.id} className="shadow-lg shadow-primary/30 relative flex flex-col gap-2 max-w-md bg-white rounded-xl hover:shadow-lg overflow-hidden">
                                    <Link href={`${appRoutePaths.menu}/${food.id}`} className="min-h-40 flex-shrink-0 relative bg-primary">
                                        <Image src={food?.image || ""} alt={food.name} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                                    </Link>
                                    <div className="flex-1 flex flex-col justify-between gap-2 lg:gap-3 p-4">
                                        <Link href={`${appRoutePaths.menu}/${food.id}`} className="flex-1 flex flex-col gap-1">
                                            <Header5 className='text-primary font-medium font-eugusto'>{food.name}</Header5>
                                            <Para3 className="font-urbanist text-text text-justify line-clamp-3">{food.description}</Para3>
                                        </Link>
                                        <div className="flex justify-between items-center gap-3 py-2">
                                            <Header5 className='text-secondary font-urbanist'>&#8358;{food.price.toLocaleString()}</Header5>
                                            <button onClick={() => handleAddToCart(food)} className="group flex-shrink-0 flex justify-center items-center h-8 w-8 rounded-xl bg-text/10 text-primary hover:bg-text/20 text-lg md:text-xl cursor-pointer font-urbanist"><HiOutlineShoppingBag /></button>
                                        </div>
                                    </div>
                                </aside>
                            ))
                        }
                    </div>
                    {
                        categories?.map(category => {
                            const menu = data?.filter(el => el.categoryId === category.id)
                            if (menu?.length)
                            return (
                                <>
                                    <Header4 className="bg-primary w-40 p-4 mt-10 mb-2 shadow-lg shadow-text/40 text-left text-white rounded-md py-1 font-medium flex items-center gap-2">{category.name} <span className='font-urbanist font-semibold text-xs md:text-sm'>({menu?.length})</span></Header4>
                                    {/* <h4 className="bg-primary w-80 p-4 shadow-lg shadow-text/40 relative border-l-4 border-primary heading-three text-left text-white rounded-md font-eugusto font-medium flex items-center gap-2">{category.name} <span className='font-urbanist font-semibold text-xs md:text-sm'>({menu?.length})</span></h4> */}
                                    <aside className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                                        {
                                            menu?.map(food => (
                                                <aside key={food.id} className="shadow-lg shadow-primary/30 relative flex flex-col gap-2 max-w-md bg-white rounded-xl hover:shadow-lg overflow-hidden">
                                                    <Link href={`${appRoutePaths.menu}/${food.id}`} className="min-h-40 flex-shrink-0 relative bg-primary">
                                                        <Image src={food?.image || ""} alt={food.name} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                                                    </Link>
                                                    <div className="flex-1 flex flex-col justify-between gap-2 lg:gap-3 p-4">
                                                        <Link href={`${appRoutePaths.menu}/${food.id}`} className="flex-1 flex flex-col gap-1">
                                                            <Header5 className='text-primary font-medium font-eugusto'>{food.name}</Header5>
                                                            <Para3 className="font-urbanist text-text text-justify line-clamp-3">{food.description}</Para3>
                                                        </Link>
                                                        <div className="flex justify-between items-center gap-3 py-2">
                                                            <Header5 className='text-secondary font-urbanist'>&#8358;{food.price.toLocaleString()}</Header5>
                                                            <button onClick={() => handleAddToCart(food)} className="group flex-shrink-0 flex justify-center items-center h-8 w-8 rounded-xl bg-text/10 text-primary hover:bg-text/20 text-lg md:text-xl cursor-pointer font-urbanist"><HiOutlineShoppingBag /></button>
                                                        </div>
                                                    </div>
                                                </aside>
                                            ))
                                        }
                                    </aside>
                                </>

                            )
                        })
                    }
                    {/* <aside className="px-4 md:px-8 lg:px-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {data?.length ? data?.filter(el => el.popular !== true).slice(0, 8).map(food => (
                            <aside key={food.id} className="relative flex flex-col gap-2 max-w-md bg-white rounded-xl hover:shadow-lg overflow-hidden">
                                <Link href={`${appRoutePaths.menu}/${food.id}`} className="min-h-40 flex-shrink-0 relative bg-primary">
                                    <Image src={food?.image || ""} alt={food.name} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                                </Link>
                                <div className="flex-1 flex flex-col justify-between gap-2 lg:gap-3 p-4">
                                    <Link href={`${appRoutePaths.menu}/${food.id}`} className="flex-1 flex flex-col">
                                        <Header4 className='text-primary font-medium font-eugusto'>{food.name}</Header4>
                                        <Para3 className="font-urbanist text-text text-balance line-clamp-3">{food.description}</Para3>
                                    </Link>
                                    <div className="flex justify-between items-center gap-3 py-2">
                                        <Header5 className='text-secondary font-urbanist'>&#8358;{food.price.toLocaleString()}</Header5>
                                        <button onClick={() => handleAddToCart(food)} className="group flex-shrink-0 flex justify-center items-center h-8 w-8 rounded-xl bg-text/10 text-primary hover:bg-text/20 text-lg md:text-xl cursor-pointer font-urbanist"><HiOutlineShoppingBag /></button>
                                    </div>
                                </div>
                            </aside>
                        )) : []
                        }
                    </aside> */}
                </aside>
            </section>
        </>
    )
}
