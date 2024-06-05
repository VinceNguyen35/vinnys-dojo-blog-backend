"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middleware
// Body Parser
app.use(express_1.default.json());
// Morgan
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
// Testing server
app.get("/", (req, res) => {
    res.send("Changes Works");
});
// Listen for Requests
app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
});
