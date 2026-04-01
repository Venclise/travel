import { Bubbles, Car, GraduationCap } from 'lucide-react'
import React from 'react'

export default function Why() {
  return (
    <div id="why" className='lg:p-10 p-5 flex flex-col gap-8'>
         <h2  className='text-4xl md:text-5xl text-yellow-500 font-semibold'>
    Why Book Pakistan Tour with us?
      </h2>

      <ul className='flex flex-col gap-4'>
        <li className='text-lg flex items-center gap-2' >
            <Bubbles />
            Featuring comfortable accommodation
        </li>
            <li className='text-lg flex items-center gap-2' >
            <GraduationCap />
        Expert guides
        </li>
            <li className='text-lg flex items-center gap-2' >
            <Car />
     Convenient transportation
        </li>
      </ul>
      <p className=' text-sm max-w-lg  '>
        We offers affordable adventures that are fun and affordable. To provide our guests with a truly memorable travel experience, we hand pick every hotel and restaurant and design every tour with care.
      </p>
    </div>
  )
}
