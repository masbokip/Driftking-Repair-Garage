'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { testURL } from '@/testURL';
import { getSession, useSession } from 'next-auth/react';

export default function AddUser() {
const { data: session } = useSession();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    kpassword: '',
    nama: '',
    rank: '',
  });
  const [foto, setFoto] = useState(null);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFoto(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foto) {
      return Swal.fire({
        icon: 'error',
        title: 'Foto belum diunggah',
        text: 'Silakan unggah foto pengguna.',
      });
    }
    if (formData.password !== formData.kpassword) {
      return Swal.fire({
        icon: 'error',
        title: 'Password tidak sama',
        text: 'Konfirmasi password harus sesuai.',
      });
    }
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('foto', foto);

    try {
      const res = await axios.post(`${testURL}/api/register`, data);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: res.data.message,
      }).then(() => window.location.reload());
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: err.response?.data?.message || 'Terjadi kesalahan saat menambahkan user.',
      });
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/logo/gambar.png')" }}
    >
      <div className="min-h-screen flex justify-center items-center pt-10">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Add User</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {[
              { id: 'username', label: 'Username', type: 'text' },
              { id: 'nama', label: 'Full Name', type: 'text' },
              { id: 'password', label: 'Password', type: 'password' },
              { id: 'kpassword', label: 'Confirm Password', type: 'password' },
            ].map(({ id, label, type }) => (
              <div className="mb-4" key={id}>
                <label className="block font-semibold text-gray-700 mb-2" htmlFor={id}>
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="rank">
                Rank
              </label>
              <select
                id="rank"
                value={formData.rank}
                onChange={handleChange}
                required
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              >
                <option value="">Pilih Rank</option>
                <option value="Owner">Owner</option>
                <option value="Co-Owner">Co-Owner</option>
                <option value="Head">Head</option>
                <option value="Manager">Manager</option>
                <option value="Expert">Expert</option>
                <option value="Training">Training</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="foto">
                Upload Foto
              </label>
              <input
                id="foto"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add New User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const allowedRanks = ['Training', 'Expert', 'Manager', 'Head'];
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