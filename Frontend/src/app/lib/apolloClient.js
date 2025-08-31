// src/app/lib/apolloClient.js
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

// ✅ HTTP link (for queries + mutations)
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// ✅ Auth middleware for HTTP
const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// ✅ WebSocket link (for subscriptions)
const wsLink =
  typeof window !== "undefined"
    ? new WebSocketLink({
        uri: "ws://localhost:4000/graphql",
        options: {
          reconnect: true,
          connectionParams: () => {
            const token =
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null;
            return {
              authorization: token ? `Bearer ${token}` : "",
            };
          },
        },
      })
    : null;

// ✅ Split between HTTP (queries/mutations) and WS (subscriptions)
const splitLink =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          );
        },
        wsLink,
        authLink.concat(httpLink)
      )
    : authLink.concat(httpLink);

// ✅ Apollo Client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Answer: {
        fields: {
          votes: {
            merge(existing = [], incoming) {
              return incoming; // overwrite with server response
            },
          },
        },
      },
    },
  }),
});

export default client;
