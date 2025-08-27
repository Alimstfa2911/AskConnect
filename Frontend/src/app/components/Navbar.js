"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const goToLogin = () => {
    router.push("/login");
  };

  const goToRegister = () => {
    router.push("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          Community-Based-FAQ-forum
        </Typography>

        {!isLoggedIn ? (
          <>
            <Button color="inherit" onClick={goToLogin}>
              Login
            </Button>

            <Button color="inherit" onClick={goToRegister}>
              Register
            </Button>
          </>
        ) : (
          <>
            <Link href="/question/create" passHref>
              <Button color="inherit">Create Question</Button>
            </Link>
            <Link href="/profile" passHref>
              <Button color="inherit">Profile</Button>
            </Link>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
