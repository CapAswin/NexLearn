import { useState } from "react";
import { logout } from "../api/auth";
import { User } from "../types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage synchronously
    const token = localStorage.getItem("token");
    if (token) {
      return {
        id: 1,
        name: "User",
        email: "user@example.com",
        mobile: "",
        qualification: "",
        profile_image: "",
      };
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

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
    logout: handleLogout,
  };
};
