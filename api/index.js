import express from "express";
import itemsRouter from "./routes/items.js";
import accountsRouter from "./routes/accounts.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.use("/items", itemsRouter);
app.use("/accounts", accountsRouter);

app.get("/", async (req, res) => {
  res.json({ text: "Hello world!" });
});

app.listen(port, () => {
  console.log(
    `Server running on ${process.env.NODE_ENV} environment, port ${port}`
  );
});
