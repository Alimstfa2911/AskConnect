"use client";

import { useState } from "react";
import { Box, Typography, CircularProgress, Pagination } from "@mui/material";

import { GET_ALL_QUESTIONS_PAGINATION } from "@/app/graphql/queries";
import QuestionsList from "@/app/question/questionList/page";
import { useQuery } from "@apollo/client/react";

export default function RecentDiscussions() {
  const [page, setPage] = useState(1);
  const limit = 2;

  const { data, loading, error, fetchMore } = useQuery(
    GET_ALL_QUESTIONS_PAGINATION,
    {
      variables: { limit, offset: (page - 1) * limit },
      fetchPolicy: "cache-and-network",
    }
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchMore({
      variables: { limit, offset: (value - 1) * limit },
    });
  };

  if (loading && !data) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  const questions = data?.questionsPagination?.items || [];
  const totalCount = data?.questionsPagination?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <Box>
      <QuestionsList questions={questions} />

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
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
