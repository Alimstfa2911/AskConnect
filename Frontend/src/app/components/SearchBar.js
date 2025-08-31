"use client";

import { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { SEARCH_QUESTIONS } from "../graphql/queries";
import QuestionCard from "./QuestionCard";
import { useLazyQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const { user, isLoggedIn } = useContext(AuthContext);

  const [searchQuestions, { data, loading, error }] =
    useLazyQuery(SEARCH_QUESTIONS);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (keyword.trim() !== "") {
        searchQuestions({ variables: { keyword } });
      }
    }, 0);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to the Community
        </Typography>

        <Typography variant="h6" color="text.secondary" mb={4}>
          Find answers, ask questions, and connect with our community of
          specialists!
        </Typography>

        <Box display="flex" justifyContent="center" gap={1} sx={{ mb: 3 }}>
          <TextField
            placeholder="Search the community"
            variant="outlined"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            sx={{
              flex: 1,
              maxWidth: 500,
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"></InputAdornment>
              ),
            }}
          />

          <Tooltip title={isLoggedIn ? "" : "Login to ask a question"}>
            <span>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (isLoggedIn) {
                    router.push("/createQuestion");
                  } else {
                    router.push("/login");
                  }
                }}
                disabled={!isLoggedIn}
                sx={{
                  borderRadius: "50px",
                  height: "56px",
                  textTransform: "none",
                  px: 4,
                }}
              >
                Ask Question
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {loading && <Typography>Searching...</Typography>}
      {error && <Typography color="error">{error.message}</Typography>}

      {data?.searchQuestions?.length > 0
        ? data.searchQuestions.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))
        : keyword && <Typography>No questions found.</Typography>}
    </Box>
  );
}
