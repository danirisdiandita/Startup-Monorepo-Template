import React from 'react'

const RootLayout = ({children}: Readonly<{children:React.ReactNode }>) => {
  return (
    <main>
        <h1>this is dashboard path</h1>
        {children}
    </main>
  )
}

export default RootLayout