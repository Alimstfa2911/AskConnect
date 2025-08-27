// src/app/lib/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql"});

const authLink = setContext((_, { headers }) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return { headers: {...headers, authorization: token ? `Bearer ${token}` : ""}};
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()       // optional, for cookies/auth
});

export default client;
