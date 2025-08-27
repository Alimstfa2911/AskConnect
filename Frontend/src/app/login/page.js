"use client";

import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext"; // import context

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { login: contextLogin } = useContext(AuthContext); // get login function

  const [loginMutation, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data?.loginUser?.token;
      if (token) {
        contextLogin(token);
        router.push("/");
      } else {
        setErrorMsg("Login failed");
      }
    },
    onError: (error) => {
      setErrorMsg(error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    loginMutation({ variables: { email, password } });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
    >
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </Box>
  );
}
