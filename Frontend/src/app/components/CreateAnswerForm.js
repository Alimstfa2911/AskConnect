"use client";

import { useMutation } from "@apollo/client/react";
import { Box, Button, TextField, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import { ADD_ANSWER } from "../graphql/mutations";
import { GET_QUESTION_BY_ID } from "../graphql/queries";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CreateAnswerForm({ questionId }) {
  const [text, setText] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

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
      onSubmit={isLoggedIn ? handleSubmit : (e) => e.preventDefault()}
      sx={{ mt: 2, backgroundColor: "#111827", p: 2, borderRadius: 2 }}
    >
      <Tooltip title={isLoggedIn ? "" : "Login to write an answer"}>
        <span style={{ width: "100%" }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Write your answer..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!isLoggedIn}
            sx={{
              backgroundColor: "#1F2937",
              color: "#E5E7EB",
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
        </span>
      </Tooltip>

      <Tooltip title={isLoggedIn ? "" : "Login to post an answer"}>
        <span>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              backgroundColor: "#3B82F6",
              color: "#E5E7EB",
              "&:hover": { backgroundColor: "#2563EB" },
              mr: 2, 
            }}
            disabled={!isLoggedIn || loading}
          >
            {loading ? "Posting..." : "Post Answer"}
          </Button>

          <Button
            variant="contained"
            onClick={() => router.back()}
            sx={{
              mt: 1,
              backgroundColor: "#6B7280", 
              color: "#E5E7EB",
              "&:hover": { backgroundColor: "#4B5563" },
            }}
          >
            Back
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
