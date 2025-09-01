import {  DELETE_QUESTION } from "@/app/graphql/mutations";
import { GET_ALL_QUESTIONS } from "@/app/graphql/queries";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function QuestionsTable() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_QUESTIONS);
  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  
  const router = useRouter();

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
      await deleteQuestion({ variables: { id } });
      refetch(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
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
              <TableCell>{new Date(q.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => router.push(`/question/${q.id}`)}
                >
                  View
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(q.id)}
                >
                  Delete
                </Button>
              </TableCell>

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
