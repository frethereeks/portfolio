import React from 'react'
import Link from 'next/link'
import { TProjectProps } from '@/data/projectData'

export default function ProjectCard({ name, images, link, stack, type }: TProjectProps) {
  console.log({images})
  return (
    <>
      <Link href={link} className='flex flex-col' target="_blank" rel="noopener noreferrer">
        <div className="p-1.5 sm:p-3 relative rounded-xl overflow-hidden">
          <div className="h-full w-full absolute top-0 left-0 blur-sm rounded-xl bg-milk dark:bg-milk/10"></div>
          <figure className='py-20 md:py-40 relative bg-text dark:bg-white/50 rounded-lg'></figure>
        </div>
        <div className="flex-1 flex flex-col p-2 sm:p-4">
          <p className="text-[.6rem] sm:text-xs text-text/70 dark:text-white/50">{stack.join(",")} • {type}</p>
          <h2 className="font-bold font-serif leading-tight text-base sm:text-xl text-left text-primary dark:text-milk">{name}</h2>
        </div>
      </Link>
    </>
  )
}
