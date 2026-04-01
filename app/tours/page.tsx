
import ProductsGrid from '@/components/products/ProductsGrid'
import { Suspense } from 'react'



export default async function  page() {
 
 



  return (
  
<div className='mt-24'>
  
<Suspense fallback={<p>Loading products...</p>}>
        <ProductsGrid/>
      </Suspense>
</div>
         

  )
}
