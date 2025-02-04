import React from 'react'
import { CategoryContainer } from './components'
import prisma from '@/lib/prisma'
import { fetchUser } from '@/action'

export default async function OverviewContainer() {
  const res = await fetchUser()
  const [allCategory, allContact, allProjects, allAdmins, categories] = await prisma.$transaction([
    prisma.portCategory.groupBy({
      by: ["status"], _count: { id: true }, orderBy: { status: "desc" }
    }),
    prisma.portContact.groupBy({
      by: ["status"], _count: { id: true }, orderBy: { status: "desc" }
    }),
    prisma.portProject.groupBy({
      by: ['categoryId'], _count: { id: true }, orderBy: { categoryId: "desc" },
    }),
    prisma.portAdmin.groupBy({
      by: ["role"], _count: { id: true }, orderBy: { role: "desc" }
    }),
    prisma.portCategory.findMany({
      include: {
        project: { select: { id: true, name: true } },
        admin: { select: { firstname: true, lastname: true, id: true } },
      },
      orderBy: { createdAt: "desc" }
    })
  ])
  const admins = allAdmins.map(({ _count, role }) => ({ _count: _count?.valueOf(), role }))
  const summedCategories = allCategory.map(({ _count, status }) => ({ _count: _count?.valueOf(), status }))
  console.log({ allCategory, allContact, allProjects, allAdmins, admins, summedCategories })
  return (
    <main className='flex flex-col gap-4'>
      <CategoryContainer data={categories} role={res?.role ?? "ROOT"} />
    </main>
  )
}
