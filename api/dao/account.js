import crypto from "crypto";
import { modPow } from "bigint-crypto-utils";
import pool from "./database.js";

const getAccountVerifier = async (userName) => {
  const query =
    "SELECT username, salt, verifier FROM acore_auth.account WHERE username = ?";
  const [result] = await pool.execute(query, [userName]);
  const { username, verifier, salt } = result[0];
  return { username, verifier, salt };
};

const authAccount = async (userName, password) => {
  //
  calculateVerifier(username, "password", salt);
};

// Parameters
const g = BigInt(7);
const N = BigInt(
  "0x894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7"
);
console.log("N", N.toString(16));

function calculateVerifier(username, password, salt) {
  // Step 1: Calculate h1 = SHA1("USERNAME:PASSWORD")

  const data = `${username}:${password}`.toUpperCase();
  console.log("DATA", data);

  const h1 = crypto.createHash("sha1").update(data).digest();
  console.log("H1", h1);

  const c = Buffer.concat([salt, h1]);
  console.log("C", c);

  const h2 = crypto
    .createHash("sha1")
    .update(Buffer.concat([salt, h1]))
    .digest();

  console.log("H2", h2);
  //const h1 = BigInt("0x" + h1Buffer.toString("hex"));

  const bi = BigInt("0x" + h2.reverse().toString("hex"));

  console.log("BigInt", bi);
  bi;
  const v = modPow(g, bi, N);
  console.log("V", v);

  const bufferValue = Buffer.from(v.toString(16), "hex").reverse();
  console.log("Buffer", bufferValue);

  // Step 2: Calculate h2 = SHA1(salt || h1)
  /*const h2Buffer = crypto
    .createHash("sha1")
    .update(Buffer.concat([salt, Buffer.from(h1.toString(16), "hex")]))
    .digest();
  const h2 = BigInt("0x" + h2Buffer.toString("hex"));*/

  //console.log("tamaño h2", h2Buffer.byteLength);

  // const v = modPow(g, h2Buffer.readUInt32LE(), N);

  // console.log("verifier", v);
  // console.log("ver hex", v.toString(16));
  // console.log("Verifier!", Buffer.from(v.toString(16)));
  // Step 3: Treat h2 as an integer in little-endian order
  //7d9f53c98b90f5aaaa82c3b8e669c049b98c1fa4fb1f7074a84ebe0e7c86d1cb
  // Step 4: Calculate (g ^ h2) % N
  //const verifier = modPow(g, h2Int, N);

  // Convert the result back to a byte array in little-endian order
  const verifierBuffer = Buffer.alloc(32);
  //console.log("VERIFIED", verifier);
  //verifierBuffer.writeBigInt64LE(v, 0);

  return verifierBuffer;
}

// Example usage
const username = "PEREKUERA";
getAccountVerifier(username);

export { getAccountVerifier };
