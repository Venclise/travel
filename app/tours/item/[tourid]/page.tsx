import RecommendProducts from '@/components/products/RecommendedProducts';
import SingleProduct from '@/components/products/singleProduct';
import type { Metadata, ResolvingMetadata } from 'next'



type Props = {
  params: Promise<{ tourid: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { tourid } = await params
 

     const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"



    const res = await fetch(`${baseUrl}/api/tour/${tourid}`,{cache:"no-store"})
    if(!res.ok) {
      throw new Error("Failed to fetched the Product")
    }

    const product =  await res.json()
 

  return {
    title: product.title,
    description: product.description,
      openGraph: {
       images: [`${product.image[0]}`],
     },

  }
}

export default async function page(
{
    params, 
}: {
  params: Promise<{ tourid: string }>
}
) {

  const {tourid} = await params;
    const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

      const res = await fetch(`${baseUrl}/api/tour/${tourid}`,{cache:"no-store"})
    if(!res.ok) {
      throw new Error("Failed to fetched the Product")
    }

    const product =  await res.json()



    const recommendRes = await fetch(`${baseUrl}/api/tour/related?category=${product.category}&productId=${product._id}`)
     if(!recommendRes.ok) {
       throw new Error("Failed to fetched the Product")
     }

       const data = await recommendRes.json()

  
    
  return (
    <div className='mt-12'>
     
           <SingleProduct product={product} />
            {data.length > 0 && <RecommendProducts data={data}/>} 
    </div>
  )
}
