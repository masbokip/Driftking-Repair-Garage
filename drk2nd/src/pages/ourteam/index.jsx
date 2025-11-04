'use client';
import IntroTeam from '../../../Components/IntroTeam';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { testURL } from '@/testURL';

export default function Index() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${testURL}/api/ambilusers`);
        setUsers(res.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (loading) {
    return <p className="text-white text-center py-10">Loading...</p>;
  }

  return (
    <>
      <IntroTeam />
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#FF9B17] to-[#EB5B00] bg-clip-text text-transparent">
              Kenali Tim Hebat Kami
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#FF9B17] to-[#EB5B00] mx-auto mb-2 rounded-full"></div>
            <p className="text-gray-600 text-lg">
              Kami adalah tim mekanik yang dinamis dan penuh semangat, bekerja bersama untuk memastikan kendaraan Anda dalam kondisi prima.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentItems.map((user, index) => (
              <div className="group" key={index}>
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={`${testURL}/assets/images/user/${user.foto}`}
                    alt={user.nama}
                    className="w-full aspect-[3/4] object-cover object-top transform group-hover:scale-105 transition duration-300 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800">{user.nama}</h3>
                  <p className="text-indigo-600 font-medium">{user.rank}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="flex justify-between items-center mt-6 max-w-xs mx-auto">
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={handlePreviousPage}
                  className={`px-3 py-1 rounded-md ${currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
