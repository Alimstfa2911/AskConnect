"use client";

import { useState, useContext, useEffect } from "react";
import { Box, TextField, Button, Alert, Stack } from "@mui/material";
import { CREATE_QUESTION } from "../graphql/mutations";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@apollo/client/react";
import Template from "../pages/Template";

export default function CreateQuestionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION, {
    onCompleted: () => router.push("/"),
    onError: (err) => setErrorMsg(err.message),
  });

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

  const form = (
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
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3B82F6" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3B82F6" },
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
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3B82F6" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3B82F6" },
        }}
      />

      {errorMsg && (
        <Alert severity="error" sx={{ mt: 2, backgroundColor: "#B91C1C", color: "#FEE2E2" }}>
          {errorMsg}
        </Alert>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => router.back()}
          sx={{
            py: 1.2,
            borderColor: "#3B82F6",
            color: "#3B82F6",
            "&:hover": { borderColor: "#2563EB", backgroundColor: "rgba(59,130,246,0.1)" },
          }}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.2,
            backgroundColor: "#3B82F6",
            color: "#E5E7EB",
            "&:hover": { backgroundColor: "#2563EB", transform: "scale(1.02)" },
            transition: "0.3s",
          }}
        >
          {loading ? "Creating..." : "Share"}
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Template
      title="Share with the community"
      description1="Post your question with a clear title and description so others can help."
      description2="Your contribution empowers knowledge sharing."
      form={form}
    />
  );
}
