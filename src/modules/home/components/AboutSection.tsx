import { ASSETS_URL, SOCIAL_LINKS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function AboutSection() {
  return (
    <section className='relative py-10 px-4 bg-white dark:bg-milk'>
      <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-4 sm:gap-8">
        <aside className='flex-1 relative bg-zinc-300 rounded-md overflow-hidden py-40 md:py-64 -scale-x-100'>
          <Image src={ASSETS_URL["young_me"]} alt='young_me' fill className='object-cover object-top' />
        </aside>
        <aside className='flex-1 flex flex-col justify-center gap-2 relative'>
          <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
            <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-xs text-right w-full ml-auto font-light max-w-xs text-slate-700 dark:text-milk">About Me</p>
            <h2 className="heading-one text-5xl lg:text-6xl font-bold font-serif">Hi, Fredericks here</h2>
          </div>
              <p className="text-default leading-loose text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus in perspiciatis dignissimos omnis cumque temporibus quasi eum vero labore quaerat. Consectetur nemo quas vel rerum, autem veritatis voluptatibus id cum vero laborum ea mollitia quos praesentium nobis ut non quidem.</p>
              <p className="text-default leading-loose text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus in perspiciatis dignissimos omnis cumque temporibus quasi eum vero labore quaerat. Consectetur nemo quas vel rerum, autem veritatis voluptatibus id cum vero laborum ea mollitia quos praesentium nobis ut non quidem.</p>
            </div>
            <div className="bg-white dark:bg-primary flex justify-center sm:flex-col gap-6 lg:gap-10 py-4 sm:py-4 sm:px-4">
              {
                SOCIAL_LINKS.map(item => (
                  <Link key={item.id} href={item.link} className='grid place-items-center h-6 w-6 rounded-sm flex-shrink-0 text-primary dark:text-white text-xl lg:text-3xl' target="_blank" rel="noopener noreferrer">{item.icon}</Link>
                ))
              }
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
