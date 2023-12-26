import express from "express";
import {
  getAccounts,
  getAccountCharacters,
  authAccount,
} from "../dao/account.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  res.json(await getAccounts());
});

router.get("/:accountId/characters", async (req, res) => {
  const { accountId } = req.params;
  res.json(await getAccountCharacters(accountId));
});

router.post(
  "/auth",
  express.urlencoded({ extended: true }),
  async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      const accountInfo = await authAccount(userName, password);
      res.json(accountInfo);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
