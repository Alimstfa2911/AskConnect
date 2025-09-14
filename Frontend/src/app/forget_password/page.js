"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD } from "../graphql/mutations";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [forgotPassword, { data, loading, error }] =
    useMutation(FORGOT_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await forgotPassword({ variables: { email } });
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "80vh",
        justifyContent: "space-around",
        alignItems: "center",
        px: 2,
        bgcolor: "#0f172a", 
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 4,
          borderRadius: 2,
          bgcolor: "#1f2937",
          color: "#facc15",
          minHeight: 400,
          maxWidth: 400,
          mr: 4,
        }}
      >
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={1500}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Email sent to registered Email for password reset
          </Alert>
        </Snackbar>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Forgot Password
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Enter your registered email to reset your password.
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          You will receive a link valid for 15 minutes.
        </Typography>
      </Box>

      <Card sx={{ p: 4, width: 400, borderRadius: 2, bgcolor: "#111827" }}>
        <Typography variant="h5" mb={2} sx={{ color: "#38bdf8" }}>
          Send Reset Link
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ input: { color: "#f9fafb" } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: "#3b82f6",
              "&:hover": { backgroundColor: "#2563eb" },
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        {data && (
          <Typography color="green" mt={2}>
            {data.forgotPassword.message}
          </Typography>
        )}
        {error && (
          <Typography color="red" mt={2}>
            {error.message}
          </Typography>
        )}
      </Card>
    </Box>
  );
}
