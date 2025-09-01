// app/providers/ApolloProvider.tsx
// "use client";

// import { ApolloProvider } from "@apollo/client/react";
// import client from "../lib/apolloClient";

// export default function ApolloWrapper({ children }) {
//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// }

// src/provider/ApolloWrapper.js
"use client";

import { ApolloProvider } from "@apollo/client/react";
import { useMemo } from "react";
import { createApolloClient } from "../lib/apolloClient";

export default function ApolloWrapper({ children }) {
  const client = useMemo(() => createApolloClient(), []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
