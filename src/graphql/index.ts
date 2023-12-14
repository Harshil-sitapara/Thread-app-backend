import { ApolloServer } from "@apollo/server";
import { User } from "./user/index";
async function createAplloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query{
          hello:String
        }
        type Mutation{
         ${User.mutations}
        }
        `, //schema
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();
  return gqlServer;
}

export default createAplloGraphqlServer;
