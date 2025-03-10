"use client";
import { useTheme } from "next-themes";
import Moon from "@/assets/images/icon-moon.svg";
import Sun from "@/assets/images/icon-sun.svg";
import { useEffect } from "react";
export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        if (theme === 'system') {
            setTheme('dark')
        }
    }, [theme, setTheme])
    return (
        <button className="w-8 h-8 tablet:w-11 tablet:h-11 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-700"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="tablet:w-[22px] w-[20px] h-auto" /> : <Moon className="tablet:w-[22px] w-[20px] h-auto" />}
        </button>
    )
}