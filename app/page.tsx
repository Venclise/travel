import Category from '@/sections/Category'
import Hero from '@/sections/Hero'
import Why from '@/sections/Why'
import React from 'react'

export default function page() {
  return (
    <div className='h-max flex flex-col'>
      <Hero />
      <Category />
      <Why />
    </div>
  )
}
