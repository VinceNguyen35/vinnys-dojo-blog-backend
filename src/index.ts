import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Middleware
// Body Parser
app.use(express.json());

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