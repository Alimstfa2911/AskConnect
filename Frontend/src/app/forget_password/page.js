"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography, Card } from "@mui/material";
import { useMutation } from "@apollo/client/react";
import { FORGOT_PASSWORD } from "../graphql/mutations";



export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword, { data, loading, error }] = useMutation(FORGOT_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword({ variables: { email } });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>Forgot Password</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        {data && <Typography color="green" mt={2}>{data.forgotPassword.message}</Typography>}
        {error && <Typography color="red" mt={2}>{error.message}</Typography>}
      </Card>
    </Box>
  );
}
