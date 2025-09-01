"use client";

import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useMutation } from "@apollo/client/react";
import { UPVOTE_ANSWER, DOWNVOTE_ANSWER } from "../graphql/mutations";
import { GET_QUESTION_BY_ID } from "../graphql/queries";
import { AuthContext } from "../context/AuthContext";

export default function AnswerCard({ answer }) {
  const { user, isLoggedIn } = useContext(AuthContext);

  const answerId = answer.id || answer._id;
  const questionId =
    answer.question?.id || answer.question?._id || answer.question;

  const [upvoteMutate] = useMutation(UPVOTE_ANSWER, {
    variables: { answerId },
    refetchQueries: [
      { query: GET_QUESTION_BY_ID, variables: { id: questionId } },
    ],
  });

  const [downvoteMutate] = useMutation(DOWNVOTE_ANSWER, {
    update(cache, { data: { downvoteAnswer } }) {
      const existing = cache.readQuery({
        query: GET_QUESTION_BY_ID,
        variables: { id: questionId },
      });
      if (!existing) return;

      const updatedAnswers = existing.question.answers.map((ans) =>
        ans.id === downvoteAnswer.id ? downvoteAnswer : ans
      );

      cache.writeQuery({
        query: GET_QUESTION_BY_ID,
        variables: { id: questionId },
        data: { question: { ...existing.question, answers: updatedAnswers } },
      });
    },
  });

  const upvoteCount = answer.votes?.filter((v) => v.value === 1).length || 0;
  const downvoteCount = answer.votes?.filter((v) => v.value === -1).length || 0;
  const userVote = answer.votes?.find(
    (v) => v.user?.id === user?.id || v.user?._id === user?.id
  )?.value;

  const handleVote = async (type) => {
    if (!isLoggedIn || !answerId) return;

    try {
      if (type === "upvote") await upvoteMutate({ variables: { answerId } });
      if (type === "downvote") await downvoteMutate({ variables: { answerId } });
    } catch (err) {
      console.error("Vote mutation failed:", err);
    }
  };

  return (
    <Card sx={{ mb: 2, p: 1, backgroundColor: "#111827", color: "#E5E7EB" }}>
      <CardContent>
        <Typography variant="body1" sx={{ color: "#E5E7EB" }}>
          {answer.text}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1, color: "#9CA3AF" }}
        >
          Answered by: {answer.author?.name || "Anonymous"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <Tooltip title={isLoggedIn ? "" : "Login to vote"}>
            <span>
              <IconButton
                onClick={() => handleVote("upvote")}
                sx={{ color: userVote === 1 ? "#3B82F6" : "#E5E7EB" }}
                disabled={!isLoggedIn}
              >
                <ThumbUpIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Typography sx={{ color: "#E5E7EB" }}>{upvoteCount}</Typography>

          <Tooltip title={isLoggedIn ? "" : "Login to vote"}>
            <span>
              <IconButton
                onClick={() => handleVote("downvote")}
                sx={{ color: userVote === -1 ? "#EF4444" : "#E5E7EB" }}
                disabled={!isLoggedIn}
              >
                <ThumbDownIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Typography sx={{ color: "#E5E7EB" }}>{downvoteCount}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
