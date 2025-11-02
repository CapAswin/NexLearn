import axiosInstance from "./axiosInstance";

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  mobile: string;
  country_code?: string;
  created_at?: string;
  updated_at?: string;
}

export const sendOtp = async (mobile: string, country_code: string) => {
  try {
    const normalizedCountry = country_code.startsWith("+")
      ? country_code.trim()
      : `+${country_code.trim()}`;
    const fullMobile = `${normalizedCountry}${mobile.trim()}`;

    const formData = new FormData();
    formData.append("mobile", fullMobile);

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
    const normalizedCountry = country_code.startsWith("+")
      ? country_code.trim()
      : `+${country_code.trim()}`;
    const fullMobile = `${normalizedCountry}${mobile.trim()}`;

    const formData = new FormData();
    formData.append("mobile", fullMobile);
    formData.append("otp", otp);

    const response = await axiosInstance.post("/auth/verify-otp", formData);

    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    // Clear any existing tokens before setting new ones
    if (response.data.success && response.data.login) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }

    return response.data;
  } catch (error) {
    console.error("Verify OTP Error:", error);
    throw error instanceof Error ? error : new Error("OTP verification failed");
  }
};

export const createProfile = async (formData: FormData) => {
  try {
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
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }
    const response = await axiosInstance.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
    return response.data;
  } catch (error) {
    console.error("Logout Error:", error);
    throw new Error("Logout failed");
  }
};

export const getProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }
  const response = await axiosInstance.get<UserProfile>("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
