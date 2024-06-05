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
        const [blogs] = await pool.query("SELECT * FROM blogs");
        res.status(200).json(blogs);
    } catch(err) {
        res.status(400).json({ error: "Cannot get blogs" });
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
        res.status(400).json({ error: "Blog does not exist" });
    }
}

const createBlog = async (req: Request, res: Response) => {
    const { title, author, content } = req.body;

    try {
        // Create the blog
        const [row] = await pool.query(`
        INSERT INTO blogs (title, author, content)
        VALUES (?, ?, ?)
        `, [title, author, content]);

        // Return the new blog as json
        const [newBlog] = await pool.query(`
        SELECT * 
        FROM blogs 
        WHERE id = LAST_INSERT_ID()
        `);
        res.status(200).json(newBlog);
    } catch(err) {
        res.status(400).json({ error: "Could not make new blog" });
    }
}

const updateBlog = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, content } = req.body;

    try {
        // Update the blog
        const [row] = await pool.query(`
        UPDATE blogs
        SET title = ?, author = ?, content = ?
        WHERE id = ?
        `, [title, author, content, id]);

        // Return the updated blog as json
        const [updatedBlog] = await pool.query(`
        SELECT * 
        FROM blogs 
        WHERE id = ?
        `, [id]);
        res.status(200).json(updatedBlog);
    } catch(err) {
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
        res.status(400).json({ error: "Could not delete blog" });
    }
}

export {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
};