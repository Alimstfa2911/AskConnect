"use client";

import { Box, Card, CircularProgress, Typography } from "@mui/material";
import client from "./lib/apolloClient";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_QUESTIONS } from "./graphql/queries";
import QuestionCard from "./components/QuestionCard";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { _, error, data } = useQuery(GET_ALL_QUESTIONS, { client });


  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  if (!data?.questions || data.questions.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography>No questions found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", mt: 4, px: 2 }}>
      <SearchBar />

      <Card sx={{ p: 3, mt: 3, boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Recent Discussions
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {data?.questions.length &&data.questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </Box>
      </Card>
    </Box>
  );
}
