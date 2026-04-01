"use client"

import Image from "next/image"
import Link from "next/link"

import { usePathname } from "next/navigation"


import { Badge } from "../ui/badge"
import ProductActions from "../dashboard/ProductActions"
import { Clock } from "lucide-react"

type ProductData = {
  _id: string
  title: string
  price: number
  cutprice: number
  description: string
  category: string
  image: string[]
  sold: number
  nights: number
  days: number
}





export default function ProductCard({ data }: { data: ProductData }) {
  const pathname = usePathname()
  const isDashboard = pathname === "/dashboard"

  

    

  

  return (
    
    <div 
          className="h-[20rem] md:h-[22rem] lg:h-[25rem] lg:w-[15rem]  w-[12rem]  group  relative   bg-white "
    >
    <Link
      href={`${isDashboard ? "#" : `/tours/item/${data._id}`}`}
      className="h-full w-full"
    >
      <div className="w-full h-full relative overflow-hidden">
        <Image
          src={data.image[0]}
          alt={data.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            !isDashboard && data.image.length > 1
              ? "group-hover:opacity-0"
              : ""
          }`}
        />

      
        {!isDashboard && data.image.length > 1 && (
          <Image
            src={data.image[1]}
            alt={data.title}
            fill
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        
        {!isDashboard &&  data.cutprice > data.price &&  (
          <Badge className="absolute text-xs top-3 left-3 rounded-full bg-neutral-100  text-green-700 uppercase">
         
  Save {Math.round(((data.cutprice - data.price) / data.cutprice) * 100)}%
          </Badge>
        )}

            
        {isDashboard && (
          <Badge className="absolute text-xs top-3 left-3 rounded-xs bg-green-100 text-black uppercase">
            {data.sold}
          </Badge>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
      

        {
          isDashboard && (
            <ProductActions id={data._id}/>
          )
        }


        
        <h2 className="text-xs md:text-sm  line-clamp-1 uppercase ">{data.title}</h2>


        <div className="flex  gap-4 flex-col">

          <div className="flex items-center flex-row-reverse gap-2 ">
<div className="flex items-center text-xs font-semibold gap-1">
  <Clock size={15}/>
   {data.days} Days,{data.nights} nights 
</div>

          <p className="text-xs  flex items-center font-bold ">
            <span className=" text-sm   ">Rs.</span>
            {data.price.toLocaleString()}
          </p>
          </div>
        </div>
      </div>
    </Link>
    </div>

  )
}
