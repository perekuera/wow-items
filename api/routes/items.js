import express from "express";
import { getItems, getItemClasses } from "../dao/item.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getItems(req.query));
});

router.get("/item-classes", (req, res) => {
  res.json(getItemClasses());
});

export default router;
