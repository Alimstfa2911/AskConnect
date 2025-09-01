// lib/apolloClient.js
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

export function createApolloClient() {
  const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: "ws://localhost:4000/graphql",
            connectionParams: () => {
              const token = localStorage.getItem("token");
              return {
                authorization: token ? `Bearer ${token}` : "",
              };
            },
          })
        )
      : null;

  const splitLink =
    typeof window !== "undefined" && wsLink
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return def.kind === "OperationDefinition" && def.operation === "subscription";
          },
          wsLink,
          authLink.concat(httpLink)
        )
      : authLink.concat(httpLink);

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
}
