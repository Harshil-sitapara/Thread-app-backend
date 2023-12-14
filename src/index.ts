import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";
import createAplloGraphqlServer from "./graphql";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Port is running" });
  });
  const gqlServer = await createAplloGraphqlServer();
  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}
init();
