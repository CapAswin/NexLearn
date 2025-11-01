import axiosInstance from "./axiosInstance";

export const sendOtp = async (mobile: string, country_code: string) => {
  try {
    // Ensure the country code includes '+' when sending to backend
    const normalizedCountry = country_code.startsWith("+")
      ? country_code.trim()
      : `+${country_code.trim()}`;
    const fullMobile = `${normalizedCountry}${mobile.trim()}`; // e.g., +919876543210

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
    const normalizedCountry = country_code.trim();
    const fullMobile = `${normalizedCountry}${mobile.trim()}`;
    const formData = new FormData();
    formData.append("mobile", fullMobile);
    formData.append("otp", otp);

    const response = await axiosInstance.post("/auth/verify-otp", formData);
    return response.data;
  } catch (error) {
    console.error("Verify OTP Error:", error);
    throw new Error("OTP verification failed");
  }
};

export const createProfile = async (formData: FormData) => {
  try {
    // Use fetch for multipart form upload to avoid axios header issues
    const resp = await fetch("/api/auth/create-profile", {
      method: "POST",
      body: formData,
    });

    const data = await resp.json();
    return data;
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
