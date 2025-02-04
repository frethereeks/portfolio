"use client"
import React from 'react'
import { AboutSection, ContactSection, HomeSection, ProjectSection } from './components'

export default function HomeContainer() {
    return (
        <main className='relative flex flex-col pt-20'>
            <HomeSection />
            <AboutSection />
            <ProjectSection />
            <ContactSection />
        </main>
    )
}
