'use client'
import { useAppSelector } from '@/lib/hooks';
import React, { useEffect } from 'react'


const AuthLayout = ({children}: Readonly<{children:React.ReactNode }>) => {
  const value = useAppSelector(state => state.theme)
  useEffect(() => {
      if (value.mode === "dark") {
        document.body.classList.add("dark");
      } else if (value.mode === "system") {
        if (typeof window !== "undefined") {
          const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
  
          if (theme === "dark") {
            document.body.classList.add("dark");
          }
        }
      } else {
        document.body.classList.remove("dark");
      }
    }, [value.mode]);
  return (
    <main className={`min-h-screen flex w-full justify-between ${value.mode}`}>
        {children}
        <div className='auth-asset'>
          <div className='bg-black-1'>

          </div>
        </div>
    </main>
  )
}

export default AuthLayout