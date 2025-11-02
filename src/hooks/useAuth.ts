import { useState, useEffect } from "react";
import { logout } from "../api/auth";
import { User } from "../types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (token) {
          setUser({
            id: 1,
            name: "User",
            email: "user@example.com",
            mobile: "",
            qualification: "",
            profile_image: "",
          });
        }
        setLoading(false);
      }
    };
    initializeUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("access_token");
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
