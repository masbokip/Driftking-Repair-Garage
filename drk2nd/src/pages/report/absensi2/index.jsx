'use client';

import React, { useState } from 'react';
import HeroReportUser from '../../../../Components/Report/HeroReportUser';
import ReportMenuUser from '../../../../Components/Report/ReportMenutUser';
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
      const response = await axios.get(`${testURL}/api/laporan/absensi`, {
        params: { startDate, endDate },
      });

      if (response.data.data.length === 0) {
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
          showConfirmButton: false,
        });
      }

      setData(response.data.data);
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
        <h1 className="text-3xl font-bold text-center mb-8">Laporan Absensi</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Rank</th>
                <th className="py-3 px-6 text-left">Jumlah Absensi</th>
                <th className="py-3 px-6 text-left">Total Durasi</th>
                <th className="py-3 px-6 text-left">Bonus</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((user, index) => {
                  const jam = Math.floor(user.total_durasi);
                  const menit = Math.round((user.total_durasi - jam) * 60);

                  return (
                    <React.Fragment key={index}>
                      <tr className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6">{user.nama_user}</td>
                        <td className="py-3 px-6">{user.rank}</td>
                        <td className="py-3 px-6">{user.jumlah_absensi_berhasil}</td>
                        <td className="py-3 px-6">
                          {jam} jam {menit} menit
                        </td>
                        <td className="py-3 px-6">Rp {user.bonus.toLocaleString('id-ID')}</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td colSpan={5} className="py-2 px-6">
                          <strong>Daftar Absensi:</strong>
                          <ul className="ml-4 list-disc">
                            {user.daftar_absensi.map((absen, i) => {
                              const d = new Date(absen.tanggal);
                              const tanggal = d.toLocaleDateString('id-ID');
                              return (
                                <li key={i}>
                                  {tanggal} - {parseFloat(absen.durasi_jam).toFixed(2)} jam
                                </li>
                              );
                            })}
                          </ul>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })
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