import express from "express";
import { getItems } from "../dao/item.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getItems(req.query));
});

export default router;
