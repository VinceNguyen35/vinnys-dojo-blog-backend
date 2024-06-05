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
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlog = exports.getBlogs = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = mysql2_1.default.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();
const getBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield pool.query("SELECT * FROM blogs");
    return rows;
});
exports.getBlogs = getBlogs;
const getBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [row] = yield pool.query(`
    SELECT * 
    FROM blogs 
    WHERE id = ?
    `, [id]);
    return row;
});
exports.getBlog = getBlog;
const createBlog = () => __awaiter(void 0, void 0, void 0, function* () {
    // const [row] = await pool.query(`
    // INSERT INTO notes (title, contents)
    // VALUES (?, ?, ?)
    // `, [title, author, content]);
    // const id: number = row.insertId;
    // return getBlog(id);
});
exports.createBlog = createBlog;
const updateBlog = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateBlog = updateBlog;
const deleteBlog = () => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteBlog = deleteBlog;
