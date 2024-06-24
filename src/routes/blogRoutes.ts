import express, { Router } from 'express';
import {
    getBlogs,
    getCategories,
    getBlogsByCategory,
    getLatestBlog,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blogController';

const router: Router = express.Router();

// GET all blogs
router.get("/", getBlogs);

// GET all blog categories
router.get("/categories", getCategories);

// GET all blogs by category
router.get("/categories/:category", getBlogsByCategory);

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