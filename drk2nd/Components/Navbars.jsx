'use client';
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';

import {
  Bars3Icon,
  XMarkIcon,
  FingerPrintIcon,
  ChevronDownIcon,
  ArchiveBoxIcon,
  BanknotesIcon,
  NewspaperIcon,
  FaceSmileIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { testURL } from '@/testURL';
import Image from 'next/image'


const products = [
  { name: 'About DRG', description: 'Kenali lebih dekat siapa kami!', href: '/about', icon: FingerPrintIcon },
  { name: 'Our Team', description: 'Berisi Orang Orang Hebat LOO', href: '/ourteam', icon: FaceSmileIcon },
];

//training Expert
const jobs = [
  { name: 'Absensi', description: 'Absensi Kerjaan', href: '/absensi', icon: FingerPrintIcon },
  { name: 'Izin', description: 'Izin Tidak Bisa Duty', href: '/izin', icon: UserCircleIcon },
];

//manager up
const jobs2 = [
  { name: 'Restock', description: 'Restock Keperluan Bengkel', href: '/restock', icon: ArchiveBoxIcon },
  { name: 'SPK', description: 'Klaim Pekerjaan Kalian Ges', href: '/spk', icon: BanknotesIcon },
  { name: 'Izin', description: 'Izin Tidak Bisa Duty', href: '/izin', icon: UserCircleIcon },
];

//head up
const report = [
  { name: 'Report User', description: 'Laporan User', href: '/report/user', icon: NewspaperIcon },
  { name: 'Report Attendace', description: 'Laporan Kehadiran', href: '/report/absensi', icon: NewspaperIcon },
  { name: 'Report Spk', description: 'Laporan Spk', href: '/report/spk', icon: NewspaperIcon }
];

export default function Navbars() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rank, setRank] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = !isLoading && session;
  const idUser = session?.user?.id_user;
  
 useEffect(() => {
    if (session?.user) {
      setRank(session.user.rank);
    }
  }, [session]);

  // const handleEdit = () => idUser && router.push(`/user/update/${idUser}`);
  const handlePW = () => idUser && router.push(`/user/password/${idUser}`);

  const handleSignOut = () => {
    signOut({ callbackUrl: `/` });
    localStorage.clear();
  };

  return (
    <header className="bg-white fixed top-0 left-0 w-full z-15 shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/">
            <img alt="Logo" src="/images/logo/logonew.png" className="h-20 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2.5 text-gray-700">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 cursor-pointer">
          <Link href="/"><p className="text-sm font-semibold text-gray-900">Home</p></Link>
           <Popover className="relative">
            <PopoverButton className="flex items-center text-sm font-semibold text-gray-900 cursor-pointer">
              About Us <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </PopoverButton>
            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-max rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
              <div className="p-4">
                {products.map((item) => (
                  <div key={item.name} className="flex items-center gap-x-6 p-4 hover:bg-gray-50">
                    <div className="h-11 w-11 flex items-center justify-center rounded-lg bg-gray-50">
                      <item.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <Link href={item.href} className="block font-semibold text-gray-900">{item.name}</Link>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          {(rank === 'Training' || rank === 'Expert')&&(
              <Popover className="relative">
              <PopoverButton className="flex items-center text-sm font-semibold text-gray-900 cursor-pointer">
                Jobs<ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </PopoverButton>
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-max rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {jobs.map((item) => (
                    <div key={item.name} className="flex items-center gap-x-6 p-4 hover:bg-gray-50">
                      <div className="h-11 w-11 flex items-center justify-center rounded-lg bg-gray-50">
                        <item.icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <Link href={item.href} className="block font-semibold text-gray-900">{item.name}</Link>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
          )}
          {(rank === 'Owner' || rank === 'Co-Owner' || rank === 'Head' || rank === 'Manager' || rank === 'CEO')&&(
              <Popover className="relative">
              <PopoverButton className="flex items-center text-sm font-semibold text-gray-900 cursor-pointer">
                Jobs<ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </PopoverButton>
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-max rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {jobs2.map((item) => (
                    <div key={item.name} className="flex items-center gap-x-6 p-4 hover:bg-gray-50">
                      <div className="h-11 w-11 flex items-center justify-center rounded-lg bg-gray-50">
                        <item.icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <Link href={item.href} className="block font-semibold text-gray-900">{item.name}</Link>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
          )}
            {(rank === 'Owner' || rank === 'Co-Owner' || rank === 'CEO' || rank === 'Head')&&(
              <Popover className="relative cursor-pointer">
                  <PopoverButton className="flex items-center text-sm font-semibold text-gray-900 cursor-pointer">
                    Bos Menu <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </PopoverButton>
                  <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-max rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {report.map((item) => (
                        <div key={item.name} className="flex items-center gap-x-6 p-4 hover:bg-gray-50">
                          <div className="h-11 w-11 flex items-center justify-center rounded-lg bg-gray-50">
                            <item.icon className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <Link href={item.href} className="block font-semibold text-gray-900">{item.name}</Link>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverPanel>
                </Popover>
          )}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAuthenticated ? ( 
         <Popover>
              <PopoverButton className="flex items-center gap-x-3 px-2 py-1 rounded-md hover:bg-gray-100">
                <Image
                  src={`${testURL}/assets/images/user/${session.user.foto}`}
                  alt="Foto Profil"
                  width={40}
                  height={40}
                  className="rounded-xl object-cover cursor-pointer"
                />
                <div className="text-left cursor-pointer" >
                  <div className="text-sm font-medium text-gray-900">{session.user.nama}</div>
                  <div className="text-sm text-gray-400">{session.user.rank}</div>
                </div>
              </PopoverButton>
              <PopoverPanel className="absolute z-10 w-48 rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {/* <button onClick={handleEdit} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Edit Profil</button> */}
                  <button onClick={handlePW} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">Ubah Password</button>
                  <button onClick={handleSignOut} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</button>
                </div>
              </PopoverPanel>
            </Popover>
            ) : (
           <div className="flex gap-4">
           <Link href="/login" className="px-10 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Login</Link>
           </div>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <Link href="/"><img alt="Logo" src="/images/logo/logo_bengkel.png" className="h-8 w-auto" /></Link>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2.5 text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6">
            <Link href="/" className="block py-2 text-gray-900">Home</Link>
            <Link href="/about" className="block py-2 text-gray-900">About DRG</Link>
            <Link href="/ourteam" className="block py-2 text-gray-900">Our Team</Link>
            {(rank === 'Training' || rank === 'Expert')&&(
              <>
                <Link href="/absensi" className="block py-2 text-gray-900">Absensi</Link>
                <Link href="/izin" className="block py-2 text-gray-900">Izin</Link>
              </>
              )}
              {(rank === 'Owner' || rank === 'Co-Owner' || rank === 'Head' || rank === 'Manager' || rank === 'CEO')&&(
              <>
                <Link href="/restock" className="block py-2 text-gray-900">Restock</Link>
                <Link href="/spk" className="block py-2 text-gray-900">Spk</Link>
                <Link href="/izin" className="block py-2 text-gray-900">Izin</Link>
              </>
              )}
              {(rank === 'Owner' || rank === 'Co-Owner' || rank === 'Head' || rank === 'CEO')&&(
              <>
                <Link href="/report/user" className="block py-2 text-gray-900">Laporan User</Link>
                <Link href="/report/absensi" className="block py-2 text-gray-900">Laporan Kehadiran</Link>
                <Link href="/report/spk" className="block py-2 text-gray-900">Laporan SPK</Link>
              </>
              )}
              <>
                <Link href="/login" className="block py-2 text-gray-900">Login</Link>
              </>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
