import { ApolloServer } from "apollo-server";
// import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { context } from "./context"; 
import { schema } from "./schema";

// Setting for apollo server v3
export const server = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const port = 8080;
// 2
server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
/*
const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "../schema.graphql"), {
      encoding: "utf-8",
    })
  );

  async function startApolloServer() {
    const server = new ApolloServer({ typeDefs });
    const { url } = await startStandaloneServer(server);
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
  }

  startApolloServer()*/