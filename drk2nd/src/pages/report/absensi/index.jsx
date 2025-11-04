'use client';

import React, { useState } from 'react';
import HeroReportUser from '../../../../Components/Report/HeroReportUser';
import ReportMenuUser from '../../../../Components/Report/ReportMenutUser';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function Index() {
  const { data: session } = useSession();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);

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
    const response = await axios.post(`${testURL}/api/totjam`, {
      startDate,
      endDate,
    });
    
    if (response.data.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Tidak Ada Data',
        text: 'Tidak ada SPK yang ditemukan untuk tanggal tersebut.',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data SPK berhasil diambil.',
        timer: 1500,
        showConfirmButton: false
      });
    }
    setData(response.data);
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
      <HeroReportUser />
      <ReportMenuUser />

      <section className="py-10">
        <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
          <div className="w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center">
            <h1 className="text-center mt-1 font-semibold">Cek Absensi</h1>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                <div className="w-full">
                  <h3 className="mb-2">Tanggal Awal</h3>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-gray-700 p-4 w-full border-2 rounded-lg"
                  />
                </div>
                <div className="w-full">
                  <h3 className="mb-2">Tanggal Akhir</h3>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-gray-700 p-4 w-full border-2 rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                <button type="submit" className="w-full p-4 cursor-pointer">
                  Cek Absensi
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Daftar Absensi</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Rank</th>
                <th className="py-3 px-6 text-left">Total Duty</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((user, index) => {
                  const jam = Math.floor(user.totalJam);
                  const menit = Math.round((user.totalJam - jam) * 60);
                  return (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{user.nama}</td>
                      <td className="py-3 px-6 text-left">{user.rank}</td>
                      <td className="py-3 px-6 text-left">{jam} jam {menit} menit</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400">
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
