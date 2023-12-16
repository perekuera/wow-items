import express from "express";
import { getItems } from "../dao/item.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const items = await getItems();
  res.json(items);
});

export default router;
