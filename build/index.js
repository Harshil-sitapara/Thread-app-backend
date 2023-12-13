"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
async function init() {
    const app = (0, express_1.default)();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express_1.default.json());
    // Create graphql server
    const gqlServer = new server_1.ApolloServer({
        typeDefs: `
    type Query{
        hello:String
        say(name: String):String
    }
    `, //schema
        resolvers: {
            Query: {
                hello: () => `Hey, i am graphql`,
                say: (_, { name }) => `Hello ${name}`,
            },
        },
    });
    // starting gql server
    await gqlServer.start();
    app.get("/", (req, res) => {
        res.json({ message: "Port is running" });
    });
    app.use("/graphql", (0, express4_1.expressMiddleware)(gqlServer));
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    });
}
init();
