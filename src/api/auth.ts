import axiosInstance from "./axiosInstance";

export const sendOtp = async (mobile: string, country_code: string) => {
  try {
    // Normalize to a digits-only full mobile number (remove '+' from country code)
    const fullMobile = `${country_code}${mobile.trim()}`; // e.g., 919876543210
    console.log(country_code, mobile, fullMobile, "///");

    // Use FormData to match server route which expects multipart/form-data
    const formData = new FormData();
    formData.append("mobile", fullMobile);

    // Let the browser set the Content-Type (including boundary) for FormData
    const response = await axiosInstance.post("/auth/send-otp", formData);
    return response.data;
  } catch (error) {
    console.error("Send OTP Error:", error);
    throw new Error("Failed to send OTP");
  }
};

export const verifyOtp = async (
  mobile: string,
  country_code: string,
  otp: string
) => {
  try {
    console.log(country_code, mobile, "///");
    const fullMobile = `${country_code.replace("+", "")}${mobile.trim()}`;
    const formData = new FormData();
    formData.append("mobile", fullMobile);
    formData.append("otp", otp);
    // Let the browser set the Content-Type (including boundary) for FormData
    const response = await axiosInstance.post("/auth/verify-otp", formData);
    return response.data;
  } catch (error) {
    console.error("Verify OTP Error:", error);
    throw new Error("OTP verification failed");
  }
};

export const createProfile = async (formData: FormData) => {
  try {
    // Let the browser set the Content-Type for file uploads
    const response = await axiosInstance.post("/auth/create-profile", formData);
    return response.data;
  } catch (error) {
    console.error("Create Profile Error:", error);
    throw new Error("Profile creation failed");
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error);
    throw new Error("Logout failed");
  }
};
