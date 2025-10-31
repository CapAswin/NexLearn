import { useState, useEffect } from "react";
import { login, signup, logout } from "../api/auth";
import { User } from "../types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage or token)
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token and set user
      // For now, assume token is valid and set a placeholder user
      setUser({ id: "1", name: "User", email: "user@example.com", token });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSignup = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const data = await signup(name, email, password);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };
};
