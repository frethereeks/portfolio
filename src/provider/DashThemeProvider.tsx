"use client"
import { ConfigProvider } from 'antd'
import { appThemeConfig } from '@/config/theme'

export type ThemeMode = "light" | "dark"

export default function DashThemeProvider({ children }: { children: React.ReactNode }) {
    
    return (
        <>
            <ConfigProvider theme={appThemeConfig}> { children }</ConfigProvider>
        </>
    )
}
