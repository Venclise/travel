
import ProductsGrid from '@/components/products/ProductsGrid'
import { Suspense } from 'react'
import Loading from './loading'



export default async function  page() {
 
 



  return (
  
<div className='mt-24'>
  
<Suspense fallback={<Loading />}>
        <ProductsGrid/>
      </Suspense>
</div>
         

  )
}
