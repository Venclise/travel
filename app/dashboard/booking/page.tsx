import React, { cache } from 'react'
import ActiveBookings from './ActiveBookings'

export default  async function page
() {
// const baseUrl =
// process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
//     const res = await fetch(`${baseUrl}/api/booking`, {
//         cache:"no-store"
//     } )

//     if(!res.ok ) {
//         console.log("Error fetching the bookings")
//     }

//     const data = await res.json()
//     console.log(data)

  return (
  <div >
  <ActiveBookings />
      
    </div>
  )
}
