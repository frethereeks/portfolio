import React from 'react'
import { Metadata } from 'next';
import { fetchAdmins } from '@/action'
import AdminContainer from '@/modules/dashboard/admin/AdminContainer'

export const metadata: Metadata = {
    title: "Frederick Portfolio :: Admins",
    description: "Frederick is a senior software developer with extensive experience",
};

export default async function AdminProjectPage() {
    const {data, role} = await fetchAdmins()
    return (
        <AdminContainer data={data!} role={role!}  />
    )
}
