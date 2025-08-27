"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import client from "./lib/apolloClient";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_QUESTIONS } from "./graphql/queries";
import QuestionCard from "./components/QuestionCard";
import SearchBar from "./components/SearchBar";

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_ALL_QUESTIONS, { client });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  if (!data || !data?.questions || data?.questions.length === 0) {
    return <p>No questions found.</p>;
  }

  return (
    <div>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <SearchBar />
        <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
          Recent Discussions...
        </Typography>
        {data.questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </Box>
    </div>
  );
}
