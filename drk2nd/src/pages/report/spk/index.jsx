'use client';

import React, { useState } from 'react';
import HeroReportSpk from '../../../../Components/Report/HeroReportSpk';
import ReportMenuSpk from '../../../../Components/Report/ReportMenuSpk';
import axios from 'axios';
import Swal from 'sweetalert2';
import { testURL } from '@/testURL';
import { getSession, useSession } from 'next-auth/react';

export default function Index() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const { data: session } = useSession(); 
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!startDate || !endDate) {
    return Swal.fire({
      icon: 'warning',
      title: 'Tanggal belum dipilih',
      text: 'Silakan pilih tanggal awal dan akhir terlebih dahulu.',
    });
  }
  try {
  const response = await axios.get(`${testURL}/api/laporan/spk`, {
    params: {
      startDate,
      endDate,
    },
  });

  if (response.data.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Tidak Ada Data',
      text: 'Tidak ada absensi yang ditemukan untuk tanggal tersebut.',
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Data absensi berhasil diambil.',
      timer: 1500,
      showConfirmButton: false
    });
  }

  setData(response.data.data); // <- karena response.data ada di dalam `data`

} catch (error) {
  Swal.fire({
    icon: 'error',
    title: 'Gagal Mengambil Data',
    text: error.response?.data?.message || 'Terjadi kesalahan saat mengambil data.',
  });
}
};

  return (
    <>
      <HeroReportSpk />
      <ReportMenuSpk />

      <section className="py-10 dark:bg-gray-900">
        <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
          <div className="w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <h1 className="text-center mt-1 font-semibold dark:text-gray-300">Cek SPK</h1>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Tanggal Awal</h3>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-gray-700 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
                <div className="w-full">
                  <h3 className="dark:text-gray-300 mb-2">Tanggal Akhir</h3>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-gray-700 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                  />
                </div>
              </div>
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button type="submit" className="w-full p-4 cursor-pointer">
                  Cek SPK
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Daftar SPK</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-center">Nama</th>
                <th className="py-3 px-6 text-center">Jumlah SPK</th>
                <th className="py-3 px-6 text-center">Total Modal</th>
                <th className="py-3 px-6 text-center">Total Invoice</th>
                <th className="py-3 px-6 text-center">Total Gaji</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-center">{user.nama_user}</td>
                    <td className="py-3 px-6 text-center">{user.jumlah_spk}</td>
                    <td className="py-3 px-6 text-center">Rp {user.total_modal.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-6 text-center">Rp {user.total_pengerjaan.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-6 text-center">Rp {user.total_gaji.toLocaleString('id-ID')}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const allowedRanks = ['Training', 'Expert', 'Manager'];
  const session = await getSession(ctx);
  if (!session || allowedRanks.includes(session.user.rank) ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...session,
    },
  };
}