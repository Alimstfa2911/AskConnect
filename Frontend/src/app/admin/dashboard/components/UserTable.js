"use client";

import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_USERS } from "@/app/graphql/queries";
import { DELETE_USER, CHANGE_USER_ROLE } from "@/app/graphql/mutations";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

export default function UserTable() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);

  const [deleteUser] = useMutation(DELETE_USER);
  const [changeUserRole] = useMutation(CHANGE_USER_ROLE);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error.message}</Alert>;

  const users = data.getAllUsers;

  // Handle Delete
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);
      const res = await deleteUser({ variables: { id: selectedUser.id } });
      setSnackbarMessage(res.data.deleteUser.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpenDialog(false);
      setSelectedUser(null);
      refetch();
    } catch (err) {
      setSnackbarMessage(err.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // Handle Role Change
  const handleChangeRole = async (id, role) => {
    try {
      setRoleLoading(true);
      const res = await changeUserRole({ variables: { id, role } });
      setSnackbarMessage(res.data.changeUserRole.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      refetch();
    } catch (err) {
      setSnackbarMessage(err.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setRoleLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 180,
      renderCell: (params) => (
        <select
          value={params.row.role}
          onChange={(e) => handleChangeRole(params.row.id, e.target.value)}
          disabled={roleLoading}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteClick(params.row)}
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </Button>
      ),
    },
    { field: "createdAt", headerName: "Created At", width: 180 },
  ];

  return (
    <>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{selectedUser?.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button color="error" onClick={handleConfirmDelete} disabled={deleteLoading}>
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success & Errors */}
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
