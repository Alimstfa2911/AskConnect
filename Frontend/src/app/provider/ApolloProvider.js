// app/providers/ApolloProvider.tsx
"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "../lib/apolloClient";

export default function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
