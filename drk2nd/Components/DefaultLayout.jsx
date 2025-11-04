'use client'
import React from 'react'
import Navbars from './Navbars'
import Footers from './Footers'
export default function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbars />
      <main className="flex-grow pt-16 bg-white">
        {children}
      </main>
      <Footers />
    </div>
  )
}
