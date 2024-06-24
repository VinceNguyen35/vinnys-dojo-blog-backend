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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlog = exports.getLatestBlog = exports.getBlogsByCategory = exports.getCategories = exports.getBlogs = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = mysql2_1.default.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [blogs] = yield pool.query(`
            SELECT * 
            FROM blogs
            ORDER BY id DESC
        `);
        res.status(200).json(blogs);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Cannot get blogs" });
    }
});
exports.getBlogs = getBlogs;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [categories] = yield pool.query(`
            SELECT category
            FROM blogs
            GROUP BY category
        `);
        res.status(200).json(categories);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Cannot get blog categories" });
    }
});
exports.getCategories = getCategories;
const getBlogsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const [blog] = yield pool.query(`
            SELECT * 
            FROM blogs 
            WHERE category = ?
            ORDER BY id DESC
        `, [category]);
        res.status(200).json(blog);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Cannot get blogs by category" });
    }
});
exports.getBlogsByCategory = getBlogsByCategory;
const getLatestBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [blog] = yield pool.query(`
            SELECT * 
            FROM blogs
            ORDER BY id DESC
            LIMIT 1
        `);
        res.status(200).json(blog);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Cannot get latest blog" });
    }
});
exports.getLatestBlog = getLatestBlog;
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [blog] = yield pool.query(`
            SELECT * 
            FROM blogs 
            WHERE id = ?
        `, [id]);
        res.status(200).json(blog);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Blog does not exist" });
    }
});
exports.getBlog = getBlog;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, category, content } = req.body;
    try {
        // Create the blog
        const [row] = yield pool.query(`
            INSERT INTO blogs (title, author, category, content)
            VALUES (?, ?, ?, ?)
        `, [title, author, category, content]);
        // Return the new blog as json
        const [newBlog] = yield pool.query(`
            SELECT * 
            FROM blogs 
            WHERE id = LAST_INSERT_ID()
        `);
        res.status(200).json(newBlog);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Could not make new blog" });
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, author, category, content } = req.body;
    try {
        // Update the blog
        const [row] = yield pool.query(`
            UPDATE blogs
            SET title = ?, author = ?, category = ?, content = ?
            WHERE id = ?
        `, [title, author, category, content, id]);
        // Return the updated blog as json
        const [updatedBlog] = yield pool.query(`
            SELECT * 
            FROM blogs 
            WHERE id = ?
        `, [id]);
        res.status(200).json(updatedBlog);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Could not update blog" });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Get the blog to return as json
        const [deletedBlog] = yield pool.query(`
            SELECT * 
            FROM blogs 
            WHERE id = ?
        `, [id]);
        // Delete the blog
        const [row] = yield pool.query(`
            DELETE 
            FROM blogs 
            WHERE id = ?
        `, [id]);
        res.status(200).json(deletedBlog);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: "Could not delete blog" });
    }
});
exports.deleteBlog = deleteBlog;
