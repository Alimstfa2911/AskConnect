"use client";

import { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

import { CREATE_QUESTION } from "../graphql/mutations";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@apollo/client/react";

export default function CreateQuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  const [createQuestion, { loading }] = useMutation(CREATE_QUESTION, {
    onCompleted: () => {
      router.push("/"); // redirect to homepage after creation
    },
    onError: (err) => {
      setErrorMsg(err.message);
    },
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

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Share with community...
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
        <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2 }}>
          {loading ? "Creating..." : "Share..."}
        </Button>
        {errorMsg && <Typography color="error" sx={{ mt: 1 }}>{errorMsg}</Typography>}
      </Box>
    </Box>
  );
}
