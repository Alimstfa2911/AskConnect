"use client";
import { createContext, useState, useEffect } from "react";
import { createApolloClient } from "../lib/apolloClient";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [client, setClient] = useState(createApolloClient());

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData && userData !== "undefined") {
      console.log("Token :", token);
      try {
        const parsedUser = JSON.parse(userData);
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
    setLoadingUser(false);
  }, [isLoggedIn]);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
        loadingUser,
        client,
      }}
    >
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
}
