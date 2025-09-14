"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
import { RESET_PASSWORD } from "@/app/graphql/mutations";
import { useMutation } from "@apollo/client/react";

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation check
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return; // ✅ Stop execution
    }

    setValidationError(""); // Clear error if valid

    try {
      const res = await resetPassword({
        variables: { token, newPassword: password },
      });
      if (res.data) {
        setSnackbarOpen(true);
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (err) {
      console.error(err);
    }
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
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          Reset Your Password
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Enter a new password to regain access to your account.
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          Stay safe and secure!
        </Typography>
      </Box>

      <Card sx={{ p: 4, width: 400, borderRadius: 2, bgcolor: "#111827" }}>
        <Typography variant="h5" mb={2} sx={{ color: "#38bdf8" }}>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ input: { color: "#f9fafb" } }}
          />

          {/* ✅ Display validation error */}
          {validationError && (
            <Typography color="red" variant="body2" mt={1}>
              {validationError}
            </Typography>
          )}

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
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        {data && (
          <Typography color="green" mt={2}>
            {data.resetPassword.message}
          </Typography>
        )}
        {error && (
          <Typography color="red" mt={2}>
            {error.message}
          </Typography>
        )}
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Password reset successful! Redirecting to login...
        </Alert>
      </Snackbar>
    </Box>
  );
}
