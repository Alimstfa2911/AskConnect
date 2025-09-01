"use client";

import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { createApolloClient } from "./lib/apolloClient";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_QUESTIONS } from "./graphql/queries";
import QuestionCard from "./components/QuestionCard";
import SearchBar from "./components/SearchBar";
import { useContext, useMemo } from "react";
import { AuthContext } from "./context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const client = useMemo(() => createApolloClient(), []);
  const { _, error, data } = useQuery(GET_ALL_QUESTIONS, { client });
  const router = useRouter();
  const { user } = useContext(AuthContext);

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  // if (!data?.questions || data.questions.length === 0) {
  //   return (
  //     <Box display="flex" justifyContent="center" mt={5}>
  //       <Typography color="white">No questions found.</Typography>
  //     </Box>
  //   );
  // }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#0b0f19",
        color: "white",
        px: 3,
        py: 6,
      }}
    >
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          Empower your knowledge with{" "}
          <span style={{ color: "#38bdf8" }}>AskConnect</span>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 700,
            mx: "auto",
            color: "#9ca3af",
          }}
        >
          Ask, answer, like, and dislike with community.
        </Typography>
      </Box>

      <SearchBar />

      <Card
        sx={{
          p: 3,
          mt: 5,
          bgcolor: "#111827",
          borderRadius: 3,
          boxShadow: "0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 2, color: "#38bdf8" }}
        >
          Recent Discussions
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {data?.questions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </Box>
      </Card>
    </Box>
  );
}
