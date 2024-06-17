import Image from 'next/image'
import React from 'react'

const RootLayout = ({children}: Readonly<{children:React.ReactNode }>) => {
  return (
    <main className='min-h-screen flex w-full justify-between'>
        {children}
        <div className='auth-asset'>
          <div>
            {/* <Image 
            src="/icons/auth-image.svg"
            alt="Auth Image"
            width={500}
            height={500}
            /> */}
          </div>
        </div>
    </main>
  )
}

export default RootLayout