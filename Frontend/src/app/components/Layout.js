// components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", 
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "64px",
          zIndex: 1100,
        }}
      >
        <Navbar />
      </Box>

      <Box
        component="main"
        sx={{
          flex: 1, 
          mt: "80px", 
          px: 2,
        }}
      >
        <Container>{children}</Container>
      </Box>

      <Box sx={{ mt: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
}
