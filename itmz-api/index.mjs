import express from "express";
import mysql from "mysql2/promise";
import itemsRouter from "./routes/items.mjs";

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());

app.use("/items", itemsRouter);

app.get("/", async (req, res) => {
  res.json({ text: "Hello world!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
