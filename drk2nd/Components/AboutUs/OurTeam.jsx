'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import { testURL } from '@/testURL';

export default function OurTeam() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${testURL}/api/ambilusers`);
        setUsers(res.data.data.slice(0, 8));
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
      }
    };
    fetchUsers();
  }, []);
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#FF9B17]  to-[#EB5B00] bg-clip-text text-transparent">Kenali Tim Hebat Kami</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#FF9B17]  to-[#EB5B00] mx-auto mb-2 rounded-full"></div>
          <p className="text-gray-600 text-lg">Kami adalah tim mekanik yang dinamis dan penuh semangat, bekerja bersama untuk memastikan kendaraan Anda dalam kondisi prima.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {users.map((user, index) => (
            <div className="group" key={index}>
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={`${testURL}/assets/images/user/${user.foto}`}
                  alt={user.nama}
                  className="w-full aspect-[3/4] object-cover object-top transform group-hover:scale-105 transition duration-300 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800">{user.nama}</h3>
                <p className="text-indigo-600 font-medium">{user.rank}</p>
              </div>
            </div>
          ))}
        </div>
        <div class="mt-10 text-center">
        <div class="inline-block bg-gradient-to-r from-orange-800 to-orange-600 p-px rounded-lg">
          <Link href="/ourteam" class="block bg-[#FCC737] hover:bg-[#FFB200] transition-colors duration-200 rounded-lg px-8 py-4 font-medium text-gray-900">
            Kenali Tim Kami <span class="ml-2">→</span>
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
