import ProductCard from "@/components/products/ProductCard";
import React from "react";

const slugToCategory = (slug?: string) => {
  if (!slug) return "";
  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export default async function page({
  params,
}: {
  params: { category?: string; subcategory?: string };
}) {
  const { category } = await params;

  const formattedCategory = slugToCategory(category);

  const query = new URLSearchParams({
    category: formattedCategory,
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/tour?${query.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Failed to fetch products</p>;
  }

  const products = await res.json();

  return (
    <div className="mt-12  p-1">
      <div className="flex flex-col gap-2 mt-12 px-5">

      <h1 className="text-3xl   ">
      Choose a 
      {" "}
      <span className="capitalize">
      {category}
      </span>
      {" "}
       package
      </h1>

      <p className="text-xs max-w-lg text-neutral-900">
      
We’ve put together packages of incredible activities and hotels so you can get straight into your 
{" "}
<span className="capitalize">
  {category}
</span>
{" "}
 experience. Choose the itinerary you love the most and customise it to suit you.

      </p>
      </div>


 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-5  gap-y-20 py-20">
        {products.map((product: any) => (
          <ProductCard data={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
