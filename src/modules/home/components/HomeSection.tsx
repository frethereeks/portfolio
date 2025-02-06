// import AppCounter from '@/components/ui/AppCounter'
import AppSlider from '@/components/ui/AppSlider'
import { skillsData } from '@/data'
import React from 'react'

export default function HomeSection() {
  return (
    <section className='relative py-10 px-4 dark:bg-primary'>
      <div className="container mx-auto flex flex-col justify-between gap-4">
        <aside className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl text-primary dark:text-milk font-bold w-full max-w-xl leading-loose">I am a <span className="font-bold flex w-max text-6xl md:text-7xl lg:text-8xl text-white dark:text-primary bg-milk dark:bg-milk py-0">Software</span> Developer</h1>
          </div>
          <div className="flex-1 flex flex-col justify-between gap-4 py-5">
            <p className="text-default text-text dark:text-white/50 leading-loose w-full max-w-lg">Hi there, I am a senior <span className="leading-none">software developer</span> with extensive experience in software development, infrastructure and architecture using in HTML, CSS, SaSS, TailwindCSS, Javascript, Typescript, React, NextJS, Vue, Nuxt, NodeJS, Laravel, PHP, MySQL, MongoDB, AWS, git, github, vercel, VPS, docker and many more.</p>
            <div className="flex justify-between gap-4">
              {
                [
                  [new Date().getFullYear() - 2018, "working experience",],
                  [+(new Date().getFullYear().toString().slice(-2)) - 18, "Successful projects",],
                  [+(new Date().getFullYear().toString().slice(-2)) + 2, "Happy Clients",],
                ].map(([years, text]) => (
                  <figure key={years} className="py-10 flex flex-col items-center justify-center gap-2 text-primary dark:text-milk">
                    {/* <h3 className="heading-two"> <AppCounter start={0} end={years} suffix={"+"} /></h3> */}
                    <h3 className="heading-one text-text dark:text-milk">{years}+</h3>
                    <p className="text-xs text-text dark:text-white/50 capitalize">{text}</p>
                  </figure>
                ))
              }
            </div>
          </div>
        </aside>
        <aside className="p-4">
          <AppSlider
            items={
              skillsData.map(skill => (
                <figure key={skill.id} className='flex items-center gap-2'>
                  <div className="text-2xl flex-shrink-0 border-primary rounded-md bg-background">{skill.icon}</div>
                  <p className="text-xs sm:text-base text-text dark:text-milk font-semibold">{skill.name}</p>
                </figure>
              ))
            }
            slidesPerView={2}
            spaceBetween={20}
            breakpoints={{
              500: { slidesPerView: 2, spaceBetween: 20 },
              600: { slidesPerView: 3, spaceBetween: 20 },
              700: { slidesPerView: 4, spaceBetween: 20 },
              1200: { slidesPerView: 6, spaceBetween: 20 },
            }}
          />
        </aside>
      </div>
    </section>
  )
}