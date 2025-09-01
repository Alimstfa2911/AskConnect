"use client";

import AnswerCard from "@/app/components/AnswerCard";
import QuestionCard from "@/app/components/QuestionCard";
import { GET_QUESTION_BY_ID } from "@/app/graphql/queries";
import { useQuery } from "@apollo/client/react";
import {
  CircularProgress,
  Typography,
  Box,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { useParams } from "next/navigation";
import CreateAnswerForm from "@/app/components/CreateAnswerForm";

export default function QuestionDetailPage() {
  const params = useParams();
  const { id } = params;

  const { _, error, data } = useQuery(GET_QUESTION_BY_ID, {
    variables: { id },
    skip: !id,
  });

  const question = data?.question;

  if (error)
    return <Typography color="error">Error: {error?.message}</Typography>;
  if (!question) return <Typography>No question found</Typography>;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1, // take only available space
        py: 4, // padding top-bottom
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        {/* Left - Question */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            width: "48%",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <QuestionCard question={question} hideViewButton={true} />
        </Paper>

        {/* Right - Answers */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            width: "48%",
            display: "flex",
            flexDirection: "column",
            height: "80vh", // fix height (same as left panel)
            overflow: "hidden", // prevent outer overflow
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Answers
          </Typography>

          {/* Scrollable section */}
          <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
            {question.answers.length > 0 ? (
              question.answers.map((ans) => (
                <AnswerCard key={ans.id} answer={ans} />
              ))
            ) : (
              <Typography>No answers</Typography>
            )}
          </Box>

          {/* Form stays pinned at bottom */}
          <Box sx={{ mt: 2 }}>
            <CreateAnswerForm questionId={question.id} />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
