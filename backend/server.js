import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import { typeDefs } from "./src/schema/typeDefs.js";
import { resolvers } from "./src/schema/resolvers.js";
import { mongoDB } from "./config/DbConfig.js";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { pubsub } from "./src/schema/pubsub.js";
import { makeExecutableSchema } from "@graphql-tools/schema";

// 1. Connect to MongoDB
mongoDB();

// 2. Define a Mongoose Schema + Model

// 3. Define GraphQL Type Definitions

// 4. Define Resolvers → interact with DB

// 5. Create Apollo Server

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// 🔑 IMPORTANT: json middleware must come BEFORE expressMiddleware

app.use(
  "/graphql",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authHeader = req.headers.authorization || "";
      if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        if (!token) return {};
        try {
          const decoded = jwt.verify(token, "SECRET_KEY");
         
          return { user: decoded }; 
        } catch (err) {
          console.error("JWT Error:", err.message);

          return {};
        }
      }
    },
  })
);

// WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

useServer(
  {
    schema,
    context: () => ({ pubsub }),
  },
  wsServer
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log("🚀 Server ready at http://localhost:4000/graphql");
