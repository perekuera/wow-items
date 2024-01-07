import express from "express";
import { parseToken } from "../dao/account.js";
import sendSoapCommand from "../dao/soap.js";

const router = express.Router();

const getUserName = (req) => {
  const parsedToken = parseToken(req.header("Authorization"));
  return parsedToken.userName;
};

router.get("/", async (req, res) => {
  const userName = getUserName(req);
  const result = await sendSoapCommand("server info", userName)
    .then((what) => {
      console.log("THEN", what);
    })
    .catch((error) => console.log("ERROR", error));
  console.log("RESULT", result);
  res.json({ userName });
});

export default router;
