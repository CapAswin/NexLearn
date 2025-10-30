"use client";

import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Upload } from "lucide-react";

const SignUpForm = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col bg-white text-[#1c2b3a] w-[394px] h-[481px] mt-2.5 ml-2 mr-2 mb-2 rounded-[6px] p-2 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-9 gap-3 sm:gap-4 justify-between transition-all duration-300">
      <h3 className="font-['Inter'] font-semibold text-lg sm:text-xl md:text-2xl leading-tight mb-4 text-[rgba(28,49,65,1)]">
        Add Your Details
      </h3>

      <div className="overflow-auto scrollbar-hide">
        {/* Profile Upload */}
        <div className="flex justify-center mb-6">
          <label
            htmlFor="profile-upload"
            className="w-[120px] h-[120px] border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition"
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                width={140}
                height={140}
                className="object-cover rounded-[12px]"
              />
            ) : (
              <>
                <Upload className="text-gray-400 mb-2" size={28} />
                <span className="text-gray-400 text-sm text-center">
                  Add Your Profile picture
                </span>
              </>
            )}
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Form Fields with fieldset + legend */}
        <form className="w-full flex flex-col gap-4">
          <fieldset className="border border-gray-300 rounded-[8px] px-4 py-2">
            <legend className="text-sm font-medium text-gray-700">
              Name<span className="text-red-500">*</span>
            </legend>
            <input
              type="text"
              placeholder="Enter your Full Name"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-[8px] px-4 py-2">
            <legend className="text-sm font-medium text-gray-700">Email</legend>
            <input
              type="email"
              placeholder="Enter your Email Address"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-[8px] px-4 py-2">
            <legend className="text-sm font-medium text-gray-700">
              Your qualification<span className="text-red-500">*</span>
            </legend>
            <input
              type="text"
              placeholder="Enter your Qualification"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </fieldset>
        </form>
      </div>

      <button className="w-full bg-[#1c2b3a] hover:bg-[#233b50] text-white font-medium rounded-lg py-2 md:py-3 mt-4 transition-all duration-300 text-sm sm:text-base">
        Get Started
      </button>
    </div>
  );
};

export default SignUpForm;
