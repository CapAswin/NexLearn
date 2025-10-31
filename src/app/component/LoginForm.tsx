"use client";

import { useState } from "react";
import { sendOtp } from "../../api/auth";
import { SendOtpResponse } from "../../types";

const LoginForm = () => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response: SendOtpResponse = await sendOtp(mobile);
      if (response.success) {
        // Handle success - maybe navigate to OTP verification
        alert("OTP sent successfully!");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            className="flex-1 outline-none ml-1 sm:ml-2 text-gray-800 text-xs sm:text-sm bg-transparent transition-all duration-300"
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs sm:text-sm mb-2">{error}</p>
        )}

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
        onClick={handleSendOtp}
        disabled={loading}
        className="w-full bg-[#1c2b3a] hover:bg-[#233b50] disabled:bg-gray-400 text-white font-medium rounded-lg py-1 sm:py-2 md:py-3 mt-3 sm:mt-4 md:mt-6 transition-all duration-300 text-sm sm:text-base"
      >
        {loading ? "Sending..." : "Get Started"}
      </button>
    </div>
  );
};

export default LoginForm;
