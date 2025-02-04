"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { ConfigProvider } from 'antd'
import { appThemeConfig } from '@/config/theme'
import { Header } from "@/components";

export type ThemeMode = "light" | "dark"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState<ThemeMode>("light")
    
    useEffect(() => {
        if (localStorage.getItem("fretherick__thememode")){
            const mode = (localStorage.getItem("fretherick__thememode")) as unknown as ThemeMode
            setDarkMode(mode)
        }
        console.log("First Rerender Triggered!")
    }, [])

    const handleChangeTheme = useCallback(() => {
        setDarkMode(prev => prev === "dark" ? "light" : "dark")
        localStorage.setItem("fretherick__thememode", darkMode)
    }, [darkMode])
    
    return (
        <>
            <Header darkMode={darkMode} setDarkMode={handleChangeTheme} />
            <ConfigProvider theme={appThemeConfig}> <div className={`${darkMode} min-h-[80vh]`}> {children} </div></ConfigProvider>
        </>
    )
}
