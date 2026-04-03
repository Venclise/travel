
import ProductsGrid from '@/components/products/ProductsGrid'
import { Suspense } from 'react'
import Loading from './loading'
import { Metadata } from 'next';



export async function generateMetadata({
  params,
}: {
  params: { category?: string };
}): Promise<Metadata> {
 

  return {
    title:  "CamPak Tours | Explore Our Best Deals",
    description: `Discover incredible activities and hotels with ourpackages. Choose your favorite itinerary and customize your dream experience today.`,
    openGraph: {
      title: `CamPak Travel Experiences`,
      description: `Explore the best activities and luxury stays.`,
      type: "website",
    },
  };
}


export default async function  page() {
 
 



  return (
  
<div className='mt-24'>
  
<Suspense fallback={<Loading />}>
        <ProductsGrid/>
      </Suspense>
</div>
         

  )
}
