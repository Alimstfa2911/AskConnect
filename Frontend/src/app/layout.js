"use client";
import * as React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import client from "./lib/apolloClient";
import Layout from "./components/Layout";
import AuthProvider from "./context/AuthContext";
import ApolloWrapper from "./provider/ApolloProvider";
import { NotificationProvider } from "./context/NotificationContext";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3B82F6", // buttons, highlights
      contrastText: "#E5E7EB",
    },
    secondary: {
      main: "#2563EB",
    },
    background: {
      default: "#111827", // page background
      paper: "#1F2937", // cards, inputs
    },
    text: {
      primary: "#E5E7EB",
      secondary: "#9CA3AF",
    },
    error: {
      main: "#B91C1C",
      contrastText: "#FEE2E2",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#3B82F6",
          color: "#E5E7EB",
          "&:hover": {
            backgroundColor: "#2563EB",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "#E5E7EB",
            backgroundColor: "#1F2937",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#374151",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3B82F6",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3B82F6",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#111827",
          color: "#E5E7EB",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "#B91C1C",
          color: "#FEE2E2",
        },
      },
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProvider>
            <NotificationProvider>
              <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Layout>{children}</Layout>
                </ThemeProvider>
              </ApolloProvider>
            </NotificationProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
