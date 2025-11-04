'use client'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { getSession, useSession } from 'next-auth/react';
import { testURL } from '@/testURL';

export default function ManualInputList() {
  const { data: session } = useSession()
  const [items, setItems] = useState([{ kebutuhan: '', harga: '' }])
  const [selectedPersen, setSelectedPersen] = useState(30)

  const handleAddRow = () => {
    setItems([...items, { kebutuhan: '', harga: '' }])
  }

  const handleInputChange = (index, field, value) => {
    const updated = [...items]
    updated[index][field] = field === 'harga' ? parseFloat(value) || '' : value
    setItems(updated)
  }

  const handleRemoveRow = (index) => {
    const updated = [...items]
    updated.splice(index, 1)
    setItems(updated)
  }

  const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.harga) || 0), 0)
  const persenTambahan = (subtotal * selectedPersen) / 100
  const total = subtotal + persenTambahan

  const handleSubmit = async () => {
    if (!session || !session.user?.id_user) {
      Swal.fire("Gagal", "Silakan login terlebih dahulu.", "error")
      return
    }

    const nama_client = document.querySelector("input[name='nama_client']")?.value || ''
    const jenis_kendaraan = document.querySelector("input[name='jenis_kendaraan']")?.value || ''

    if (!nama_client || !jenis_kendaraan) {
      Swal.fire("Gagal", "Nama client dan jenis kendaraan wajib diisi.", "error")
      return
    }

    const pengerjaanStr = items
      .map((item, idx) => `${idx + 1}. ${item.kebutuhan} (Rp ${item.harga})`)
      .join('\n')

    const payload = {
      id_user: session.user.id_user,
      nama_user: session.user.nama,
      nama_client,
      jenis_kendaraan,
      pengerjaan: pengerjaanStr,
      total_modal:subtotal,
      total_pengerjaan: total.toString(),
    }

    try {
      const res = await fetch(`${testURL}/api/spk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (res.ok) {
        Swal.fire("Berhasil", data.message, "success")
        setItems([{ kebutuhan: '', harga: '' }])
      } else {
        Swal.fire("Gagal", data.message, "error")
      }
    } catch (err) {
      console.error(err)
      Swal.fire("Error", "Gagal menghubungi server", "error")
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  function formatRupiah(angka) {
  if (!angka) return '';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
}

function unformatRupiah(rupiah) {
  if (!rupiah) return '';
  return parseInt(rupiah.replace(/[^\d]/g, ''), 10) || 0;
}

  return (
    <div className="max-w-4xl mx-auto p-2 space-y-6 mt-15">
      <h2 className="text-xl font-bold mb-4">Invoice Cosme Kendaraan</h2>
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Nama Client</label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            name="nama_client"
            placeholder="Masukkan Nama Pelanggan"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Jenis Kendaraan</label>
          <input
            className="border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            name="jenis_kendaraan"
            placeholder="Masukkan Jenis Kendaraan"
          />
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">Pengerjaan #{index + 1}</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Kebutuhan"
                value={item.kebutuhan}
                onChange={(e) => handleInputChange(index, 'kebutuhan', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <input
                  type="text"
                  placeholder="Harga"
                  value={formatRupiah(item.harga)}
                  onChange={(e) =>
                    handleInputChange(index, 'harga', unformatRupiah(e.target.value))
                  }
                  className="w-full sm:w-40 p-2 border border-gray-300 rounded"
                />
              {items.length > 1 && (
                <button
                  onClick={() => handleRemoveRow(index)}
                  className="text-red-500 hover:text-red-700 text-xl font-bold sm:self-start"
                  title="Hapus baris ini"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={handleAddRow}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-4"
        >
          + Tambah Kebutuhan
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4 mt-6">
        <h3 className="text-lg font-semibold">Ringkasan</h3>
        <h4 className="text-lg font-semibold">20% Khusus Karyawan</h4>
        <div className="flex gap-4 mb-4">
          {[30, 20].map((persen) => (
            <label key={persen} className="flex items-center space-x-2">
              <input
                type="radio"
                name="persen"
                checked={selectedPersen === persen}
                onChange={() => setSelectedPersen(persen)}
              />
                  <span>{persen}%</span>
            </label>
          ))}
        </div>

        <div className="text-sm space-y-1">
          <p>Harga Modal: <strong>Rp {subtotal.toLocaleString('id-ID')}</strong></p>
          <p>Harga Tambahan ({selectedPersen}%): <strong> {formatCurrency(persenTambahan)}</strong></p>
          <hr />
          <p>Total: <strong className="text-lg">{formatCurrency(total)}</strong></p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4 w-full"
        >
          Simpan SPK
        </button>
      </div>
    </div>
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
