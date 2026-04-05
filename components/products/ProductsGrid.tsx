"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator
} from "../ui/select";
import ProductCard from "./ProductCard";
import { category, Tourtypes } from "@/lib/constants";
import Link from "next/link";
import SearchInput from "../SeachInput";
import { Filter, Flag, Search } from "lucide-react";
import Loading from "@/app/tours/loading";





export default function ProductsGrid() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading,setLoading] = useState(false)
  const sale = searchParams.get("sale");
  const sort = searchParams.get("sort");
  const tourtype= searchParams.get("tourtype")

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const params = new URLSearchParams();

      if (sort) params.set("sort", sort);
      if (sale) params.set("sale", "true");
         if(tourtype) params.set("tourtype",tourtype)

      const url = `/api/tour${
        params.toString() ? `?${params.toString()}` : ""
      }`;

    
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch the products");
      }
      const data = await res.json();

      setProducts(data);
      setLoading(false)
    }

    

    fetchProducts();
  }, [sale, sort,tourtype]);

  return (
    <div className="lg:mt-24 mt-12 p-1">
      <div className="flex items-center flex-col-reverse justify-between gap-4 md:p-5 p-1">
    

        <div className="flex w-full items-center">

<div className="w-full ">
<SearchInput />
</ div>


        <Select
          value={sort || ""}
          onValueChange={(value) => {
            const params = new URLSearchParams(searchParams.toString());
            

            params.delete("sort")
            params.delete("sale")
            params.delete("tourtype")



            if (value === "newest") {
              params.set("sort", "newest");
          
            }
            
            else if (value === "sale") {
              params.set("sale", "true");
            
            }else {
              params.set("tourtype",value)
            }
            
           
              router.push(`/tours?${params.toString()}`);
            }}
          >
          <SelectTrigger className="w-max rounded-full">
            <SelectValue placeholder={<Filter />} />
          </SelectTrigger>
          <SelectContent>
          <SelectGroup>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="sale">On Sale</SelectItem>
         </SelectGroup>
          <SelectSeparator />
         <SelectGroup>
          <SelectLabel>Tour Type</SelectLabel>
          {
            Tourtypes.map(({id,title}) => (
              <SelectItem value={title} key={id}>{title}</SelectItem>
            ))
          }
        </SelectGroup>
            </SelectContent>
        </Select>
          </div>
      </div>

      {/* {loading && <Loading />} */}

 <div className={` ${products.length === 0 ? "h-screen w-full flex items-center justify-center" : "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-5  gap-y-20 py-20"}`}>
        {products.map((item) => {
          return (
            
            <ProductCard key={item._id} data={item} />
          )
        }
      )
    }
    { loading==false &&  products.length === 0 && <div className="flex items-center gap-4"> <Search /> No Result Found  </div> }  
      </div>
    </div>
  );
}
