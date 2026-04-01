"use client"


import { Input } from './ui/input'
import {  Search } from 'lucide-react'


import { useEffect, useState } from "react"
import { Spinner } from "./ui/spinner"
import { useRouter } from "next/navigation"

import Link from "next/link"
import { category } from '@/lib/constants'


import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"




export default function   SearchInput() {
  const router = useRouter()
   const [results,setResults]  = useState<any[]>([])
   const [search,setSearch] = useState("")
   const [loading,setLoading] = useState(false)
   
  useEffect(() => {
     if(search.length < 2 || !search) {
         setResults([])
         setLoading(false)
         return
     }
   

     const timer = setTimeout(async() => {
      
      setLoading(true)
      const res = await fetch(`api/tour?search=${search}`)
      const data = await res.json()
      setResults(data)
      setLoading(false)
    },400)
    
     return () => clearTimeout(timer)
    
  },[search])




  return (
<Combobox items={results}>      
  <div className="flex items-center gap-4 bg-gray-50  rounded-full px-5 py-3" >
    <Search strokeWidth={1} size={15} className='w-max'/>
<ComboboxInput type="text" placeholder="Search here" value={search} className=" focus-visible:ring-gray-100 w-full font-semibold placeholder:text-gray-800 text-xl border-0 ring-0  " onChange={(e) => setSearch(e.target.value)}/>
  </div>

<ComboboxContent className="flex flex-col h-[50vh] w-full ">
     {results.length > 0 ? (
        <ComboboxList className=" bg-gray-50 flex flex-col w-full mt-12  z-50">
          <span className="text-sm font-semibold text-yellow-500 ">
          Related Searches
          </span>
          {results.map((item) => (
            <div
            key={item._id}  
            className="p-2 w-full  hover:bg-gray-100 rounded-md hover:text-yellow-500"
            onClick={() => {router.push(`/products/item/${item._id}`)}}
            >
              <div className="w-full text-left flex items-center gap-2 cursor-pointer">
                <Search className="w-4 h-4 "/>
              {item.title}
              </div>
            </div>
          ))}
        </ComboboxList>
      ): (
         <ComboboxList className={`${search.length ? "hidden" : "flex"} bg-gray-50  flex-col w-full p-10  z-50 `}>
          <span className="text-md font-semibold p-2 text-yellow-500">
           Quick Search
          </span>
          {category.map((item) => (
            
            <Link
            href={item.slug}
            key={item.title}
            className="p-2 w-full  hover:bg-gray-100 rounded-md hover:text-yellow-500"
            >
              <div className="w-full text-left flex items-center gap-2 cursor-pointer">
                <Search className="w-4 h-4 "/>
                <span className="text-sm">
              {item.title}
                </span>
             
              </div>
            </Link>
          ))}
          </ComboboxList>
      )}
      {loading &&
<div className='h-full w-full  flex items-center justify-center'>
       <p className=" flex items-center "><Spinner />Loading</p>
</div>
}
    </ComboboxContent>



        </Combobox>
    
  )
}
