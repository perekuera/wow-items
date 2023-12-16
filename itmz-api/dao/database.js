import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
  host: "ac-database",
  user: "root",
  password: "password",
  database: "acore_world",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
