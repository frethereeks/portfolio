"use client"
import { DEFAULT_PAGE_SIZE } from '@/constants'
import React, { useRef, useState } from 'react'
import ProjectCard from './ProjectCard'
import { projectData } from '@/data'
import { TProjectProps } from '@/data/projectData'

export default function ProjectSection() {
  const [projects, setProjects] = useState<TProjectProps[]>(projectData)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const projectContainerRef = useRef<HTMLDivElement | null>(null)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setProjects(prev => prev)
    projectContainerRef.current?.scrollIntoView({behavior: "smooth", block: "start"})
  }

  return (
    <section className="py-20 bg-slate-100 dark:bg-primary/50 px-4">
      <div className="container mx-auto flex flex-col relative z-10 pt-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <p className="text-xs font-light max-w-xs text-slate-700 dark:text-milk">My Projects</p>
          <h3 className="flex-1 sm:ml-11 text-slate-700 dark:text-light-secondary text-4xl sm:text-5xl leading-tight font-bold max-w-md sm:max-w-2xl">Here are some of my <span className="bg-primary text-white uppercase">project</span> for your perusal.</h3>
        </div>
        <div className="relative z-20 container mx-auto py-20 flex flex-col text-slate-500 dark:text-slate-400 gap-4 md:gap-8 text-justify">
          <div ref={projectContainerRef} className="py-4 sm:py-6 lg:pt-8 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {
              projects.slice((currentPage * DEFAULT_PAGE_SIZE), (DEFAULT_PAGE_SIZE + ((currentPage * DEFAULT_PAGE_SIZE)))).map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))
            }
          </div>
          {/* <p className="leading-loose">All the above activities of the cooperative shall be conducted with the aim of assisting the government by supporting the SME and ultimately contributing to the Gross Domestic Product (GDP) in Nigeria.</p> */}

          <div className="flex justify-end gap-2">
            {
              Array.from({ length: Math.ceil(projects.length / DEFAULT_PAGE_SIZE) }).map((
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    className={`border border-primary dark:border-milk py-2 cursor-pointer ${currentPage === index ? 'bg-primary dark:bg-milk text-white dark:text-primary' : 'bg-white dark:bg-transparent text-primary dark:text-milk'} rounded button`}> {index + 1}
                  </button>
                )))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
