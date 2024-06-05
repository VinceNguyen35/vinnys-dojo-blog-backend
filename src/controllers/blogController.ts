import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

const getBlogs = async () => {
    const [rows] = await pool.query("SELECT * FROM blogs");
    return rows;
}

const getBlog = async (id: number) => {
    const [row] = await pool.query(`
    SELECT * 
    FROM blogs 
    WHERE id = ?
    `, [id]);
    return row;
}

const createBlog = async () => {
    // const [row] = await pool.query(`
    // INSERT INTO notes (title, contents)
    // VALUES (?, ?, ?)
    // `, [title, author, content]);
    // const id: number = row.insertId;
    // return getBlog(id);
}

const updateBlog = async () => {

}

const deleteBlog = async () => {

}

export {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
};