"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const router = express_1.default.Router();
// GET all blogs
router.get("/", blogController_1.getBlogs);
// GET all blog categories
router.get("/categories", blogController_1.getCategories);
// GET latest blog
router.get("/latest", blogController_1.getLatestBlog);
// GET a single blog
router.get("/:id", blogController_1.getBlog);
// CREATE a new blog
router.post("/", blogController_1.createBlog);
// UPDATE a blog
router.patch("/:id", blogController_1.updateBlog);
// DELETE a blog
router.delete("/:id", blogController_1.deleteBlog);
module.exports = router;
