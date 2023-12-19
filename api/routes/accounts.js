import express from "express";
import { getAccountVerifier } from "../dao/account.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("query", req.query);
  res.json(await getAccountVerifier(req.query.account));
});

export default router;
