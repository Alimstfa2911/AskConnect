"use client";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Card } from "@mui/material";
import { RESET_PASSWORD } from "@/app/graphql/mutations";



export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await resetPassword({ variables: { token, newPassword: password } });
    if (res.data) {
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>Reset Password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
        {data && <Typography color="green" mt={2}>{data.resetPassword.message}</Typography>}
        {error && <Typography color="red" mt={2}>{error.message}</Typography>}
      </Card>
    </Box>
  );
}
