"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp, sendOtp } from "../../api/auth";
import { VerifyOtpResponse } from "../../types";

interface OtpFormProps {
  mobile: string;
  countryCode: string;
  onBack: () => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ mobile, countryCode, onBack }) => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response: VerifyOtpResponse = await verifyOtp(
        mobile,
        countryCode,
        code
      );
      if (response.success) {
        if (response.login && response.access_token && response.refresh_token) {
          // Store tokens first
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
          // Verify token is stored before navigation
          const storedToken = localStorage.getItem("access_token");
          if (storedToken) {
            alert("Login successful!");
            router.push("/instructions");
          } else {
            setError("Failed to store authentication data");
          }
        } else {
          // Navigate to signup with mobile and countryCode
          router.push(`/signup?mobile=${mobile}&countryCode=${countryCode}`);
        }
      } else {
        setError(response.message || "Login failed. Please try again.");
      }
    } catch {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError(null);
    setResendLoading(true);
    // Clear the OTP input when resending
    setCode("");
    try {
      await sendOtp(mobile, countryCode);
      alert("OTP sent successfully!");
    } catch {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-white text-[#1c2b3a] m-2 rounded-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-9 gap-3 sm:gap-4 justify-between transition-all duration-300">
      <div className="w-full max-w-sm bg-white flex flex-col space-y-6 p-2">
        {/* Title */}
        <div>
          <h1 className="text-[22px] font-semibold text-[#1f2937] leading-snug">
            Enter the code we texted you
          </h1>
          <p className="text-[15px] text-[#374151] mt-2">
            We’ve sent an SMS to{" "}
            <span className="font-medium text-[#111827]">
              {countryCode} {mobile}
            </span>
          </p>
        </div>

        {/* Input Field */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="sms"
            className="text-sm font-medium text-[#374151] leading-none"
          >
            SMS code
          </label>
          <input
            id="sms"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123 456"
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-lg text-[#111827] tracking-widest focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition"
          />
        </div>

        {/* Info Text */}
        <p className="text-[13px] text-[#6b7280] leading-snug">
          Your 6 digit code is on its way. This can sometimes take a few moments
          to arrive.
        </p>

        {/* Error message (if any) */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Resend Code */}
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={resendLoading}
          className="text-[14px] font-medium text-[#111827] underline hover:text-[#374151] w-fit disabled:text-gray-400"
        >
          {resendLoading ? "Resending..." : "Resend code"}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onBack}
          className="flex-1 py-1 sm:py-2 md:py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium rounded-lg transition-all duration-300 text-sm sm:text-base"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 bg-[#1c2b3a] hover:bg-[#233b50] disabled:bg-gray-400 text-white font-medium rounded-lg py-1 sm:py-2 md:py-3 transition-all duration-300 text-sm sm:text-base"
        >
          {loading ? "Verifying..." : "Get Started"}
        </button>
      </div>
    </div>
  );
};

export default OtpForm;
