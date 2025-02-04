import { fetchProjects } from '@/action'
import ProjectContainer from '@/modules/dashboard/projects/ProjectContainer'
import React from 'react'

export default async function AdminProjectPage() {
    const {data, role} = await fetchProjects()
    return (
        <ProjectContainer data={data?.data} category={data?.category} role={role!} />
    )
}
