'use client'
import React, { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';
import axios from 'axios';
import Swal from 'sweetalert2';
import HeroArea from '../../../Components/Restock/HeroArea';
import RestockIcon from '../../../Components/RestockIcon';
import Image from "next/image";
import { testURL } from '@/testURL';

export default function Index() {
  const { data: session } = useSession()

  const initialProducts = [
    { name: "Advance Repair Kit", image: "/images/iventory/Adv.png", price: 15000, quantity: 0 },
    { name: "Body Kit", image: "/images/iventory/Bodykit.png", price: 8500, quantity: 0 },
    { name: "Repairkit", image: "/images/iventory/Repairkit.png", price: 11750, quantity: 0 },
    { name: "Kanebo", image: "/images/iventory/Kabeno.png", price: 7200, quantity: 0 },
    { name: "Tirekit", image: "/images/iventory/Tirekit.png", price: 5250, quantity: 0 },
    { name: "Wrench", image: "/images/iventory/Wrench.png", price: 75000, quantity: 0 },
  ]

  const wargaProducts = [
    { name: "Wrench (Bengkel Lain)", image: "/images/iventory/Wrench.png", price: 90000, quantity: 0 },
    { name: "Wrench (Warga)", image: "/images/iventory/Wrench.png", price: 80000, quantity: 0 },
    { name: "Repairkit (Warga)", image: "/images/iventory/Repairkit.png", price: 18000, quantity: 0 },
    { name: "Kanebo (Warga)", image: "/images/iventory/Kabeno.png", price: 15000, quantity: 0 },
  ]

  const [isWarga, setIsWarga] = useState(false)
  const [products, setProducts] = useState(initialProducts)
  const [namaInvoice, setNamaInvoice] = useState("")

  const toggleProductSource = () => {
    setIsWarga(!isWarga)
    setProducts(
      !isWarga
        ? wargaProducts.map((p) => ({ ...p }))
        : initialProducts.map((p) => ({ ...p }))
    )
  }
  const handleQuantityChange = (index, type) => {
    const updated = [...products]
    if (type === "increase") updated[index].quantity += 1
    else if (type === "decrease" && updated[index].quantity > 0) updated[index].quantity -= 1
    setProducts(updated)
  }

  const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleSubmit = async () => {
    if (!session?.user?.id_user || !session?.user?.nama) {
      return Swal.fire("Error", "User belum login", "error")
    }
    if (!namaInvoice) {
      return Swal.fire("Error", "Nama Invoice wajib diisi", "error")
    }

    const selected = products.filter((p) => p.quantity > 0)
    if (selected.length === 0) {
      return Swal.fire("Error", "Pilih setidaknya 1 produk", "error")
    }

    const daftarToolkit = selected.map((p,idx) => `${idx+1}. ${p.name} ${p.quantity}x`).join('\n')

    try {
      const res = await axios.post(`${testURL}/api/restock`, {
        id_user: session.user.id_user,
        nama_manager: session.user.nama,
        nama_invoice: namaInvoice,
        daftar_toolkit: daftarToolkit,
        total_invoice: subtotal
      })
      Swal.fire("Sukses", res.data.message, "success")
      setProducts(initialProducts.map(p => ({ ...p, quantity: 0 })))
      setNamaInvoice("")
    } catch (err) {
      console.error(err)
      Swal.fire("Gagal", err.response?.data?.message || "Terjadi kesalahan", "error")
    }
  }

  return (
    <>
      <HeroArea />
      <RestockIcon />
      
<div className="bg-gray-100 min-h-screen py-16">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
      <h1 className="text-2xl font-semibold">
              {isWarga ? 'Restock Warga' : 'Restock Karyawan'}
      </h1>
    </div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <button
              onClick={toggleProductSource}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
            >
              {isWarga ? 'Ganti ke Produk Internal' : 'Ganti ke Produk Warga'}
            </button>
        </div>
    <div className="mb-4 w-full md:w-3/4">
      <label className="block font-semibold text-gray-700 mb-2">Nama Invoice</label>
      <input
        className="border rounded w-full py-2 px-3 text-gray-700 bg-white"
        type="text"
        value={namaInvoice}
        onChange={(e) => setNamaInvoice(e.target.value)}
        placeholder="Masukkan Nama Invoice"
      />
    </div>

    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-3/4">
        <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left font-semibold p-2">Nama Toolkit</th>
                <th className="text-left font-semibold p-2">Harga</th>
                <th className="text-left font-semibold p-2">Jumlah</th>
                <th className="text-left font-semibold p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <Image
                        className="h-12 w-12 object-cover opacity-80"
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={48}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">Rp {item.price.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center">
                      <button onClick={() => handleQuantityChange(index, 'decrease')} className="border rounded-md px-3 py-1 mr-2 text-lg">-</button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(index, 'increase')} className="border rounded-md px-3 py-1 ml-2 text-lg">+</button>
                    </div>
                  </td>
                  <td className="py-3 px-2">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full lg:w-1/4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Total Invoice</h2>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total</span>
            <span className="font-bold">Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-full"
            onClick={handleSubmit}
          >
            Kirim Restock
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export async function getServerSideProps(ctx) {
  const allowedRanks = ['Training', 'Expert'];
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