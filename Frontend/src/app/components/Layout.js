// components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      {/* Spacer to offset fixed navbar height */}
      <Box sx={{ width: "100%" }}>
        {/* Navbar */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "64px",
            zIndex: 1100, // keep above content
          }}
        >
          <Navbar />
        </Box>

        {/* Page Content */}
        <Container
          sx={{
            mt: "80px", // push content below navbar
            mb: "80px", // push content above footer
          }}
        >
          {children}
        </Container>

        {/* Footer */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "64px",
            zIndex: 1100,
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
}
