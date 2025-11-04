import React from 'react'

export default function HeroArea() {
  return (
    <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
  <div class="absolute inset-0">
    <img src="/images/logo/gambar.png" alt="Background Image" class="object-cover object-center w-full h-full" />
    <div class="absolute inset-0 bg-black opacity-50"></div>
  </div>
  
  <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
    <h1 class="text-5xl font-bold leading-tight mb-4">Halaman Restock</h1>
    <p class="text-lg text-gray-300 mb-8">Input Data Restock Dibawah Ya Ges</p>
  </div>
  
</div>

  )
}
