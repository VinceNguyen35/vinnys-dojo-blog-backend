// Imports
import express from 'express';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes';

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

// Routes
app.use("/api/blogs", blogRoutes);

// Listen for Requests
app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT);
});