import Navbar from '@/components/Navbar'
import React from 'react'

const RootLayout = ({children}: Readonly<{children:React.ReactNode }>) => {
  return (
    <main>
        <Navbar/>
        {children}
    </main>
  )
}

export default RootLayout