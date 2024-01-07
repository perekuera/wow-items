import express from "express";
import cors from "cors";
import path from "path";
import { createRequire } from "module";
import { URL } from "url";
import accountsRouter from "./routes/accounts.js";
import realmsRouter from "./routes/realms.js";
import itemsRouter from "./routes/items.js";
import charactersRouter from "./routes/characters.js";
import commandsRouter from "./routes/commands.js";
import dotenv from "dotenv";
import { checkToken } from "./dao/account.js";
import { Telnet } from "telnet-client";
const require = createRequire(import.meta.url);
const __dirname = new URL(".", import.meta.url).pathname;

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(checkToken);
app.use(express.json());

app.use("/accounts", accountsRouter);
app.use("/realms", realmsRouter);
app.use("/items", itemsRouter);
app.use("/characters", charactersRouter);
app.use("/commands", commandsRouter);

app.use((err, req, res, _next) => {
  let status = 500;
  if (err.message.startsWith("Authorization")) {
    status = 401;
  }
  res.status(status).json({
    request: req.path,
    method: req.method,
    message: err.message,
  });
});

app.get("/locales", (req, res) => {
  const locales = require(path.join(__dirname, "dao/static/locales.json"));
  res.json(locales);
});

app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} environment, port ${port}`
  );
  console.log(`AC_DB_HOST is ${process.env.AC_DB_HOST}`);
  console.log(`AC_SOAP_HOST is ${process.env.AC_SOAP_HOST}`);
});

const connection = new Telnet();

const params = {
  host: "localhost",
  port: 3443, // Puerto por defecto para Telnet es 23
  shellPrompt: "/ # ", // Puedes ajustar esto según tu prompt
  timeout: 1500,
  //shellPrompt: "AC>",
  loginPrompt: /Username: /i,
  passwordPrompt: /Password: /i,
  username: "PEREKUERA",
  password: "xxx",
  negotiationMandatory: false,
};

connection
  .connect(params)
  .then(() => {
    console.log("Conectado a Telnet");
    // Aquí puedes enviar comandos Telnet, por ejemplo:
    return connection.exec("help\r\n");
  })
  .then((result) => {
    console.log("Respuesta del comando ls:", result);
    console.log("fin");
  })
  .catch((err) => {
    console.error("Error:", err);
  })
  .finally(() => {
    connection.end();
    console.log("Desconectado de Telnet");
  });
