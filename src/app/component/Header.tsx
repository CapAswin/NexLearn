"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo_blue.png";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Header = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect to login even if API call fails
      router.push("/login");
    }
  };

  return (
    <header className="w-full h-[60px] md:h-[90px] fixed flex items-center bg-white shadow-sm bg-[rgba(255,255,255,1)] opacity-100 border-b-[1.43px] border-b-[rgba(233,235,236,1)]">
      <div className="flex-1 flex justify-start md:justify-center ml-4 md:ml-0">
        <Image
          src={logo}
          alt="NexLearn Logo"
          className="w-32 h-12 md:w-[191.33px] md:h-[59.75px]"
        />
      </div>
      <button
        onClick={handleLogout}
        className="absolute right-2 md:right-8 bg-[rgba(23,122,156,1)] text-white px-3 py-1 md:px-5 md:py-2 rounded-md hover:bg-[#233b50] transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
