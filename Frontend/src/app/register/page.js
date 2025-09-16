"use client";

import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import {
  Box,
  Button,
  TextField,
  Alert,
  Typography,
  Link as MuiLink,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import Template from "../pages/Template";
import { REGISTER } from "../graphql/mutations";
import { registerSchema } from "../validations/authValidation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const [registerMutation, { loading }] = useMutation(REGISTER, {
    onCompleted: (res) => {
      if (!res.registerUser.token) {
        setSuccessMsg("User already exists. Please try with other Email");
      } else {
        setSuccessMsg(" Registered,  Redirecting to login...");
        setTimeout(() => router.push("/login"), 1000);
      }
    },
    onError: (error) => {
      setErrorMsg(error.message);
    },
  });

  // const uploadImage = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "Community_forum");
  //   const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await res.json();
  //   return data.secure_url;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const { error } = registerSchema.validate(
      { name, email, password },
      { abortEarly: false }
    );

    if (error) {
      setErrorMsg(error.details.map((d) => d.message).join(", "));
      return;
    }

    let avatarUrl;
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Community_forum");

        const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        avatarUrl = data.secure_url;
      } catch (err) {
        setErrorMsg("Image upload failed");
        return;
      }
    }

    const variables = { name, email, password };
    if (avatarUrl) variables.avatar = avatarUrl;

    registerMutation({ variables });
  };

  return (
    <Template
      title="Join with millions brilliant mind on AskConnect"
      description2="Ask, Share and grow"
      form={
        <>
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
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                display: "block",
              }}
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
          </Box>

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

          <Snackbar
            open={!!successMsg}
            autoHideDuration={2000}
            onClose={() => setSuccessMsg("")}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              onClose={() => setSuccessMsg("")}
              severity="success"
              sx={{ width: "100%" }}
            >
              {successMsg}
            </MuiAlert>
          </Snackbar>
        </>
      }
    />
  );
}
