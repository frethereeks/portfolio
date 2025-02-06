// import { ASSETS_URL } from '@/constants'
// import Image from 'next/image'
// import { appRoutePaths } from '@/routes/paths'
import Link from 'next/link'
import React from 'react'
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io'

export default function Footer() {
  return (
    <footer className='bg-slate-100 dark:bg-primary p-4 relative z-20'>
      <div className="container mx-auto relative flex justify-between gap-4 md:gap-10 text-text">
        <p className="text-small text-text dark:text-milk">&copy;Copyright {new Date().getFullYear()}. Fredericks Portfolio. All rights reserved.</p>
        <div className="flex gap-4 text-base md:text-base opacity-90">
          <Link href={'https://www.facebook.com/al-ameen'} target="_blank" rel="noopener noreferrer" className="leading-loose text-text dark:text-milk"><IoLogoFacebook /></Link>
          <Link href={'https://www.twitter.com/al-ameen'} target="_blank" rel="noopener noreferrer" className="leading-loose text-text dark:text-milk"><IoLogoTwitter /></Link>
          <Link href={'https://www.instagram.com/al-ameen'} target="_blank" rel="noopener noreferrer" className="leading-loose text-text dark:text-milk"><IoLogoInstagram /></Link>
          <Link href={'https://www.youtube.com/al-ameen'} target="_blank" rel="noopener noreferrer" className="leading-loose text-text dark:text-milk"><IoLogoYoutube /></Link>
        </div>
      </div>
    </footer>
  )
}
