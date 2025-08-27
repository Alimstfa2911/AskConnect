"use client";

import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { REGISTER } from "../graphql/mutations";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { login: contextLogin } = useContext(AuthContext);

  const [registerMutation, { loading }] = useMutation(REGISTER, {
    onCompleted: (data) => {
      const token = data?.registerUser?.token;
      if (token) {
        contextLogin(token);
        router.push("/");
      }

      localStorage.setItem("token", token);

      contextLogin(token);
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Community_forum");
    const res = await fetch(
      process.env.NEXT_PUBLIC_CLOUDINARY_URL,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    console.log("Secure_url :", data.secure_url);
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name || !email || !password) {
      setErrorMsg("All fields are required");
      return;
    }

    let avatarUrl = null;
    if (file) {
      try {
        avatarUrl = await uploadImage(file);
      } catch (err) {
        setErrorMsg("Image upload failed");
        return;
      }
    }
    registerMutation({
      variables: { name, email, password, avatar: avatarUrl },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
    >
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      />
      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </Box>
  );
}
