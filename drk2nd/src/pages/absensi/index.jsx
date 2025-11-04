'use client';

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function AbsenPage() {
  const { data: session } = useSession();
  const [tglAbsen1, setTglAbsen1] = useState('');
  const [tglAbsen2, setTglAbsen2] = useState('');
  const [totalJam, setTotalJam] = useState('');

  const hitungTotalJam = (start, end) => {
    if (!start || !end) return '';

    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime - startTime;

    if (diffMs <= 0) return 'Invalid';

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours} jam ${diffMinutes} menit`;
  };

  useEffect(() => {
    setTotalJam(hitungTotalJam(tglAbsen1, tglAbsen2));
  }, [tglAbsen1, tglAbsen2]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session || !session.user?.id_user) {
      Swal.fire({
        icon: 'error',
        title: 'Tidak terautentikasi',
        text: 'Silakan login terlebih dahulu.',
      });
      return;
    }
    try {
      const response = await fetch(`${testURL}/api/absencok`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_user: session.user.id_user,
          nama_user : session.user.nama,
          tgl_absen1: tglAbsen1,
          tgl_absen2: tglAbsen2,
          total_duty :  totalJam
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          html: `Absensi berhasil disimpan.<br/>Total Jam Kerja: <b>${totalJam}</b>`,
        });
        setTglAbsen1('');
        setTglAbsen2('');
        setTotalJam('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: data.message || 'Terjadi kesalahan saat menyimpan absensi.',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal menghubungi server.',
      });
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/logo/gambar.png')" }}
    >
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Absensi</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                Onduty Date & Time
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="datetime-local"
                value={tglAbsen1}
                onChange={(e) => setTglAbsen1(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                Offduty Date & Time
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="datetime-local"
                value={tglAbsen2}
                onChange={(e) => setTglAbsen2(e.target.value)}
                required
              />
            </div>

            {totalJam && totalJam !== 'Invalid' && (
              <div className="mb-4 text-green-700 font-semibold text-sm">
                Total Jam Kerja: {totalJam}
              </div>
            )}
            {totalJam === 'Invalid' && (
              <div className="mb-4 text-red-500 text-sm">
                Waktu off-duty harus lebih besar dari on-duty.
              </div>
            )}

            <div className="mb-6">
              <button
                type="submit"
                disabled={totalJam === 'Invalid'}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Absen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const allowedRanks = ['Manager', 'Head', 'Co-Owner','Owner'];
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