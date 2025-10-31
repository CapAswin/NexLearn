import axiosInstance from "./axiosInstance";

export const sendOtp = async (mobile: string) => {
  const response = await axiosInstance.post("/auth/send-otp", { mobile });
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
  return response.data;
};
