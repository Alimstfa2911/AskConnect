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
  console.log("Quesyion :", question);

  if (error)
    return <Typography color="error">Error: {error?.message}</Typography>;
  if (!question) return <Typography>No question found</Typography>;

  return (
    <Container sx={{ mt: 3 }}>
      {/* Left Column - Question */}
      <Box
        sx={{
          display: "flex",
          gap: 2, // space between columns
          alignItems: "flex-start",
          height: "80vh",
        }}
      >
        {/* Left Column - Question */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            width: "48%", // fixed width
            display: "flex",
            flexDirection: "column",
            overflow: "auto", // scroll if question is long
          }}
        >
          <QuestionCard question={question} hideViewButton={true} />
        </Paper>

        {/* Right Column - Answers */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            width: "48%", // fixed width
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            height: "100%", // same height as left
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Answers
          </Typography>

          {/* Scrollable answers list */}
          <Box sx={{ flex: 1, overflowY: "auto", mb: 2, minHeight: 0 }}>
            {question.answers.length > 0 ? (
              question.answers.map((ans) => (
                <AnswerCard key={ans.id} answer={ans} />
              ))
            ) : (
              <Typography>No answers</Typography>
            )}
          </Box>

          {/* Form stays fixed at bottom */}
          <Box>
            <CreateAnswerForm questionId={question.id} />
          </Box>
        </Paper>
      </Box>

      {/* Right Column - Answers */}
      <Grid
        item
        xs={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          mb: 6,
        }}
      ></Grid>
    </Container>
  );
}
