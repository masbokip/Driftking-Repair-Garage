'use client';

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { testURL } from '@/testURL';
import { getSession, useSession } from 'next-auth/react';

export default function IzinForm() {
  const { data: session } = useSession();
  const [alasanIC, setAlasanIC] = useState('');
  const [alasanOOC, setAlasanOOC] = useState('');
  const [durasiIzin, setDurasiIzin] = useState('');

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
      const response = await fetch(`${testURL}/api/izin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_user: session.user.id_user,
          nama_user: session.user.nama,
          alasan_ic: alasanIC,
          alasan_ooc: alasanOOC,
          durasi: durasiIzin,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          html: `Izin berhasil dibuat.<br/>Durasi Izin: <b>${durasiIzin}</b>`,
        });
        setAlasanIC('');
        setAlasanOOC('');
        setDurasiIzin('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: data.message || 'Terjadi kesalahan saat menyimpan izin.',
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
    <div className="bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/logo/gambar.png')" }}>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Izin Duty</h1>
          <form onSubmit={handleSubmit}>
            {[{
              label: 'Alasan IC',
              value: alasanIC,
              setValue: setAlasanIC,
              placeholder: 'Masukkan Alasan Izin IC'
            }, {
              label: 'Alasan OOC',
              value: alasanOOC,
              setValue: setAlasanOOC,
              placeholder: 'Masukkan Alasan Izin OOC'
            }, {
              label: 'Lama Izin',
              value: durasiIzin,
              setValue: setDurasiIzin,
              placeholder: 'Masukkan Durasi Izin'
            }].map(({ label, value, setValue, placeholder }, idx) => (
              <div className="mb-4" key={idx}>
                <label className="block font-semibold text-gray-700 mb-2">{label}</label>
                <input
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                   placeholder={placeholder}
                />
              </div>
            ))}
            <div className="mb-6">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                Kirim Izin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
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