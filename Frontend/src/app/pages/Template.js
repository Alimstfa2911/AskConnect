"use client";

import { Box, Card, Typography } from "@mui/material";

export default function Template({ title, description1, description2, image, form }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        alignItems: "center",
        minHeight: "80vh",
        px: 2,
        py: 4,
      }}
    >
      {/* Left Side - Image */}
      <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "center" }}>
        <img src={image} alt="signup" style={{ maxWidth: "100%", borderRadius: 12 }} />
      </Box>

      {/* Right Side - Form */}
      <Card sx={{ p: 4, maxWidth: 450, mx: "auto", boxShadow: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          {description1}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" mb={3}>
          {description2}
        </Typography>

        {/* Inject Form Here */}
        {form}
      </Card>
    </Box>
  );
}
