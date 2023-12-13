import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

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
    type Mutation{
      createUser(firstName:String!,lastName:String!,email:String,password:String!):Boolean
    }
    `, //schema
    resolvers: {
      Query: {
        hello: () => `Hey, i am graphql`,
        say: (_, { name }: { name: String }) => `Hello ${name}`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await prismaClient.user.create({
            data: {
              email,
              firstName,
              lastName,
              password,
              salt: "random_salt",
            },
          });
        },
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
function async(
  _: any,
  arg1: { firstName: any; lastName: any; email: any; password: any },
  arg2: { firstName: any; lastName: any; email: any; password: any }
):
  | any
  | import("@graphql-tools/utils").IFieldResolver<
      any,
      import("@apollo/server").BaseContext,
      any,
      any
    >
  | import("@graphql-tools/utils").IFieldResolverOptions<
      any,
      import("@apollo/server").BaseContext,
      any
    > {
  throw new Error("Function not implemented.");
}
