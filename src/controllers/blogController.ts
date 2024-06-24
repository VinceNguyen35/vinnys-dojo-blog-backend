import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

const getBlogs = async (req: Request, res: Response) => {
    try {
        const [blogs] = await pool.query(`
            SELECT * 
            FROM blogs
            ORDER BY id DESC
        `);
        res.status(200).json(blogs);
    } catch(err) {
        console.log(err);
        res.status(400).json({ error: "Cannot get blogs" });
    }
}

const getCategories = async (req: Request, res: Response) => {
    try {
        const [blogs] = await pool.query(`
            SELECT category
            FROM blogs
            GROUP BY category
        `);
        res.status(200).json(blogs);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Cannot get blog categories" });
    }
}

const getLatestBlog = async (req: Request, res: Response) => {
    try {
        const [blog] = await pool.query(`
            SELECT * 
            FROM blogs
            ORDER BY id DESC
            LIMIT 1
        `);
        res.status(200).json(blog);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Cannot get latest blog" });
    }
}

const getBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [blog] = await pool.query(`
            SELECT * 
            FROM blogs 
            WHERE id = ?
        `, [id]);
        res.status(200).json(blog);
    } catch(err) {
        console.log(err);
        res.status(400).json({ error: "Blog does not exist" });
    }
}

const createBlog = async (req: Request, res: Response) => {
    const { title, author, category, content } = req.body;

    try {
        // Create the blog
        const [row] = await pool.query(`
            INSERT INTO blogs (title, author, category, content)
            VALUES (?, ?, ?, ?)
        `, [title, author, category, content]);

        // Return the new blog as json
        const [newBlog] = await pool.query(`
            SELECT * 
            FROM blogs 
            WHERE id = LAST_INSERT_ID()
        `);
        res.status(200).json(newBlog);
    } catch(err) {
        console.log(err);
        res.status(400).json({ error: "Could not make new blog" });
    }
}

const updateBlog = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, category, content } = req.body;

    try {
        // Update the blog
        const [row] = await pool.query(`
            UPDATE blogs
            SET title = ?, author = ?, category = ?, content = ?
            WHERE id = ?
        `, [title, author, category, content, id]);

        // Return the updated blog as json
        const [updatedBlog] = await pool.query(`
            SELECT * 
            FROM blogs 
            WHERE id = ?
        `, [id]);
        res.status(200).json(updatedBlog);
    } catch(err) {
        console.log(err);
        res.status(400).json({ error: "Could not update blog" });
    }
}

const deleteBlog = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Get the blog to return as json
        const [deletedBlog] = await pool.query(`
            SELECT * 
            FROM blogs 
            WHERE id = ?
        `, [id]);

        // Delete the blog
        const [row] = await pool.query(`
            DELETE 
            FROM blogs 
            WHERE id = ?
        `, [id]);
        res.status(200).json(deletedBlog);
    } catch(err) {
        console.log(err);
        res.status(400).json({ error: "Could not delete blog" });
    }
}

export {
    getBlogs,
    getCategories,
    getLatestBlog,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
};