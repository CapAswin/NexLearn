"use client";

import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { Upload } from "lucide-react";
import { createProfile } from "../../api/auth";
import { CreateProfileResponse } from "../../types";
import { useRouter, useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile") || "";
  const countryCode = searchParams.get("countryCode") || "";
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !qualification || !email || !mobile) {
      setError("Name, email, qualification, and mobile are required");
      return;
    }

    if (!profileImage) {
      setError("Profile image is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      console.log("countryCode: ", countryCode);
      const normalizedCountry = countryCode
        ? countryCode.startsWith("+")
          ? countryCode.trim()
          : "+" + countryCode.trim()
        : "+91";
      const fullMobile = `${normalizedCountry}${mobile.trim()}`;
      formData.append("mobile", fullMobile);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("qualification", qualification);
      const fileInput = document.getElementById(
        "profile-upload"
      ) as HTMLInputElement;
      const file = fileInput?.files?.[0];
      if (file) {
        formData.append("profile_image", file);
      }

      const response: CreateProfileResponse = await createProfile(formData);
      if (response.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", response.access_token);
          localStorage.setItem("refresh_token", response.refresh_token);
        }
        alert("Profile created successfully!");
        router.push("/instructions");
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white text-[#1c2b3a] w-[394px] h-[481px] mt-2.5 ml-2 mr-2 mb-2 rounded-[6px] p-2 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-9 gap-3 sm:gap-4 justify-between transition-all duration-300">
      <h3 className="font-['Inter'] font-semibold text-lg sm:text-xl md:text-2xl leading-tight mb-4 text-[rgba(28,49,65,1)]">
        Add Your Details
      </h3>

      <div className="overflow-auto scrollbar-hide">
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

        <form
          id="signup-form"
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4"
        >
          <fieldset className="border border-gray-300 rounded-[8px] px-4 py-2">
            <legend className="text-sm font-medium text-gray-700">
              Name<span className="text-red-500">*</span>
            </legend>
            <input
              type="text"
              placeholder="Enter your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-[8px] px-4 py-2">
            <legend className="text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </legend>
            <input
              type="email"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </fieldset>
        </form>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        form="signup-form"
        disabled={loading}
        className="w-full bg-[#1c2b3a] hover:bg-[#233b50] disabled:bg-gray-400 text-white font-medium rounded-lg py-2 md:py-3 mt-4 transition-all duration-300 text-sm sm:text-base"
      >
        {loading ? "Creating Profile..." : "Get Started"}
      </button>
    </div>
  );
};

export default SignUpForm;
