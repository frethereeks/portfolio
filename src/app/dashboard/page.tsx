import { appRoutePaths } from '@/routes/paths'
import { redirect } from 'next/navigation'
import React from 'react'

export default function DashboardPage() {
    redirect(appRoutePaths.admindashboard)
  return (
    <></>
  )
}
