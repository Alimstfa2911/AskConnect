"use client";
import * as React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import client from "./lib/apolloClient";
import Layout from "./components/Layout";
import AuthProvider from "./context/AuthContext";
import ApolloWrapper from "./provider/ApolloProvider";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <AuthProvider>
            <ApolloProvider client={client}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Layout>{children}</Layout>
              </ThemeProvider>
            </ApolloProvider>
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
