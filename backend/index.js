import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db=new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
  });

const app = express();
const port = 3000;
db.connect();

app.use(bodyParser.json());

app.get('/notes', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM note ORDER BY id DESC');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  app.post('/notes', async (req, res) => {
    const { title, content } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO notes (title, content, created_at) VALUES ($1, $2, NOW()) RETURNING *',
        [title, content]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });