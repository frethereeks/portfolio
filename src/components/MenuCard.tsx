"use client"

import { appRoutePaths } from '@/routes/paths'
import { Menu } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Header5, Para3 } from './ui/Typography'
import toast from 'react-hot-toast'
import { HiOutlineShoppingBag } from 'react-icons/hi2'

export default function MenuCard(food: Menu) {

    const handleAddToCart = (food: Menu) => {
        toast.success(`${food.name} successfully added to cart.`)
    }

  return (
      <>
          <aside key={food.id} className="shadow-lg shadow-primary/30 relative flex flex-col gap-2 max-w-md bg-white rounded-xl hover:shadow-lg overflow-hidden">
              <Link href={`${appRoutePaths.menu}/${food.slug}`} className="min-h-48 flex-shrink-0 relative bg-primary">
                  <Image src={food?.image || ""} alt={food.name} fill className={`w-full h-full absolute object-cover object-center flex-shrink-0 flex`} />
              </Link>
              <div className="flex-1 flex flex-col justify-between gap-2 lg:gap-3 p-4 pt-1.5">
                  <Link href={`${appRoutePaths.menu}/${food.slug}`} className="flex-1 flex flex-col gap-1">
                      <Header5 className='text-primary font-medium font-eugusto'>{food.name}</Header5>
                      <Para3 className="font-urbanist text-text text-justify line-clamp-3">{food.description}</Para3>
                  </Link>
                  <div className="flex justify-between items-center gap-3 py-2">
                      <Header5 className='text-secondary font-urbanist'>&#8358;{food.price.toLocaleString()}</Header5>
                      <button onClick={() => handleAddToCart(food)} className="group flex-shrink-0 flex justify-center items-center h-8 w-8 rounded-xl bg-text/10 text-primary hover:bg-text/20 text-lg md:text-xl cursor-pointer font-urbanist"><HiOutlineShoppingBag /></button>
                  </div>
              </div>
          </aside>
      </>
  )
}
