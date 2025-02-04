import React from 'react'
import LoginForm from './LoginForm'
import { Metadata } from 'next'
import { ASSETS_URL } from '@/constants';
import Image from 'next/image';
// import { Header3 } from '@/components/ui/Typography'

export const metadata: Metadata = {
  title: "Fredericks Portfolio :: Sign In",
  description: "Frederick is a senior software developer with extensive experience",
};

export default async function SigninPage() {
  return (
    <main className="relative h-full min-h-full flex flex-col bg-white dark:bg-milk">
      <section className="relative py-10 lg:py-20 px-4">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-5 gap-4 md:px-8 lg:px-10 lg:justify-center">
          <aside className="relative bg-primary rounded-xl min-h-60 overflow-hidden lg:col-span-3 grid place-items-center -scale-x-100">
            <Image src={ASSETS_URL["young_me"]} alt={"young_me"} fill className={`w-full h-full rounded-xl absolute object-cover object-top flex-shrink-0 flex`} />
          </aside>
          <aside className="relative flex flex-col gap-2 md:gap-4 py-5 md:py-10 lg:col-span-2">
            <LoginForm key={8347704} />
          </aside>
        </div>
      </section>
    </main>
  )
}
