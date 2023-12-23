import express from "express";
import { getCharacterClasses, getCharacterRaces } from "../dao/character.js";

const router = express.Router();

router.get("/character-classes", (_req, res) => {
  res.json(getCharacterClasses());
});

router.get("/character-races", (_req, res) => {
  res.json(getCharacterRaces());
});

export default router;
