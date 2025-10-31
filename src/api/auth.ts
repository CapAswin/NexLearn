import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  return response.data;
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await axiosInstance.post("/auth/signup", {
    name,
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
