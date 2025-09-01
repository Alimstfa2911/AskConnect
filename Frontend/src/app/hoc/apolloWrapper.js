"use client";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ApolloProvider } from "@apollo/client/react";

export default function ApolloWrapper({ children }) {
  const { client } = useContext(AuthContext);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
