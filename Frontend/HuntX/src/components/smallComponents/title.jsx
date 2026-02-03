import React from 'react'

const title = ({text,subtitle}) => {
  return (
<>
    <main className='flex flex-col gap-2'>
        <h1 className='font-medium text-xl'>{text}</h1>
        <h1 className='text-4xl text-black font-semibold'>{subtitle}</h1>
    </main>
</>

  )
}

export default title