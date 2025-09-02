"use client";

import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link as MuiLink,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import Template from "../pages/Template";
import Login_Image from '../public/images/Login_Image.jpg';


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
      console.log("Token :", token);
      console.log("User :", user);
      if (token && user) {
        contextLogin(token, user);
         router.push("/profile");
      } else {
        setErrorMsg("Login failed");
      }
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    loginMutation({ variables: { email, password } });
  };

  // Form JSX
  const form = (
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

      {/* Links */}
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
    </Box>
  );

  return (
    <Template
      title="Welcome Back"
      description1="Get back to your community"
      description2="Ask and Share with others"
      image={Login_Image}
      form={form}
    />
  );
}
