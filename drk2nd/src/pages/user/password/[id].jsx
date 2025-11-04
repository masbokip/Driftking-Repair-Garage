'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { testURL } from '@/testURL';
import { getSession, useSession } from 'next-auth/react';

export default function UpdatePw() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    password: "",
    kpassword: "",
  });

    useEffect(() => {
    if (id) {
      axios
        .get(`${testURL}/api/users/${id}`)
        .then((response) => setFormData(response.data))
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Data user tidak ditemukan`,
          });
          console.error("Error fetching user data:", error);
        });
    }
  }, [id]);

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${testURL}/api/users/password/${id}`, formData);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User updated successfully",
        }).then(() => {
          router.push("/report/user");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user",
      });
    }
  };

  return (
     <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/logo/gambar.png')" }}
    >
      <div className="h-screen flex justify-center items-center mt-5">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Ganti Password</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="password">
                Password Baru
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan Password Baru"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="password">
                Konfirmasi Password
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="kpassword"
                  value={formData.kpassword}
                  onChange={handleChange}
                  placeholder="Konfirmasi Password Baru"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Ganti Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export async function getServerSideProps(ctx) {
  const allowedRanks = ['Training', 'Expert', 'Manager', 'Head'];
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