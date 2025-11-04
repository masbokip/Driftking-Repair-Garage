import React from "react";
export default function IntroTeam() {
   
  return (
<section class="w-full flex bg-gray-100">
  <div class="max-w-7xl mx-auto py-16 px-4 sm:py-16 sm:px-6 lg:px-8">
    <div class="text-center space-y-5">
      <div class="inline-flex items-end justify-center w-full text-center mx-auto">
        {/* <img src="/images/teams/1.png" class="absolute transform translate-x-24 ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white"/> */}
        <img src="https://cdn.devdojo.com/tails/avatars/002.jpg" class="absolute transform -translate-x-24 -ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white"/>
        <img src="https://cdn.devdojo.com/tails/avatars/003.jpg" class="absolute transform -translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white"/>
        <img src="/images/teams/2.png" class="absolute transform translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white"/>
        <img src="/images/teams/1.png" class="rounded-full w-20 h-20 md:w-24 md:h-24 border-4 border-white relative"/>
      </div>
      <p
        class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
        Ada Tim Hebat,
        <span class="px-2 py-1 relative inline-block"><svg class="stroke-current bottom-0 absolute text-blue-300 -translate-x-2" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg"><path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" stroke-width="12" fill="none" fill-rule="evenodd" stroke-linecap="round"></path></svg>
        <span class="relative">
        Di Balik Setiap Mesin Hebat
        </span>
        </span>
      </p>
      <p class="max-w-3xl mt-5 mx-auto text-xl text-gray-600">
        Setiap kendaraan yang kami tangani mencerminkan dedikasi dan keterampilan tim kami. 
        Dengan pengalaman, ketelitian, dan semangat otomotif,
        kami memastikan setiap mesin kembali bekerja dengan performa terbaiknya.
      </p>
    </div>
  </div>
</section>

  )
}
