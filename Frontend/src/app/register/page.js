"use client";

import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import { Box, Button, TextField, Alert, Typography, Link as MuiLink } from "@mui/material";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { REGISTER } from "../graphql/mutations";
import Template from "../pages/Template";
import Register_image from "@/app/public/images/Register_image.jpg";

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
        localStorage.setItem("token", token);
        router.push("/");
      }
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Community_forum");
    const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
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
      } catch {
        setErrorMsg("Image upload failed");
        return;
      }
    }

    registerMutation({
      variables: { name, email, password, avatar: avatarUrl },
    });
  };

  const form = (
    <Box component="form" onSubmit={handleSubmit}>
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
        style={{ marginTop: "15px", marginBottom: "15px", display: "block" }}
      />

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ py: 1.2, mt: 2 }}
      >
        {loading ? "Registering..." : "Register"}
      </Button>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <MuiLink
            component="button"
            onClick={() => router.push("/login")}
            sx={{ fontWeight: "bold", cursor: "pointer" }}
          >
            Login
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Template
      title="Join with millions brilliant mind on AskConnect"
      description2="Ask, Share and grow"
      image={Register_image}
      form={form}
    />
  );
}
