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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
    setLoading(false);
  }, [setIsLoggedIn]);

  if (loading) return null;
  
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
              onClick={() => router.push("/login")}
              sx={{ "&:hover": { backgroundColor: "primary.dark" } }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => router.push("/register")}
              sx={{ "&:hover": { backgroundColor: "primary.dark" } }}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => router.push("/question/create")}
              sx={{ "&:hover": { backgroundColor: "primary.dark" } }}
            >
              Create Question
            </Button>
            <Button
              color="inherit"
              onClick={() => router.push("/profile")}
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
