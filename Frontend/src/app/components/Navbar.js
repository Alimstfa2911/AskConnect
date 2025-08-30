"use client";

import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  const handleNavigation = (path) => router.push(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1864ab", zIndex: 1300 }}>
      <Toolbar sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          AskConnect
        </Typography>

  

        {/* Auth Buttons */}
        {!isLoggedIn ? (
          <>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/login")}
              sx={{ "&:hover": { backgroundColor: "primary.dark" } }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/register")}
              sx={{ "&:hover": { backgroundColor: "primary.dark" } }}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/question/create")}
              sx={{ "&:hover": { backgroundColor: "primary.dark" } }}
            >
              Create Question
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigation("/profile")}
              sx={{ "&:hover": { backgroundColor: "primary.dark" } }}
            >
              Profile
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ "&:hover": { backgroundColor: "primary.dark" } }}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
