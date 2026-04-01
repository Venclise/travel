import { category } from '@/lib/constants'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'

export default function Footer() {
  return (
    <div className='bg-gray-50 border-t lg:p-20 p-10 h-max w-full flex flex-wrap '>
                 <div className='flex flex-col gap-3 w-max'>
<h4 className='font-semibold'>Quick Links</h4>
          {category.map(({ id, title, slug }) => (
              <Link href={`/tours/${slug}`} key={id} className="text-sm underline">
              {title}
            </Link>
          ))}
          </div>

                <div className='flex flex-col gap-3 w-max'>
               <h4 className='font-semibold'>Contact us</h4>
                     <Link
  href="https://wa.me/923165575485?text=Hi%20I%20want%20to%20discuss%20a%20project"
  target="_blank"
  rel="noopener noreferrer"
    className="text-sm underline flex items-center gap-2"
>
    <Image src="/whatsapp.svg" alt="whatsapp" height={15} width={15} />
    Chat on Whatsapp
    </Link>
   <a href="mailto:weblifyorg@gmail.com"
    className="text-sm underline flex items-center gap-2"
    
   >
    <Mail strokeWidth={1} size={15}/>
    weblifyorg@gmail.com</a>
    <Link href="https://www.instagram.com/weblifyorg/" 
       className="text-sm underline flex items-center gap-2"
    >
        <Image src="/insta.svg" alt="whatsapp" height={15} width={15} />
              On Instagram
            </Link> 
          </div>
          <div className='m-8'>
            <p className='text-lg '>Website made by</p>
            <Link href="https://weblify-nu.vercel.app" className='font-bold underline text-5xl'>
            WEBLIFY
            </Link>
          </div>
    </div>
  )
}
