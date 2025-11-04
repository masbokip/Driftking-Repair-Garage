import React from 'react'
import Link from "next/link";
export default function ReportMenu() {
  return (
    <section class="p-4">
  <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li><Link href="/report/user" data-clickable="Category:55:category-card"
        class="block h-full transition-all duration-200 bg-white border rounded group shadow-lg border-green-500 hover:ring-1 ring-green-500/20">
        <div class="flex items-center p-6">
          <div
            class="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-green-50 group-hover:bg-green-100">
            <span class="text-4xl" role="img" aria-label="Customer Support category">🙋</span>
          </div>
          <div class="flex-grow ml-6">
            <h3
              class="text-lg font-semibold text-gray-900 transition-colors duration-200 line-clamp-1 group-hover:text-green-600">
              User Report
            </h3>
            <div class="inline-flex items-center mt-1">
              <span class="text-gray-600 rounded">
                    Laporan mengenai user
                </span>
            </div>
          </div>
          <div class="flex-shrink-0 ml-4">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
            </svg>
          </div>
        </div>
      </Link>
    </li>
    <li><Link href="/report/absensi" data-clickable="Category:20:category-card"
        class="block h-full transition-all duration-200 bg-white border border-gray-200 rounded group hover:shadow-lg hover:border-green-500 hover:ring-1 hover:ring-green-500/20">
        <div class="flex items-center p-6">
          <div
            class="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-green-50 group-hover:bg-green-100">
            <span class="text-4xl" role="img" aria-label="Productivity category">⏱️</span>
          </div>
          <div class="flex-grow ml-6">
            <h3
              class="text-lg font-semibold text-gray-900 transition-colors duration-200 line-clamp-1 group-hover:text-green-600">
              Attendance
            </h3>
            <div class="inline-flex items-center mt-1">
              <span class="text-gray-600 rounded">
                    Laporan mengenai absensi
                </span>
            </div>
          </div>
          <div class="flex-shrink-0 ml-4">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
            </svg>
          </div>
        </div>
      </Link>
    </li>
    <li><Link href="/report/spk" data-clickable="Category:44:category-card"
        class="block h-full transition-all duration-200 bg-white border border-gray-200 rounded group hover:shadow-lg hover:border-green-500 hover:ring-1 hover:ring-green-500/20">
        <div class="flex items-center p-6">
          <div
            class="flex items-center justify-center flex-shrink-0 w-16 h-16 transition-colors duration-200 rounded bg-green-50 group-hover:bg-green-100">
            <span class="text-4xl" role="img" aria-label="Developer Tools category">🛠️</span>
          </div>

          <div class="flex-grow ml-6">
            <h3
              class="text-lg font-semibold text-gray-900 transition-colors duration-200 line-clamp-1 group-hover:text-green-600">
              Laporan SPK
            </h3>

            <div class="inline-flex items-center mt-1">
              <span class="text-gray-600 rounded">
                    Laporan mengenai SPK
                </span>
            </div>
          </div>

          <div class="flex-shrink-0 ml-4">
            <svg class="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors duration-200"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
            </svg>
          </div>
        </div>
      </Link>
    </li>
  </ul>
</section>
  )
}
