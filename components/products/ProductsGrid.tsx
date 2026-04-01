"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ProductCard from "./ProductCard";
import { category } from "@/lib/constants";
import Link from "next/link";
import SearchInput from "../SeachInput";
import { Filter } from "lucide-react";




export default function ProductsGrid() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const sale = searchParams.get("sale");
  const sort = searchParams.get("sort");

  useEffect(() => {
    async function fetchProducts() {
      const params = new URLSearchParams();

      if (sort) params.set("sort", sort);
      if (sale) params.set("sale", "true");

      const url = `/api/tour${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch the products");
      }
      const data = await res.json();

      setProducts(data);
    }

    fetchProducts();
  }, [sale, sort]);

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
            
            if (value === "newest") {
              params.set("sort", "newest");
              params.delete("sale");
            }
            
            if (value === "sale") {
              params.set("sale", "true");
              params.delete("sort");
            }
            
            router.push(`/tours?${params.toString()}`);
          }}
          >
          <SelectTrigger className="w-max rounded-full">
            <SelectValue placeholder={<Filter />} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="sale">On Sale</SelectItem>
          </SelectContent>
        </Select>
          </div>
      </div>

      <div className="grid grid-cols-2 justify-center items-center md:grid-cols-3 lg:grid-cols-5 gap-y-20 py-20 ">
        {products.map((item) => (
          <ProductCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}
