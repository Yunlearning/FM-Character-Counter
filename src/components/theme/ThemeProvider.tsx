import { ThemeProvider } from "next-themes";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}
// "use client"

// import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"

// export function ThemeProvider({
//     children,
//     ...props
// }: React.ComponentProps<typeof NextThemesProvider>) {
//     return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }