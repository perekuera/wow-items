import express from "express";
import { getRealms, getRealmCharacters } from "../dao/realm.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  res.json(await getRealms());
});

router.get("/:realmId/characters", async (req, res) => {
  const { realmId } = req.params;
  res.json(await getRealmCharacters(realmId));
});

export default router;
