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
  const downvoteCount = question.votes?.filter((v) => v.value === -1).length || 0;

  const userVote = question.votes?.find((v) => v.user?.id === user?.id)?.value;

  const [upvote] = useMutation(UPVOTE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTION_BY_ID, variables: { id: question.id } }],
  });

  const [downvote] = useMutation(DOWNVOTE_QUESTION, {
    refetchQueries: [{ query: GET_QUESTION_BY_ID, variables: { id: question.id } }],
  });

  const handleVote = async (type) => {
    if (!isLoggedIn) return; 

    if (type === "upvote") {
      await upvote({ variables: { questionId: question.id } });
    } else if (type === "downvote") {
      await downvote({ variables: {  questionId: question.id } });
    }
  };

  return (
    <Card sx={{ mb: 2, p: 1 }}>
      <CardContent>
        <Typography variant="h6">{question.title}</Typography>
        <Typography variant="body2" color="text.secondary">{question.description}</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Asked by: {question.author?.name || "Anonymous"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
          <Tooltip title={isLoggedIn ? "" : "Login to vote"}>
            <span>
              <IconButton
                color={userVote === 1 ? "primary" : "default"}
                onClick={() => handleVote("upvote")}
                disabled={!isLoggedIn}
              >
                <ThumbUpIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Typography>{upvoteCount}</Typography>

          <Tooltip title={isLoggedIn ? "" : "Login to vote"}>
            <span>
              <IconButton
                color={userVote === -1 ? "error" : "default"}
                onClick={() => handleVote("downvote")}
                disabled={!isLoggedIn}
              >
                <ThumbDownIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Typography>{downvoteCount}</Typography>
        </Box>
      </CardContent>

      {!hideViewButton && (
        <CardActions>
          <Button size="small" onClick={() => router.push(`/question/${question.id}`)}>
            View
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
