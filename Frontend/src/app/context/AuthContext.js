"use client";
import { createContext, useState, useEffect } from "react";
import { createApolloClient } from "../lib/apolloClient";
import { getAddressFromCoords } from "../api/location";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [client, setClient] = useState(createApolloClient());

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData && userData !== "undefined") {
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

  useEffect(() => {
    if (isLoggedIn && user) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            setLocation({ lat: latitude, long: longitude });
            try {
              const data = await getAddressFromCoords(latitude, longitude);
              setAddress(
                data.address?.city ||
                  data.address?.town ||
                  data.address?.state ||
                  "unknown"
              );
            } catch (err) {
              console.error("Failed to fetch address :", err);
            }
          },
          (err) => console.log("Geolocation error :", err.message)
        );
      } else {
        setLocation(null);
        setAddress(null);
      }
    }
  }, [isLoggedIn, user]);

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
        location,
        address
      }}
    >
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
}
