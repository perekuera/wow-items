import crypto from "crypto";
import jwt from "jsonwebtoken";
import { modPow } from "bigint-crypto-utils";
import pool from "./database.js";

const getAccounts = async () => {
  const query =
    "SELECT id, username, email, joindate, last_ip, locked, last_login, online, expansion, os, totaltime FROM acore_auth.account ORDER BY username";
  const [rows] = await pool.execute(query);
  return rows;
};

const getAccountCharacters = async (accountId) => {
  const query =
    "SELECT * FROM acore_characters.characters WHERE account = ? ORDER BY name";
  const [rows] = await pool.execute(query, [accountId]);
  return rows;
};

const getAccountVerifier = async (userName) => {
  const query =
    "SELECT id, username, salt, verifier FROM acore_auth.account WHERE username = ?";
  const [result] = await pool.execute(query, [userName]);
  if (result.length === 0) {
    throw new Error("User not found");
  }
  const { id, username, verifier, salt } = result[0];
  return { accountId: id, username, verifier, salt };
};

const authAccount = async (userName, password) => {
  console.log("AUTH ACCOUNT", userName, password);
  const { accountId, username, verifier, salt } = await getAccountVerifier(
    userName
  );
  console.log("AUTH ACCOUNT", accountId, username, verifier, salt);
  const userVerifier = calculateVerifier(username, password, salt);
  if (!verifier.equals(userVerifier)) {
    throw new Error("Invalid User Name/Password");
  }
  addUserInfo(userName, password);
  return {
    accountId,
    userName: username,
    password,
    token: createToken(userName),
  };
};

// Constant values
const g = BigInt(7);
const N = BigInt(
  "0x894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7"
);

function calculateVerifier(username, password, salt) {
  const h1 = crypto
    .createHash("sha1")
    .update(`${username}:${password}`.toUpperCase())
    .digest();

  const h2 = crypto
    .createHash("sha1")
    .update(Buffer.concat([salt, h1]))
    .digest();

  const bi = BigInt("0x" + h2.reverse().toString("hex"));

  const value = modPow(g, bi, N);

  return Buffer.from(value.toString(16), "hex").reverse();
}

const TOKEN_KEY =
  "eb1bce5451e30f890283a8cdf023c33ee62da26c30458642bf9a15e0e01d16ae";

const TOKEN_DURATION = 60 * 45; // seconds
const TOKEN_RENEW = 60 * 15; // seconds

const createToken = (userName) => {
  return jwt.sign({ userName }, TOKEN_KEY, {
    expiresIn: `${TOKEN_DURATION}s`,
  });
};

const parseToken = (token) => {
  try {
    token = token.replace("Bearer ", "");
    return jwt.verify(token, TOKEN_KEY);
  } catch (error) {
    throw new Error("Authorization error: invalid token");
  }
};

const checkToken = (req, res, next) => {
  if (req.path === "/accounts/auth" || req.path === "/locales") {
    return next();
  }

  const token = req.header("Authorization");

  if (!token) {
    throw new Error("Authorization error: no token provided");
  }

  try {
    const decoded = parseToken(token);
    const exp = decoded.exp;
    const now = parseInt(Date.now() / 1000);
    const diff = exp - now;
    if (diff < TOKEN_RENEW) {
      res.header("Access-Control-Expose-Headers", "Renew-Authorization");
      res.header("Renew-Authorization", createToken(decoded.userName));
    }
    next();
  } catch (error) {
    throw new Error("Authorization error: invalid token");
  }
};

const secretKey = crypto.randomBytes(32).toString("hex");

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedText: encrypted,
  };
};

const decrypt = (encryptedData) => {
  console.log("decrypt data", encryptedData);
  if (!encryptedData) {
    throw new Error("Invalid user data");
  }
  console.log("encrypted data", encryptedData);
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    Buffer.from(encryptedData.iv, "hex")
  );
  let decrypted = decipher.update(encryptedData.encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};

const usersInfo = new Map();

const addUserInfo = (userName, password) => {
  console.log("ADD USER INFO", userName, password);
  usersInfo.set(userName, encrypt(password));
};

const getUserInfo = (userName) => {
  console.log("GET USER INFO", userName);
  console.log("USERS INFO", usersInfo);
  return decrypt(usersInfo.get(userName));
};

export {
  getAccounts,
  getAccountCharacters,
  authAccount,
  checkToken,
  parseToken,
  getUserInfo,
};
