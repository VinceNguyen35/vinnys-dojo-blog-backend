"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middleware
// CORS Config
app.use((0, cors_1.default)());
// Body Parser
app.use(express_1.default.json());
// Morgan
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});
// Routes
app.use("/api/blogs", blogRoutes_1.default);
// Listen for Requests
app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
});
