import React from "react";
 import Image from "next/image"; 
export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030303]">
      <Image 
      src="/images/logo/Animate_white.gif" 
      alt="Loading..." 
      width={120} 
      height={120} 
      unoptimized 
      className="w-120 h-120" 
    />
    </div>
  );
}
