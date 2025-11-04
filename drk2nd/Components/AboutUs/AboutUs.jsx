import React, { useEffect, useState } from "react";
import Link from "next/link";
import { testURL } from '@/testURL';

export default function AboutUs() {

   const [totalUser,setTotalUser]= useState("");
   const [totalManager,setTotalManager]= useState("");
   const [totalExpert,setTotalExpert]= useState("");
   const [totalTrainer,setTotalTrainer]= useState("");

    useEffect(() => {
    const fetchTotalUser = async () => {
      try {
        const response = await fetch(`${testURL}/api/total-user`);
        const data = await response.json();
        setTotalUser(data.total);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    };
    fetchTotalUser();
  }, []);

  useEffect(() => {
    const fetchTotalManager = async () => {
      try {
        const response = await fetch(`${testURL}/api/total-manager`);
        const data = await response.json();
        setTotalManager(data.total);
      } catch (error) {
        console.error("Error fetching total manager:", error);
      }
    };
    fetchTotalManager();
  }, []);


  useEffect(() => {
    const fetchTotalTrainer = async () => {
      try {
        const response = await fetch(`${testURL}/api/total-trainer`);
        const data = await response.json();
        setTotalTrainer(data.total);
      } catch (error) {
        console.error("Error fetching total trainer:", error);
      }
    };
    fetchTotalTrainer();
  }, []);

  useEffect(() => {
    const fetchTotalExpert = async () => {
      try {
        const response = await fetch(`${testURL}/api/total-expert`);
        const data = await response.json();
        setTotalExpert(data.total);
      } catch (error) {
        console.error("Error fetching total expert:", error);
      }
    };
    fetchTotalExpert();
  }, []);

  return (
    <section id="about" class="py-20 md:px-20 lg:px-20 bg-[#222222]">
  <div class="container mx-auto px-4">
    <div class="mb-12">
      <h2 class="text-[#F68537] text-lg mb-2" data-aos="fade-down">
        About Us
      </h2>
      <h3 class="mb-4 text-3xl font-bold text-white section-title" data-aos="fade-down">
        Driftking Repairs Garage 
      </h3>
      <p class="mb-8 max-w-3xl text-gray-400 text-justify" data-aos="fade-down">
        Bengkel terpercaya yang berlokasi di pusat kota Server SixNine Roleplay, siap memberikan layanan perbaikan dan modifikasi kendaraan terbaik untuk para warga kota. Dengan tim mekanik berpengalaman, kami melayani segala jenis perbaikan mobil, modifikasi performa, hingga pengecatan ulang. 
        Komitmen kami adalah menghadirkan kualitas, kecepatan, dan kepuasan dalam setiap layanan. 
      </p>
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-lg border border-gray-800 bg-[#222222] p-6 text-center">
          <h4 class="mb-2 text-3xl font-bold text-[#FB9E3A]">{totalUser !== null ? totalUser : "Loading..."}</h4>
          <p class="text-gray-200">Total Tim DRK</p>
        </div>
        <div class="rounded-lg border border-gray-800 bg-[#222222] p-6 text-center">
          <h4 class="mb-2 text-3xl font-bold text-[#FB9E3A]">{totalManager !== null ? totalManager : "Loading..."}</h4>
          <p class="text-gray-200">Total Manager</p>
        </div>
         <div class="rounded-lg border border-gray-800 bg-[#222222] p-6 text-center">
          <h4 class="mb-2 text-3xl font-bold text-[#FB9E3A]">{totalExpert !== null ? totalExpert : "Loading..."}</h4>
          <p class="text-gray-200">Total Expert</p>
        </div>
         <div class="rounded-lg border border-gray-800 bg-[#222222] p-6 text-center">
          <h4 class="mb-2 text-3xl font-bold text-[#FB9E3A]">{totalTrainer !== null ? totalTrainer : "Loading..."}</h4>
          <p class="text-gray-200">Total Trainer</p>
        </div>
       
      </div>
    </div>
    <div class="flex flex-col sm:flex-row items-center gap-4 mt-8" data-aos="fade-up">
      <Link href="/ourteam" class="cursor-pointer rounded-full bg-[#FFBF78] hover:bg-[#FF9B17] text-black py-3 px-8">
        Kenali Tim Kami
      </Link>
    </div>
  </div>
</section>
  )
}
