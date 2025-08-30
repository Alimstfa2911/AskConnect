"use client";

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_USERS } from "@/app/graphql/queries";

export default function UserTable() {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const users = data.getAllUsers;

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 180 },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}
