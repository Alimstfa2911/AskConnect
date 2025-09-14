"use client";

import { useMutation } from "@apollo/client/react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { DOWNVOTE_QUESTION, UPVOTE_QUESTION } from "../graphql/mutations";
import { GET_QUESTION_BY_ID } from "../graphql/queries";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function QuestionCard({ question, hideViewButton = false }) {
  const router = useRouter();
  const { user, isLoggedIn } = useContext(AuthContext);

  const upvoteCount = question.votes?.filter((v) => v.value === 1).length || 0;
  const downvoteCount =
    question.votes?.filter((v) => v.value === -1).length || 0;
  const userVote = question.votes?.find((v) => v.user?.id === user?.id)?.value;

  const [upvote] = useMutation(UPVOTE_QUESTION, {
    refetchQueries: [
      { query: GET_QUESTION_BY_ID, variables: { id: question.id } },
    ],
  });

  const [downvote] = useMutation(DOWNVOTE_QUESTION, {
    refetchQueries: [
      { query: GET_QUESTION_BY_ID, variables: { id: question.id } },
    ],
  });

  const handleVote = async (type) => {
    if (!isLoggedIn) return;

    if (type === "upvote") {
      await upvote({ variables: { questionId: question.id } });
    } else if (type === "downvote") {
      await downvote({ variables: { questionId: question.id } });
    }
  };

  return (
    <Card sx={{ p: 5, backgroundColor: "#111827", color: "#E5E7EB" }}>
      <CardContent>
        
        <Typography variant="h6" sx={{ color: "#E5E7EB" }}>
          {question.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "#D1D5DB" }}>
          {question.description}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1, color: "#9CA3AF" }}
        >
          Asked by: {question.author?.name || "Anonymous"}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#9CA3AF", mb: 1, mt: 1 }}
          display="block"
        >
          {Date(question.createdAt).toLocaleString()}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <Tooltip title={isLoggedIn ? "" : "Login to vote"}>
            <span>
              <IconButton
                sx={{ color: userVote === 1 ? "#3B82F6" : "#E5E7EB" }}
                onClick={() => handleVote("upvote")}
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
                sx={{ color: userVote === -1 ? "#EF4444" : "#E5E7EB" }}
                onClick={() => handleVote("downvote")}
                disabled={!isLoggedIn}
              >
                <ThumbDownIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Typography sx={{ color: "#E5E7EB" }}>{downvoteCount}</Typography>
        </Box>
      </CardContent>

      {!hideViewButton && (
        <CardActions>
          <Button
            size="small"
            sx={{ color: "#3B82F6" }}
            onClick={() => router.push(`/question/${question.id}`)}
          >
            View
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
