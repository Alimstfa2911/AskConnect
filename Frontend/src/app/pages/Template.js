"use client";

import { Box, Card, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

export default function Template({

  description1,
  description2,
  image,
  form,
}) {
  const pathname = usePathname();

  let title = "";
  let subtitle = "";
  let quote = "";

  if (pathname === "/login") {
    title = "Welcome Back!";
    subtitle = "Log in to your account and continue learning.";
    quote = "“Your knowledge is your power.”";
  } else if (pathname === "/register") {
    title = "Join the Community!";
    subtitle = "Sign up and start sharing your knowledge.";
    quote = "“Empower yourself and others.”";
  } else {
    title = "AskConnect";
    subtitle = "Connect, Share, Learn.";
    quote = "“Knowledge grows when shared.”";
  }
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        px: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 3,
          borderRadius: 2,
          bgcolor: "#1f2937",
          color: "#facc15",
          minHeight: 300,
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {subtitle}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          {quote}
        </Typography>
      </Box>

      {/* Right Side - Form */}
      <Card
        sx={{ p: 4, maxWidth: 450, mx: "auto", boxShadow: 4, borderRadius: 3 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          {description1}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          mb={3}
        >
          {description2}
        </Typography>

        {/* Inject Form Here */}
        {form}
      </Card>
    </Box>
  );
}
