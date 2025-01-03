import mysql from "mysql2/promise";

const DB_HOST = process.env.AC_DB_HOST;

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: DB_HOST,
  //host: "ac-database",
  //host: "localhost",
  user: "root",
  password: "password",
  database: "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
