import { getPageMenu } from '@/action'
import { MenuSection } from '@/components'
import { Header1, Header2 } from '@/components/ui/Typography'
import React from 'react'

export default async function MenuPage() {
  const res = await getPageMenu()
    const menu = res.data?.menu
    const categories = res.data?.category
  return (
    <main className='relative flex flex-col bg-background'>
      <section className="relative py-10 lg:py-20 px-4 text-center bg-background shadow-lg shadow-text/10">
        <div className="container mx-auto flex flex-col items-center gap-2 md:gap-3">
          <Header2 className='text-secondary font-inspiration'>Our Menu</Header2>
          <Header1 className={`text-primary font-medium font-eugusto max-w-xl`}>We Provide <span className="flex items-center gap-4 lg:gap-6">Healthy Food</span></Header1>
          <p className={`font-urbanist text-text text-default max-w-xl`}>Whether you&apos;re a seasoned foodie or simply looking for a delicious meal, our menu has something to satisfy your cravings. Our dedicated chefs are passionate about creating dishes that will leave you wanting more.</p>
          {/* <Para1 className={`font-urbanist text-text text-lg lg:text-xl max-w-xl`}>Foor for us comes from our relatives, whether they have wings or fins or roots. That is how we consider food. Food has a culture, it has a history, it has a story and a relationship.</Para1> */}
        </div>
      </section>
      <section className="bg-white">
        <MenuSection data={menu} categories={categories} />
      </section>
    </main>
  )
}
