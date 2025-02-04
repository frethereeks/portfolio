import { AboutSection, HappyClientSection, Newsletter } from '@/components'
import React from 'react'

export default function AboutPage() {
  return (
    <main className='relative flex flex-col'>
      <div className="bg-primary">
        <AboutSection />
      </div>
      <HappyClientSection />
      <Newsletter />
    </main>
  )
}
