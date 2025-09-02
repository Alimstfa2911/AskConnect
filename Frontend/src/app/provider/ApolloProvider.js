"use client";

import { ApolloProvider } from "@apollo/client/react";
import { useContext, useMemo } from "react";
import { createApolloClient } from "../lib/apolloClient";
import { AuthContext } from "../context/AuthContext";

export default function ApolloWrapper({ children }) {
  const {isLoggedIn}=useContext(AuthContext);
  const client = useMemo(() => createApolloClient(), [isLoggedIn]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
