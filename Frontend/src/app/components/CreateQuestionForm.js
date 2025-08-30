"use client";

import { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Typography, Card, Alert } from "@mui/material";
import { CREATE_QUESTION } from "../graphql/mutations";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@apollo/client/react";

export default function CreateQuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION, {
    onCompleted: () => {
      router.push("/"); // redirect after creation
    },
    onError: (err) => {
      setErrorMsg(err.message);
    },
  });

  useEffect(() => {
    setFadeIn(true); // trigger fade-in animation on mount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg("Title and description are required.");
      return;
    }
    if (!isLoggedIn) {
      setErrorMsg("You must be logged in to create a question.");
      return;
    }
    createQuestion({ variables: { title, description } });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
          boxShadow: 4,
          borderRadius: 3,
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Share with the community
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            sx={{
              mt: 3,
              py: 1.2,
              transition: "0.3s",
              "&:hover": { backgroundColor: "primary.dark", transform: "scale(1.02)" },
            }}
          >
            {loading ? "Creating..." : "Share..."}
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
