'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [status2,setStatus] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await signIn('credentials', {
    redirect: false,
    username,
    password,
  });

  if (result.ok) {
    setStatus('authenticated');
  } else {
    setStatus('unauthenticated');
  }
};

  useEffect(() => {
    if (status2 === 'authenticated') {
        Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil login",
      }).then(() => {
        router.push("/");
      });
    }else if (status2 === 'unauthenticated') {
      Swal.fire({
      icon: "error",
      title: "error",
      text: "Gagal login",
    }).then(() => {
      router.push("/login");
    });
  }
    
  }, [status2]);

  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/logo/gambar.png')" }}
    >
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-950">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:to-black"
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
