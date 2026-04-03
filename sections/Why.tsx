import { Bubbles, Car, GraduationCap, Phone } from 'lucide-react'
import React from 'react'

export default function Why() {
  return (
    <div id="why" className='lg:p-10 p-5 flex items-center justify-center flex-col gap-8'>
         <h2  className='text-4xl text-yellow-500 font-semibold'>
    Why Book Tour with CamPak
      </h2>

      <ul className='flex  gap-4 flex-wrap items-center justify-center'>
        <li className='text-lg text-center flex items-center gap-2 flex-col justify-center' >
            <Phone />
            <span className='font-semibold '>
         24/7 customer support
            </span>

No matter the time zone, we’re here to help.
        </li>
             <li className='text-lg text-center  flex items-center gap-2 flex-col' >
            <GraduationCap />
            <span className='font-semibold'>
         Expert guides
            </span>

Our expert guides will Guide you throughout the tour.
        </li>
                     <li className='text-center  text-lg flex items-center gap-2 flex-col' >

            <Car />
             <span className='font-semibold'>
     Convenient transportation  
            </span> 
            Convenient Transpotation and comfortable journey.
        </li>
      </ul>

    </div>
  )
}
