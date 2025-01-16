import express from "express";
import { parseToken } from "../dao/account.js";
import { sendSoapCommand } from "../dao/soap.js";
import sendTelnetCommand from "../dao/telnet.js";

const router = express.Router();

const getUserName = (req) => {
  const parsedToken = parseToken(req.header("Authorization"));
  return parsedToken.userName;
};

router.get("/telnet", async (_req, res) => {
  const result = await sendTelnetCommand(".server info");
  res.json({ ok });
});

router.get("/soap", async (req, res) => {
  const userName = getUserName(req);
  const command = req.query.command || "server info";
  if (!userName) {
    throw new Error("Invalid user name");
  }
  try {
    const result = await sendSoapCommand(command, userName);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
