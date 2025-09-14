"use client";

import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Link as MuiLink,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { LOGIN } from "../graphql/mutations";
import Template from "../pages/Template";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const { login: contextLogin } = useContext(AuthContext);

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data?.loginUser?.token;
      const user = data?.loginUser?.user;
      if (token && user) {
        contextLogin(token, user);
        setSuccessMsg("Login successful! Redirecting...");
        setTimeout(() => router.push("/profile"), 500);
      } else {
        setErrorMsg("Incorrect email or password");
      }
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Invalid email format");
      return;
    }

    loginMutation({ variables: { email, password } });
  };

  const form = (
    <>
      <Box component="form" onSubmit={handleSubmit}>
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

        {errorMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <MuiLink
          component="button"
          variant="body2"
          underline="hover"
          onClick={() => router.push("/forget_password")}
        >
          Forgot Password?
        </MuiLink>
        <br />
        <Typography variant="body2" color="text.secondary">
          Not registered?{" "}
          <MuiLink
            component="button"
            variant="body2"
            underline="hover"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </MuiLink>
        </Typography>
      </Box>
      <Snackbar
        open={!!successMsg}
        autoHideDuration={2000}
        onClose={() => setSuccessMsg("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccessMsg("")}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#4caf50", color: "#fff" }}
        >
          {successMsg}
        </Alert>
      </Snackbar>
    </>
  );

  return (
    <Template
      title="Welcome Back"
      description1="Get back to your community"
      description2="Ask and Share with others"
      form={form}
    />
  );
}
