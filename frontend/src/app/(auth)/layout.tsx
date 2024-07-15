import React from 'react'


const AuthLayout = ({children}: Readonly<{children:React.ReactNode }>) => {
  return (
    <main className='min-h-screen flex w-full justify-between'>
        {children}
        <div className='auth-asset'>
          <div className='bg-black-1'>

          </div>
        </div>
    </main>
  )
}

export default AuthLayout