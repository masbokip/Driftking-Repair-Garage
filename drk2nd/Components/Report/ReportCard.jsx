import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { testURL } from '@/testURL';

export default function ReportCard() {

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
    <section class="flex flex-col mt-10 mb-10">
  <p class="font-semibold text-2xl md:text-3xl text-center">Driftking Repairs Garage</p>
  <div
    class="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-0 gap-x-5 place-items-center w-full mx-auto max-w-7xl px-5">
    <div
      class="flex flex-col justify-center items-center bg-[#FFF6F3] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
      <div class="flex flex-row justify-center items-center">
        <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/workers-male.png" alt="workers-male"/>
        <p class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">{totalUser !== null ? totalUser : "Loading..."}</p>
      </div>
      <p class="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">Total Workers</p>
    </div>
    <div
      class="flex flex-col justify-center items-center bg-[#FFF6F3] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
      <div class="flex flex-row justify-center items-center">
       <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/administrator-male--v1.png" alt="administrator-male--v1"/>
        <p class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">{totalManager !== null ? totalManager : "Loading..."}</p>
      </div>
      <p class="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">Total Manager</p>
    </div>
    <div
      class="flex flex-col justify-center items-center bg-[#FFF6F3] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
      <div class="flex flex-row justify-center items-center">
         <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/workers-male.png" alt="workers-male"/>
        <p class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">{totalExpert !== null ? totalExpert : "Loading..."}</p>
      </div>
      <p class="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">Total Experts</p>
    </div>
    <div
      class="flex flex-col justify-center items-center bg-[#FFF6F3] px-4 h-[126px] w-[100%] md:w-[281px] md:h-[192px] rounded-lg justify-self-center">
      <div class="flex flex-row justify-center items-center">
        <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/work.png" alt="work"/>
        <p class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-primary ml-2">{totalTrainer !== null ? totalTrainer : "Loading..."}</p>
      </div>
      <p class="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center">Total Trainer</p>
    </div>
  </div>
</section>
  )
}
