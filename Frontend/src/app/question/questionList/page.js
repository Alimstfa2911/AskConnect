"use client";

import { useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import QuestionCard from "@/app/components/QuestionCard";

export default function QuestionsList({ questions }) {
  const [page, setPage] = useState(1);
  const limit = 2; 

  const totalPages = Math.ceil(questions.length / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedQuestions = questions.slice(startIndex, endIndex);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
    
      {paginatedQuestions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Box>
      )}

      <Typography variant="body2" textAlign="center">
        Page {page} of {totalPages}
      </Typography>
    </Box>
  );
}
