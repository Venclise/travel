"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './button'
import { Luggage, Menu, Package, TentTree } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { category } from '@/lib/constants'


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {

  const path = usePathname()

  return (
    <div className={`${path === "/dashboard" || path === "/dashboard/add" ? "hidden" : "flex"} w-full h-max p-5  absolute top-0 left-0 z-[50] flex items-center justify-between`}>
      <div>

      <Link href="/"  >
    <TentTree className='bg-yellow-400 p-3 rounded-full' size={50}/>
      </Link>
      </ div>
  

         <div className="lg:flex items-center gap-2 hidden">
         
          {category.map(({ id, title, slug }) => (
            <Link href={`/tours/${slug}`} key={id} className={`text-sm  ${path === "/" ? 'text-neutral-50' : "text-neutral-800" }  hover:underline`}>
              {title}
            </Link>
          ))}

      <Link href="/tours">
      <Button className='bg-yellow-500 text-white rounded-full cursor-pointer hover:bg-yellow-600'>
        <Luggage />
         Explore Packages
      </Button>
      </Link>
      </div>

      <Sheet>
  <SheetTrigger className='lg:hidden'>
    <Menu className={`${path === "/" ? 'text-neutral-50' : "text-neutral-800"} `} />
  </SheetTrigger>
  <SheetContent className='lg:hidden'>
    <SheetHeader>
      <SheetTitle>
         <Link href="/">
      <Image src="/icon.png" alt="Icon" height="50" width="50" className='bg-yellow-400 rounded-full'/>
      </Link>
      </SheetTitle>
      <SheetDescription>
              <div className="flex flex-col justify-around h-[85vh] ">
          <Link href={`/tours`}className='text-md text-neutral-800 hover:underline'>
              All Tours
            </Link>
          {category.map(({ id, title, slug }) => (
            <Link href={`/tours/${slug}`} key={id} className='text-md text-neutral-800 hover:underline'>
              {title}
            </Link>
          ))}

      <Link href="/tours">
      <Button className='bg-yellow-500 text-white w-full cursor-pointer hover:bg-yellow-600'>
        <Luggage />
         Explore Packages
      </Button>
      </Link>
      </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>
  )
}
