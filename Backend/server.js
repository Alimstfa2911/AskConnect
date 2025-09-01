import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import http from "http";
import { typeDefs } from "./src/schema/typeDefs.js";
import { resolvers } from "./src/schema/resolvers.js";
import { mongoDB } from "./config/DbConfig.js";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { pubsub } from "./src/schema/pubsub.js";
import { makeExecutableSchema } from "@graphql-tools/schema";

mongoDB();

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();


app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || "";
      let user = null;

      if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        console.log("Token in server context", token);
        if (token) {
          try {
            user = jwt.verify(token, "SECRET_KEY");
          } catch (err) {
            console.error("JWT Error:", err.message);
          }
        }
      }

      return { user };
    },
  })
);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer(
  {
    schema,
    context: () => {
      return { pubsub };
    },
  },
  wsServer
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log("🚀 Server ready at http://localhost:4000/graphql");
