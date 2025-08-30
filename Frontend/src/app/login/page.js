"use client";

import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import {
  Box,
  Button,
  TextField,
  Link as MuiLink,
  Card,
  Typography,
  Alert,
} from "@mui/material";
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
      if (token) {
        contextLogin(token);
        router.push("/");
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          boxShadow: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mb={2}
        >
          Please login to continue
        </Typography>

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
          sx={{ mt: 3, py: 1.2 }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        {/* Forgot + Signup Links */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <MuiLink
            component="button"
            variant="body2"
            underline="hover"
            onClick={() => router.push("/forget_password")}
          >
            Forgot Password ?
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
               SignUp
            </MuiLink>
          </Typography>
          
        </Box>
      </Card>
    </Box>
  );
}
