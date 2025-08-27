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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder="Write your answer..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 1 }}
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Answer"}
      </Button>
    </Box>
  );
}
