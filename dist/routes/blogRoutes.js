"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const router = express_1.default.Router();
// GET all blogs
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield (0, blogController_1.getBlogs)();
    res.send(blogs);
}));
// GET a single blog
router.get("/:id", blogController_1.getBlog);
// CREATE a new blog
router.post("/", blogController_1.createBlog);
// UPDATE a blog
router.patch("/:id", blogController_1.updateBlog);
// DELETE a blog
router.delete("/:id", blogController_1.deleteBlog);
module.exports = router;
