"use client";

import { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Tooltip,
  IconButton,
  Card,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { SEARCH_QUESTIONS } from "../graphql/queries";
import QuestionCard from "./QuestionCard";
import { useLazyQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  const [searchQuestions, { data, loading, error }] =
    useLazyQuery(SEARCH_QUESTIONS);

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3; // cards visible at a time
  const cardWidth = 300; // adjust based on your QuestionCard width

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (keyword.trim() !== "") {
        searchQuestions({ variables: { keyword } });
        setCurrentIndex(0); // reset carousel
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0)); // slide 1 card
  };

  const handleNext = () => {
    if (data?.searchQuestions) {
      setCurrentIndex((prev) =>
        Math.min(prev + 1, data.searchQuestions.length - visibleCount)
      );
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Search Input + Ask Button */}
      <Box display="flex" justifyContent="center" gap={2} sx={{ mb: 5 }}>
        <TextField
          placeholder="Search the community"
          variant="outlined"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{
            flex: 1,
            maxWidth: 500,
            "& .MuiOutlinedInput-root": { borderRadius: "50px" },
          }}
        />
        <Tooltip title={isLoggedIn ? "" : "Login to ask a question"}>
          <span>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                router.push(isLoggedIn ? "/createQuestion" : "/login")
              }
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

      {loading && <Typography>Searching...</Typography>}
      {error && <Typography color="error">{error.message}</Typography>}

      {/* Search Results Carousel */}
      {data?.searchQuestions?.length > 0 && (
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
            Search Results
          </Typography>

          <Box sx={{ position: "relative" }}>
            {/* Left Arrow */}
            <IconButton
              onClick={handlePrev}
              disabled={currentIndex === 0}
              sx={{
                position: "absolute",
                left: -20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                color: "white",
                bgcolor: "rgba(0,0,0,0.4)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
              }}
            >
              <ArrowBackIos />
            </IconButton>

            {/* Cards Container */}
            <Box
              sx={{
                overflow: "hidden",
                ml: 4,
                mr: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  transition: "transform 0.5s ease",
                  transform: `translateX(-${currentIndex * (cardWidth + 16)}px)`,
                  gap: 2,
                }}
              >
                {data.searchQuestions.map((q) => (
                  <Box key={q.id} sx={{ minWidth: cardWidth }}>
                    <QuestionCard question={q} />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Right Arrow */}
            <IconButton
              onClick={handleNext}
              disabled={
                currentIndex + visibleCount >= data.searchQuestions.length
              }
              sx={{
                position: "absolute",
                right: -20,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                color: "white",
                bgcolor: "rgba(0,0,0,0.4)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Card>
      )}

      {keyword && data?.searchQuestions?.length === 0 && (
        <Typography>No discussion found</Typography>
      )}
    </Box>
  );
}
