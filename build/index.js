"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
async function init() {
    const app = (0, express_1.default)();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express_1.default.json());
    app.get("/", (req, res) => {
        res.json({ message: "Port is running" });
    });
    const gqlServer = await (0, graphql_1.default)();
    app.use("/graphql", (0, express4_1.expressMiddleware)(gqlServer));
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}
init();
