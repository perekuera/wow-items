import express from "express";
import itemsRouter from "./routes/items.js";
import accountsRouter from "./routes/accounts.js";
import charactersRouter from "./routes/characters.js";
import dotenv from "dotenv";
import { checkToken } from "./dao/account.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(checkToken);
app.use(express.json());

app.use("/items", itemsRouter);
app.use("/accounts", accountsRouter);
app.use("/characters", charactersRouter);

app.use((err, req, res, _next) => {
  res
    .status(500)
    .json({ request: req.path, method: req.method, message: err.message });
});

app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} environment, port ${port}`
  );
});
