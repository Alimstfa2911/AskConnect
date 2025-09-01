"use client";

import { useMutation } from "@apollo/client/react";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { ADD_ANSWER } from "../graphql/mutations";
import { GET_QUESTION_BY_ID } from "../graphql/queries";

export default function CreateAnswerForm({ questionId }) {
  const [text, setText] = useState("");
  const [addAnswer, { loading }] = useMutation(ADD_ANSWER, {
    refetchQueries: [
      { query: GET_QUESTION_BY_ID, variables: { id: questionId } },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addAnswer({ variables: { questionId, text } });
    setText("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, backgroundColor: "#111827", p: 2, borderRadius: 2 }}
    >
      <TextField
        fullWidth
        multiline
        rows={3}
        placeholder="Write your answer..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          backgroundColor: "#1F2937",
          color: "#E5E7EB",
          "& .MuiInputBase-input": { color: "#E5E7EB" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#374151" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3B82F6" },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3B82F6" },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 1,
          backgroundColor: "#3B82F6",
          color: "#E5E7EB",
          "&:hover": { backgroundColor: "#2563EB" },
        }}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Answer"}
      </Button>
    </Box>
  );
}
