import express, { Router } from 'express';
import {
    getBlogs,
    getLatestBlog,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blogController';

const router: Router = express.Router();

// GET all blogs
router.get("/", getBlogs);

// GET latest blog
router.get("/latest", getLatestBlog);

// GET a single blog
router.get("/:id", getBlog);

// CREATE a new blog
router.post("/", createBlog);

// UPDATE a blog
router.patch("/:id", updateBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

export = router;