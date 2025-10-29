"use client";

import Image from "next/image";
import logo from "../../assets/NexLearn.png";
import login_pic from "../../assets/login_pic.png";
import MainLayout from "../component/mainLayOut";

const Login = () => {
  return (
    <MainLayout>
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
          <div className="flex flex-1 flex-col bg-white text-[#1c2b3a] m-2 rounded-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-9 gap-3 sm:gap-4 justify-between transition-all duration-300">
            <div>
              <h3 className="font-['Inter'] font-semibold text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl leading-tight lg:leading-[32px] xl:leading-[32px] 2xl:leading-[32px] mb-2 sm:mb-3 md:mb-4 text-[rgba(28,49,65,1)] transition-all duration-300">
                Enter your phone number
              </h3>

              <p className="text-gray-600 mb-3 sm:mb-4 md:mb-5 text-xs sm:text-sm md:text-base transition-all duration-300">
                We use your mobile number to identify your account
              </p>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 transition-all duration-300">
                Phone number
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus-within:ring-2 focus-within:ring-[#1c2b3a] mb-2 sm:mb-3 transition-all duration-300">
                <span className="text-gray-700 text-xs sm:text-sm flex items-center gap-1 transition-all duration-300">
                  🇮🇳 +91
                </span>
                <input
                  type="text"
                  placeholder="1234 567891"
                  className="flex-1 outline-none ml-1 sm:ml-2 text-gray-800 text-xs sm:text-sm bg-transparent transition-all duration-300"
                />
              </div>

              <p
                className="text-gray-500 mt-2 sm:mt-3 transition-all duration-300"
                style={{
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "11.74px",
                  lineHeight: "16px",
                  letterSpacing: "0px",
                  verticalAlign: "middle",
                }}
              >
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
              className="w-full bg-[#1c2b3a] hover:bg-[#233b50] text-white font-medium rounded-lg py-1 sm:py-2 md:py-3 mt-3 sm:mt-4 md:mt-6 transition-all duration-300 text-sm sm:text-base"
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
