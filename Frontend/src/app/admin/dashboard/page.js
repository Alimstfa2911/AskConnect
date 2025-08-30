"use client";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from "@mui/material";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_USERS } from "../../graphql/queries";
import AdminRoute from "../../components/AdminRoute";

export default function AdminDashboard() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;
  if (error) return <Typography color="error">{error.message}</Typography>;

  const users = data?.getAllUsers || [];

  return (
    <AdminRoute>
      <Box sx={{ mt: 10, px: 2 }}>
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        <Paper sx={{ width: "100%", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Questions</TableCell>
                <TableCell>Answers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{u.questions.length}</TableCell>
                  <TableCell>{u.answers.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </AdminRoute>
  );
}
