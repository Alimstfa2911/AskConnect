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

  const { loading, error, data } = useQuery(GET_QUESTION_BY_ID, {
    variables: { id },
    skip: !id,
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  const question = data?.question;
  if (error)
    return <Typography color="error">Error: {error?.message}</Typography>;
  if (!question) return <Typography>No question found</Typography>;

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {/* Left Column - Question */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <QuestionCard question={question} />
          </Paper>
        </Grid>

        {/* Right Column - Answers */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              height: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Answers
            </Typography>

            <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
              {question.answers.length > 0 ? (
                question.answers.map((ans, i) => (
                  <AnswerCard key={ans._id || i} answer={ans} />
                ))
              ) : (
                <Typography>No answers</Typography>
              )}
            </Box>

            {/* Form stays fixed at bottom of answers column */}
            <Box>
              <CreateAnswerForm questionId={question.id} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
