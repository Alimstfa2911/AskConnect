"use client";

import { Box, Pagination, Typography } from "@mui/material";
import QuestionCard from "@/app/components/QuestionCard";

export default function QuestionsList({ questions, page, totalPages, onPageChange }) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            color="primary"
          />
        </Box>
      )}

      {totalPages > 0 && (
        <Typography variant="body2" textAlign="center">
          Page {page} of {totalPages}
        </Typography>
      )}
    </Box>
  );
}
