"use client";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1864ab", zIndex: 1300 }}>
      <Toolbar sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => router.push("/")}>AskConnect</Typography>

        {!isLoggedIn ? (
          <>
            <Button color="inherit" onClick={() => router.push("/login")}>Login</Button>
            <Button color="inherit" onClick={() => router.push("/register")}>Register</Button>
          </>
        ) : (
          <>
            {user?.role === "admin" && <Button color="inherit" onClick={() => router.push("/admin/dashboard")}>Admin Dashboard</Button>}
            <Button color="inherit" onClick={() => router.push("/profile")}>Profile</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
