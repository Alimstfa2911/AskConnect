// components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Layout({ children }) {
  return (
    <>
      {/* Spacer to offset fixed navbar height */}
      <Box sx={{ width: "100%"}}>
        {/* Navbar */}
        <Box sx={{ height: "64px" }}>
          <Navbar />
        </Box>

        {/* Page Content */}
        <Container sx={{ mt: 0 }}>{children}</Container>
      </Box>
    </>
  );
}
