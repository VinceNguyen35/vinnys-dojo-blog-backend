import express, { Request, Response, Router } from 'express';
import {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blogController';

const router: Router = express.Router();

// GET all blogs
router.get("/", async (req: Request, res: Response) => {
    const blogs = await getBlogs();
    res.send(blogs);
});

// GET a single blog
router.get("/:id", getBlog);

// CREATE a new blog
router.post("/", createBlog);

// UPDATE a blog
router.patch("/:id", updateBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

export = router;