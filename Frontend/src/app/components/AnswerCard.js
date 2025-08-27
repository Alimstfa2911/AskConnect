"use client";

import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { UPVOTE_ANSWER, DOWNVOTE_ANSWER } from "../graphql/mutations";
import { GET_QUESTION_BY_ID } from "../graphql/queries";
import { useMutation } from "@apollo/client/react";

export default function AnswerCard({ answer }) {
  const questionId = answer.question?.id || answer.question;

  const [upvoteMutate] = useMutation(UPVOTE_ANSWER, {
    refetchQueries: [{ query: GET_QUESTION_BY_ID, variables: { id: questionId } }],
  });

  const [downvoteMutate] = useMutation(DOWNVOTE_ANSWER, {
    refetchQueries: [{ query: GET_QUESTION_BY_ID, variables: { id: questionId } }],
  });

  const voteCount = answer.votes?.reduce((sum, v) => sum + v.value, 0) || 0;

  return (
    <Card sx={{ marginBottom: 2, padding: 1 }}>
      <CardContent>
        <Typography variant="body1">{answer.text}</Typography>
        <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
          Answered by: {answer.author?.name || "Anonymous"}
        </Typography>
        <Typography variant="caption" display="block">
          Total Score: {voteCount} | Total Votes: {answer.votes?.length || 0}
        </Typography>
        {answer.votes && answer.votes.length > 0
          ? answer.votes.map((vote, i) => (
              <Typography key={i} variant="caption" display="block">
                {vote?.user?.name || "Anonymous"} - {vote.value}
              </Typography>
            ))
          : (
              <Typography variant="caption" color="text.secondary">
                No votes yet
              </Typography>
            )}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <IconButton color="primary" onClick={() => upvoteMutate({ variables: { answerId: answer.id } })}>
            <ThumbUpIcon />
          </IconButton>
          <Typography>{voteCount}</Typography>
          <IconButton color="error" onClick={() => downvoteMutate({ variables: { answerId: answer.id } })}>
            <ThumbDownIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
