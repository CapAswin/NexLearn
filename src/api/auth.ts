import axiosInstance from "./axiosInstance";
import { SendOtpPayload } from "../types";

export const sendOtp = async (mobile: string, country_code: string) => {
  const payload: SendOtpPayload = { mobile, country_code };
  const response = await axiosInstance.post("/auth/send-otp", payload);
  return response.data;
};

export const verifyOtp = async (mobile: string, otp: string) => {
  const response = await axiosInstance.post("/auth/verify-otp", {
    mobile,
    otp,
  });
  return response.data;
};

export const createProfile = async (formData: FormData) => {
  const response = await axiosInstance.post("/auth/create-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  localStorage.removeItem("access_token");
  return response.data;
};
