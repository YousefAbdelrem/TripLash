import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { z } from "zod";
import apiClient from "../../services/api-client";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem("isAdmin") === "true"
  );
  const schema = z.object({
    username: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password is not Valid" }).max(50),
  });

  type signUpData = z.infer<typeof schema>;
  const login = async (username: string, password: string) => {
    // const response = await axios.post(`/api/login/`, { username, password });
    apiClient
      .post("Login/", { username, password, language: "E" })
      .then((response) => {
        console.log(response.data.status);
        console.log("Login response:", response);

        const newToken = response?.data?.token;
        console.log("Token from response:", newToken);

        const userTypes = response?.data?.data?.user_types;
        console.log("User types from response:", userTypes);

        if (newToken && userTypes) {
          const isAdmin = userTypes.includes("admin");

          setToken(newToken);
          setIsAdmin(isAdmin);

          localStorage.setItem("token", newToken);
          localStorage.setItem("isAdmin", isAdmin ? "true" : "false");

          console.log(response.data.user_types);
          console.log("Login successful:", { newToken, isAdmin });
        } else {
          console.error(
            "Token or user types missing in response:",
            response.data
          );
        }
      })
      .catch((err) => console.log(err.response?.data.status));
  };
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Remove the token from headers if it's not available
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setIsAdmin(false);

    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
