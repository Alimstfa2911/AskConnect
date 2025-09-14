"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_QUESTIONS } from "@/app/graphql/queries";
import { DELETE_QUESTION } from "@/app/graphql/mutations";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

import { useState } from "react";

export default function QuestionsTable() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_QUESTIONS);
  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />;

  if (error)
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        {error.message}
      </Typography>
    );

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this question?")) return;

    try {
      setDeleteLoading(true);
      const res = await deleteQuestion({ variables: { id } });
      setSnackbarMessage(res.data.deleteQuestion.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      refetch();
    } catch (err) {
      setSnackbarMessage(err.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ height: 600, overflowY: "auto" }} // fixed height with scroll
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Answers</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.questions.map((q) => (
              <TableRow key={q.id}>
                <TableCell>{q.title}</TableCell>
                <TableCell>{q.author?.name || "Anonymous"}</TableCell>
                <TableCell>{q.answers.length}</TableCell>
                <TableCell>{Date(q.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(q.id)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
