"use client";
import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "../notification/page";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setSnackOpen(true);
    setTimeout(() => router.push("/"), 10);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          px: 3,
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
              color: "#facc15",
              "&:hover": { color: "#fde047" },
            }}
            onClick={() => router.push("/")}
          >
            AskConnect
          </Typography>

          {!isLoggedIn ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={() => router.push("/login")}
                sx={{
                  color: "#e5e7eb",
                  textTransform: "none",
                  "&:hover": { color: "#38bdf8" },
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => router.push("/register")}
                sx={{
                  color: "#e5e7eb",
                  textTransform: "none",
                  "&:hover": { color: "#38bdf8" },
                }}
              >
                Register
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {user?.role === "admin" && <NotificationBell userId={user.id} />}
              <Button
                onClick={() => router.push("/profile")}
                sx={{
                  color: "#e5e7eb",
                  textTransform: "none",
                  "&:hover": { color: "#38bdf8" },
                }}
              >
                Profile
              </Button>
              <Button
                onClick={handleLogout}
                sx={{
                  color: "#f87171",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { color: "#ef4444" },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Logout Snackbar */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#4caf50", color: "#fff" }}
        >
          Logout successful!
        </Alert>
      </Snackbar>
    </>
  );
}
