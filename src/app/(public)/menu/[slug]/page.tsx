import React from 'react'
import { getPageMenu, getSinglePageMenu } from '@/action';
import { MenuCard } from '@/components';
import { Header1, Header2, Header3, Para1 } from '@/components/ui/Typography';
import Image from 'next/image';
import { HiOutlineShoppingBag } from 'react-icons/hi2';

type TPageParams = {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const res = await getPageMenu();
    if (res?.data?.menu) {
        return res.data.menu.map(el => ({ slug: el.slug }));
    }
    return [];
}

export async function generateMetadata({ params: { slug } }: TPageParams) {
    const res = await getSinglePageMenu({ slug })
    return {
        title: `${res?.data?.menu?.name}'s Details`,
        description: res?.data?.menu?.description,
    }
}

export default async function SingleFoodPage({ params: { slug } }: TPageParams) {
    const res = await getSinglePageMenu({ slug })
    const data = res?.data?.menu
    const similar = res?.data?.similar
    return (
        <main className='relative flex flex-col bg-primary'>
            <section className="py-5 md:py-10 lg:py-20 px-4">
                <div className="container mx-auto lg:px-10 grid lg:grid-cols-2 gap-8 lg:justify-center">
                    <aside className="relative overflow-hidden bg-light rounded-xl">
                        <Image src={data?.image || ""} alt={data?.name ?? "Food Image"} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
                    </aside>
                    <aside className="relative flex flex-col gap-2 md:gap-4 py-10">
                        <Header3 className='text-secondary font-inspiration'>{data?.category?.name}</Header3>
                        <Header2 className={`text-white font-medium font-eugusto max-w-sm`}>{data?.name}</Header2>
                        <Para1 className={`font-urbanist text-white text-lg lg:text-xl text-balance max-w-lg`}>{data?.description}</Para1>
                        <button className="group flex-shrink-0 flex items-center gap-3 w-max px-6 lg:px-8 py-2 lg:py-3 mt-2 rounded-[2rem] bg-secondary text-white text-lg md:text-xl cursor-pointer font-urbanist">Add to Cart <HiOutlineShoppingBag className="text-xl md:text-2xl group-hover:-translate-x-1" /></button>
                    </aside>
                </div>
            </section>
            <section className="bg-white py-10 md:py-10 lg:py-20 px-4">
                <div className="container mx-auto flex flex-col gap-6 md:gap-8">
                    <Header1 className="text-primary text-center py-4 font-medium">Latest Menu</Header1>
                    <aside className="px-4 md:px-8 lg:px-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {similar?.length ? similar?.filter(el => el.popular !== true).slice(0, 6).map(food => (
                            <MenuCard key={food.id} {...food} />
                        )) : []
                        }
                    </aside>
                </div>
            </section>
        </main>
    )
}
