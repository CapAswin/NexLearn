"use client";

import Image from "next/image";
import logo from "../../assets/NexLearn.png";
import login_pic from "../../assets/login_pic.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen font-inter">
      <div className="flex w-[90%] max-w-[860px] rounded-xl overflow-hidden shadow-2xl bg-[#1c2b3a] text-white flex-col md:flex-row">
        {/* Left Panel */}
        <div className="w-full md:w-[462px] h-[250px] md:h-[501px] bg-[#1c2b3a] rounded-t-[6px] md:rounded-[6px] flex flex-col justify-center items-center text-white relative">
          <div className="absolute top-[20px] left-[20px] md:top-[38px] md:left-1/2 md:-translate-x-1/2">
            <Image
              src={logo}
              alt="NexLearn Logo"
              width={200}
              height={63}
              className="w-[120px] h-[38px] md:w-[265px] md:h-[83px]"
            />
          </div>

          <div className="absolute md:top-[214px] md:left-[63px] bottom-[20px] ">
            <Image
              src={login_pic}
              alt="Login Illustration"
              width={336}
              height={260}
              className="w-[250px] h-[200px] md:w-[336px] md:h-[260px]"
            />
          </div>
        </div>

        {/* Right Panel */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
