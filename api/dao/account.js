import crypto from "crypto";
import jwt from "jsonwebtoken";
import { modPow } from "bigint-crypto-utils";
import pool from "./database.js";

const getAccountVerifier = async (userName) => {
  const query =
    "SELECT username, salt, verifier FROM acore_auth.account WHERE username = ?";
  const [result] = await pool.execute(query, [userName]);
  if (result.length === 0) {
    throw new Error("User not found");
  }
  const { username, verifier, salt } = result[0];
  return { username, verifier, salt };
};

const authAccount = async (userName, password) => {
  const { username, verifier, salt } = await getAccountVerifier(userName);
  const userVerifier = calculateVerifier(username, password, salt);
  if (!verifier.equals(userVerifier)) {
    throw new Error("Invalid User Name/Password");
  }
  return getToken();
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

const TOKEN_DURATION = 60 * 20; // seconds
const TOKEN_RENEW = 60 * 5; // seconds

const getToken = (userName) => {
  return jwt.sign({ userName }, TOKEN_KEY, { expiresIn: `${TOKEN_DURATION}s` });
};

const checkToken = (req, res, next) => {
  if (req.path === "/accounts/auth") {
    return next();
  }

  let token = req.header("Authorization");

  if (!token) {
    throw new Error("Authorization error: no token provided");
  }

  try {
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, TOKEN_KEY);
    const exp = decoded.exp;
    const now = parseInt(Date.now() / 1000);
    const diff = exp - now;
    if (diff < TOKEN_RENEW) {
      res.header("Renew-Authorization", getToken(decoded.userName));
    }
    next();
  } catch (error) {
    throw new Error("Authorization error: invalid token");
  }
};

export { authAccount, checkToken };
