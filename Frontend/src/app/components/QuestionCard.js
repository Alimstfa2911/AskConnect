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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { DOWNVOTE_QUESTION, UPVOTE_QUESTION } from "../graphql/mutations";
import { GET_QUESTION_BY_ID } from "../graphql/queries";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function QuestionCard({ question }) {
  const router = useRouter();

  const [upvote] = useMutation(UPVOTE_QUESTION, {
    variables: { questionId: question.id },
    refetchQueries: [{ query: GET_QUESTION_BY_ID, variables: { id: question.id }}],
  });

  const [downvote] = useMutation(DOWNVOTE_QUESTION, {
    variables: { questionId: question.id},
    refetchQueries: [{ query: GET_QUESTION_BY_ID, variables: { id: question.id }}]
  });

  const voteCount = question.votes?.reduce((sum, v) => sum + v.value, 0) || 0;

  return (
    <Card sx={{ marginBottom: 2, padding: 1 }}>
      <CardContent>
        <Typography variant="h6">{question.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {question.description}
        </Typography>
        <Typography variant="caption" display="block" sx={{ marginTop: 1 }}>
          Asked by: {question.author?.name || "Anonymous"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2}}>
            <IconButton color="primary" onClick={() => upvote()}>
                <ThumbUpIcon />
            </IconButton>
            <Typography>{voteCount}</Typography>
            <IconButton color="error" onClick={() => downvote()}>
                <ThumbDownIcon />
            </IconButton>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => router.push(`/question/${question.id}`)}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
