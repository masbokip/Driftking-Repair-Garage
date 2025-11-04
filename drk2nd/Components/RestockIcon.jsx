import React from 'react'
import Image from "next/image"; 

export default function RestockIcon() {
  const cards = [
    {
      title: 'Advance Repair Kit',
      description: 'Berfungsi untuk servis mesin kendaraan menjadi 100%',
      image: '/images/iventory/Adv.png',
      tag: 'Not for Sale',
      time: 'Tidak dijual umum',
      comments: 39,
    },
    {
      title: 'Body Kit',
      description: 'Berfungsi untuk servis body kendaraan, seperti pintu hilang akan kembali normal',
      image: '/images/iventory/Bodykit.png',
      tag: 'Not for Sale',
      time: 'Tidak dijual umum',
      comments: 0,
    },
    {
      title: 'Tire Kit',
      description: 'Berfungsi untuk servis ban kendaraan, ban kempes kembali normal 1 tire kit bisa dipakai 4 ban',
      image: '/images/iventory/Tirekit.png',
      tag: 'Not for Sale',
      time: 'Tidak dijual umum',
      comments: 0,
    },
    {
      title: 'Kanebo',
      description: 'Untuk cuci kendaraan menjadi bersih',
      image: '/images/iventory/Kabeno.png',
      tag: 'For Sale',
      time: 'Dijual untuk umum',
      comments: 9,
    },
    {
      title: 'Repairkit',
      description: 'Berfungsi untuk servis mesin kendaraan sebanyak 40%',
      image: '/images/iventory/Repairkit.png',
      tag: 'For Sale',
      time: 'Dijual untuk umum',
      comments: 9,
    },
    {
      title: 'Wrench',
      description: 'Alat untuk servis',
      image: '/images/iventory/Wrench.png',
      tag: 'For Sale',
      time: 'Dijual untuk umum',
      comments: 9,
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
          <a href="#" className="font-semibold inline-block">Fungsi Tools</a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {cards.map((item, index) => (
          <div key={index} className="rounded overflow-hidden shadow-lg flex flex-col">
            <div className="relative">
              <a href="#">
                <img className="w-full" src={item.image} alt={item.title} />
                <div className="hover:bg-transparent transition duration-300 absolute inset-0 bg-gray-900 opacity-25"></div>
              </a>
              <a href="#!">
                <div className="text-xs absolute top-0 right-0 bg-red-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-red-600 transition duration-500 ease-in-out">
                  {item.tag}
                </div>
              </a>
            </div>
            <div className="px-6 py-4 mb-auto">
              <a href="#" className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                {item.title}
              </a>
              <p className="text-gray-500 text-sm">
                {item.description}
              </p>
            </div>
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
              <span className="text-xs text-gray-900 flex items-center">
                <span className="ml-25">{item.time}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
