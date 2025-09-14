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
      router.push("/");
    },
    onError: (err) => {
      setErrorMsg(err.message);
    },
  });

  useEffect(() => {
    setFadeIn(true);
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
        alignItems: "flex-start",
        gap: 4,
        mt: 5,
        px: 2,
      }}
    >
      {/* Left side text */}
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Create a New Question
        </Typography>
        <Typography variant="body1" sx={{ color: "#9CA3AF" }}>
          Share your doubts, insights, or challenges with the community. 
          Others will join in to answer, discuss, and learn with you.
        </Typography>
      </Box>

      {/* Form card */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: "#111827",
          color: "#E5E7EB",
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
            sx={{
              backgroundColor: "#1F2937",
              "& .MuiInputBase-input": { color: "#E5E7EB" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3B82F6",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3B82F6",
              },
            }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              backgroundColor: "#1F2937",
              "& .MuiInputBase-input": { color: "#E5E7EB" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3B82F6",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3B82F6",
              },
            }}
          />

          {errorMsg && (
            <Alert
              severity="error"
              sx={{ mt: 2, backgroundColor: "#B91C1C", color: "#FEE2E2" }}
            >
              {errorMsg}
            </Alert>
          )}

          {/* Buttons row */}
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1.2,
                backgroundColor: "#3B82F6",
                color: "#E5E7EB",
                "&:hover": {
                  backgroundColor: "#2563EB",
                  transform: "scale(1.02)",
                },
                transition: "0.3s",
              }}
            >
              {loading ? "Creating..." : "Share"}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => router.back()}
              sx={{
                py: 1.2,
                borderColor: "#3B82F6",
                color: "#3B82F6",
                "&:hover": {
                  borderColor: "#2563EB",
                  backgroundColor: "rgba(59,130,246,0.1)",
                },
              }}
            >
              Back
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
