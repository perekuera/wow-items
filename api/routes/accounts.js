import express from "express";
import { authAccount } from "../dao/account.js";

const router = express.Router();

router.post(
  "/auth",
  express.urlencoded({ extended: true }),
  async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      const token = await authAccount(userName, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
