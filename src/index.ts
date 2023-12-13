import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  // Create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query{
        hello:String
        say(name: String):String
    }
    `, //schema
    resolvers: {
      Query: {
        hello: () => `Hey, i am graphql`,
        say: (_, { name }: { name: String }) => `Hello ${name}`,
      },
    },
  });

  // starting gql server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Port is running" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}
init();
