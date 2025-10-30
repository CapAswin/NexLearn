"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo_blue.png";

const Header = () => {
  return (
    <header className="w-full relative flex items-center px-8 py-4 bg-white shadow-sm">
      <div className="flex-1 flex justify-center">
        <Image
          src={logo}
          alt="NexLearn Logo"
          className="w-[191.33px] h-[59.75px]"
        />
      </div>
      <button className="absolute right-8 bg-[rgba(23,122,156,1)] text-white px-5 py-2 rounded-md hover:bg-[#233b50] transition">
        Logout
      </button>
    </header>
  );
};

export default Header;
