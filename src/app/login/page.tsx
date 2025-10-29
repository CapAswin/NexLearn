"use client";

import Image from "next/image";
import logo from "../../assets/NexLearn.png";
import login_pic from "../../assets/login_pic.png";
import MainLayout from "../component/mainLayOut";

const Login = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(circle_at_top_left,_#0e1a24,_#091018)] font-inter">
        <div className="flex w-[90%] max-w-[860px] rounded-xl overflow-hidden shadow-2xl bg-[#1c2b3a] text-white flex-col md:flex-row">
          {/* Left Panel */}
          <div className="w-full md:w-[462px] h-[250px] md:h-[501px] bg-[#1c2b3a] rounded-t-[6px] md:rounded-[6px] flex flex-col justify-center items-center text-white relative">
            <div className="absolute top-[20px] md:top-[38px] left-1/2 -translate-x-1/2">
              <Image
                src={logo}
                alt="NexLearn Logo"
                width={200}
                height={63}
                className="md:w-[265px] md:h-[83px]"
              />
            </div>

            <div className="absolute bottom-[20px] md:top-[214px] left-1/2 -translate-x-1/2">
              <Image
                src={login_pic}
                alt="Login Illustration"
                width={250}
                height={200}
                className="md:w-[336px] md:h-[260px]"
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-1 flex-col bg-white text-[#1c2b3a] m-2 rounded-lg p-5 gap-4 justify-between">
            <div>
              <h3 className="font-['Inter'] font-semibold text-[20px] md:text-[24px] leading-[28px] md:leading-[32px] mb-3 text-[rgba(28,49,65,1)]">
                Enter your phone number
              </h3>

              <p className="text-gray-600 mb-5 text-sm md:text-base">
                We use your mobile number to identify your account
              </p>
              <label className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#1c2b3a]">
                <span className="text-gray-700 text-sm flex items-center gap-1">
                  🇮🇳 +91
                </span>
                <input
                  type="text"
                  placeholder="1234 567891"
                  className="flex-1 outline-none ml-2 text-gray-800 text-sm bg-transparent"
                />
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mt-3">
                By tapping Get started, you agree to the{" "}
                <a
                  href="#"
                  className="text-gray-700 font-medium underline underline-offset-2"
                >
                  Terms & Conditions
                </a>
                .
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1c2b3a] hover:bg-[#233b50] text-white font-medium rounded-lg py-2 mt-4 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
