import { Button } from '@/components/ui/button'
import { ChevronRight, Luggage } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
  return (
    <div className='h-screen lg:h-[90vh] w-full relative'>
        <div className='h-full w-full relative'>
            <Image src="/hero.jpg" className='w-full h-full object-cover  brightness-70' fill alt="Background" />
        </div>

        <div className='absolute h-full w-full flex justify-center gap-8  flex-col top-0 lg:p-10 p-5'>
            <h1 className='text-white font-semibold text-5xl  md:text-6xl max-w-xl text-left'>
    Explore Pakistan, wherever you are
      </h1>
      <div className='flex gap-4'>

   <Link href="/tours">
      <Button className='bg-yellow-500 hover:bg-yellow-600 w-max py-5 text-white  rounded-full cursor-pointer'>
        <Luggage />
          View Packages
      </Button>
   </Link>
   <Link href="/#why">
 <Button variant="ghost" className='w-max  py-5 hover:gap-4 text-white underline rounded-full cursor-pointer'>
          Learn more 
      </Button>
   </Link>

      </div>
        </div>
      
    </div>
  )
}
