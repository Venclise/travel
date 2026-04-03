import { Button } from '@/components/ui/button'
import { category } from '@/lib/constants'
import {  Luggage, RectangleCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Category() {
  return (
    < div className='w-full h-max p-1 py-10 lg:p-10 flex flex-col items-center gap-8'>
  <h2 className='text-black text-center uppercase text-xl max-w-xl '>
        Explore Tours
    </h2>
    <div className='grid grid-cols-2 h-max gap-2 w-full  '>
      <Link href="/tours/dubai" className=' h-[50vh] md:h-screen lg:h-[150vh] p-5  relative flex items-end'>
           <Image src="/dubai.jpg" fill className="z-[-1]  rounded-md w-full h-full object-cover  brightness-70" alt="Fairy Meadows"/>
                      

      <Button className='bg-transparent  text-md underline hover:bg-yellow-600 w-max py-5 text-white z-100  rounded-full cursor-pointer'>
        <RectangleCircle />
        Dubai
      </Button>
  
      </Link>
          <Link href="/tours/turkey" className='h-[50vh] md:h-screen lg:h-[150vh] p-5 relative flex items-end'>

           <Image src="/turkey.jpg" fill className=" z-[-1]  rounded-md w-full h-full object-cover  brightness-70" alt="Hunza"/>
                  

      <Button className='bg-transparent underline text-md hover:bg-yellow-600 w-max py-5 text-white z-100  rounded-full cursor-pointer'>
        <RectangleCircle />
          Turkey
      </Button>
   
      </Link>
    <Link href="/tours/thailand" className='h-[50vh] md:h-screen lg:h-[150vh] p-5 relative flex items-end'>
           <Image src="/thailand.jpg" fill className="w-full rounded-md h-full object-cover  brightness-70 z-[-1]" alt="Murree"/>
                      
 
      <Button className='bg-transparent text-md underline hover:bg-yellow-600 w-max py-5 text-white z-100  rounded-full cursor-pointer'>
        <RectangleCircle />
          Thailand
      </Button>

      </Link>

     <Link href="/tours/maldives" className='h-[50vh] md:h-screen lg:h-[150vh] p-5 relative flex items-end '>
           <Image src="/maldives.jpg" fill className="w-full  rounded-md h-full object-cover z-[-1]  brightness-70" alt="Hunza"/>
           

      <Button className='bg-transparent text-md underline hover:bg-yellow-600 w-max py-5 text-white z-100  rounded-full cursor-pointer'>
        <RectangleCircle />
        Maldives
      </Button>

      </Link>
    </div>
    <div className='flex w-full  flex-col gap-4'>
      <h2  className='text-2xl'>
        Explore more categories 
      </h2>
      <div className='flex items-center w-full flex-wrap gap-4 mx-2'>

         {category.map(({ id, title, slug }) => (
           <Link href={`/tours/${slug}`} key={id} className='lg:text-xl text-md hover:text-black text-neutral-800 hover:underline'>
              {title}
            </Link>
          ))}
          </div>
    </div>
    </div>
  )
}
