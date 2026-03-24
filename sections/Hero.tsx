import Image from 'next/image'
import React from 'react'

export default function Hero() {
  return (
    <div className='h-screen lg:h-[90vh] w-full relative'>
        <div className='h-full w-full relative'>
            <Image src="/hero.jpg" className='w-full h-full object-cover  brightness-70' fill alt="Background" />
        </div>

        <div className='absolute h-full w-full flex items-center top-0 lg:p-10 p-5'>
            <h1 className='text-white font-semibold text-6xl max-w-xl text-left'>
    Explore around, wherever you are, in one day.
      </h1>

      <Button>
          
      </Button>

        </div>
      
    </div>
  )
}
