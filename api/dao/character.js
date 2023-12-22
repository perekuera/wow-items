import path from "path";
import { createRequire } from "module";
import { URL } from "url";
import pool from "./database.js";

const require = createRequire(import.meta.url);
const __dirname = new URL(".", import.meta.url).pathname;

const getCharacterClasses = () => {
  return require(path.join(__dirname, "static/character-classes.json"));
};

const getCharacterRaces = () => {
  return require(path.join(__dirname, "static/character-races.json"));
};

export { getCharacterClasses, getCharacterRaces };
