// components/Footer.js
import React from 'react';
import Link from "next/link";

const Footers = () => {
  return (
    // <footer class="bg-gray-900 text-white py-4">
    //     <div class="container mx-auto text-center">
    //         <p>&copy; 2025 Drifking Repairs Garage</p>
    //     </div>
    // </footer>

    <footer class="w-full bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* <div class="py-6 flex justify-between items-center flex-col gap-8 lg:flex-row">
                 <img alt="Logo" src="/images/logo/logo_bengkel.png" className="h-20 w-auto" />
                <ul class="text-lg text-center sm:flex items-cente justify-center gap-14 lg:gap-10 xl:gap-14 transition-all duration-500">
                    <li ><Link href="/"  class="text-white hover:text-gray-400">Home Page</Link></li>
                    <li ><Link href="/about"  class="text-white hover:text-gray-400">About Us</Link></li>
                    <li ><Link href="/ourteam"  class="text-white hover:text-gray-400">Team DRK</Link></li>
                    <li ><Link href="/absensi"  class="text-white hover:text-gray-400">Absensi</Link></li>
                    <li ><Link href="/report/user"  class="text-white hover:text-gray-400">Laporan</Link></li>
                </ul>
                <div class="flex  space-x-4 sm:justify-center  ">
                <img alt="Logo" src="/images/logo/logo_bengkel.png" className="h-20 w-auto" />
                </div>
            </div> */}
            <div class="py-2 border-t border-gray-700">
                <div class="flex items-center justify-center">
                    <img alt="Logo" src="/images/logo/logo_bengkel.png" className="h-20 w-auto" />
                    <span class="text-gray-200 ">©<a href="/">Drifking Repairs Garage</a>2025, All rights reserved.</span>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footers;
