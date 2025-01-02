import express from "express";
import { parseToken } from "../dao/account.js";
import { sendSoapCommand, AzerothCore_Soap } from "../dao/soap.js";
import sendTelnetCommand from "../dao/telnet.js";

const router = express.Router();

const getUserName = (req) => {
  const parsedToken = parseToken(req.header("Authorization"));
  return parsedToken.userName;
};

router.get("/telnet", async (req, res) => {
  const result = await sendTelnetCommand(".server info");
  console.log("RESULT", result);
  res.json({ ok });
});

router.get("/soap", async (req, res) => {
  const userName = getUserName(req);
  console.log("show username", userName);
  if (!userName) {
    throw new Error("Invalid user name");
  }
  const result = await sendSoapCommand("server info", userName)
    .then((what) => {
      console.log("THEN", what);
    })
    .catch((error) => console.log("ERROR", error));
  // const result = await AzerothCore_Soap("server info")
  //   .then((what) => {
  //     console.log("THEN", what);
  //   })
  //   .catch((error) => {
  //     console.log("ERROR", error);
  //   });
  console.log("RESULT", result);
  res.json({ userName });
});

export default router;
