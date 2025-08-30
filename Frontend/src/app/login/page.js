"use client";
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import { Box, Button, TextField, Card, Typography, Alert, Link as MuiLink } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { login: contextLogin } = useContext(AuthContext);

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data?.loginUser?.token;
      const user = data?.loginUser?.user;
      if (token && user) {
        contextLogin(token, user);
        if (user.role === "admin") router.push("/admin/dashboard");
        else router.push("/profile");
      } else {
        setErrorMsg("Login failed");
      }
    },
    onError: (error) => setErrorMsg(error.message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    loginMutation({ variables: { email, password } });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", justifyContent: "center", minHeight: "80vh", px: 2 }}>
      <Card sx={{ width: "100%", maxWidth: 400, p: 4, boxShadow: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>Login</Typography>
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
        <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 3 }}> {loading ? "Logging in..." : "Login"} </Button>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <MuiLink component="button" onClick={() => router.push("/register")}>Sign Up</MuiLink>
        </Box>
      </Card>
    </Box>
  );
}
